import React, { useState } from "react";
import Container from "../components/Container";
import { useQuery } from "react-query";
import axios from "axios";
import OrderSection from "../components/OrderSection";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const { data, isLoading } = useQuery(
    "all_orders",
    () => axios.get("/order"),
    {
      onError: (err) => {
        if (err.response && err.response.status == 403)
          navigate("/admin/login");
        else if (err.response) message.error(err.response.data.message);
        else message.error("Something went wrong");
      },
      onSuccess: (res) => {
        let tempData = [];
        for (let i = 0; i < res.data.orders.length; i += 1) {
          const orderItem = res.data.orders[i];
          let pizzas = [];
          let addons = [];
          for (let j = 0; j < orderItem.items.length; j += 1) {
            pizzas.push(
              `${orderItem.items[j].pizza}(${orderItem.items[j].quantity})`
            );
            const description = orderItem.items[j].description;
            //   for (let addon in description) {
            //     addons.push(`${description[addon]} ${addon}`);
            //   }
            addons.push(`Base - ${description.base}`);
            addons.push(`Sauce - ${description.sauce}`);
            addons.push(`Cheese - ${description.cheese}`);
            if (description.wantVeggies) addons.push("Veggies");
          }
          tempData.push({
            ...orderItem,
            pizzas: pizzas.join(", ").trim(),
            addons: addons.join(", ").trim(),
          });
        }
        setTableData([...tempData]);
      },
    }
  );

  if (isLoading)
    return (
      <center>
        <Spin style={{ marginTop: "5rem" }} tip="Loading" />
      </center>
    );

  return (
    <main>
      <Container>
        <OrderSection
          title="New Orders"
          orders={tableData.filter((order) => order.status == "received")}
          orderStatus="received"
          tableData={tableData}
          setTableData={setTableData}
        />
        <OrderSection
          title="In Kitchen"
          orders={tableData.filter((order) => order.status == "cooking")}
          orderStatus="cooking"
          tableData={tableData}
          setTableData={setTableData}
        />
        <OrderSection
          title="Delivered"
          orders={tableData.filter((order) => order.status == "delivered")}
          orderStatus="delivered"
          //  tableData={tableData}
          //  setTableData={setTableData}
        />
        {/* <OrderSection orderStatus="delivered" title="Delivered Orders" /> */}

        {/* <section>
          <Typography.Title level={3}>Confirmed Orders</Typography.Title>
          <Table
            pagination={false}
            dataSource={orders.filter((order) => order.status == "received")}
            columns={confirmedOrdersColumns}
          />
        </section>

        <section>
          <Typography.Title level={3}>Cooking</Typography.Title>
          <Table
            pagination={false}
            dataSource={orders.filter((order) => order.status == "new")}
            columns={columns}
          />
        </section>

        <section>
          <Typography.Title level={3}>New Orders</Typography.Title>
          <Table
            pagination={false}
            dataSource={orders.filter((order) => order.status == "new")}
            columns={columns}
          />
        </section> */}
      </Container>
    </main>
  );
};

export default Orders;
