import React from "react";
import Container from "../components/Container";
import OrderSection from "../components/OrderSection";

const Orders = () => {
  // const columns = [
  //   {
  //     title: "Id",
  //     dataIndex: "id",
  //     key: "id",
  //   },
  //   {
  //     title: "Amount",
  //     dataIndex: "amount",
  //     key: "amount",
  //   },
  //   {
  //     title: "Customer Id",
  //     dataIndex: "customer_id",
  //     key: "customer_id",
  //   },
  //   {
  //     title: "Customer Email",
  //     dataIndex: "customer_email",
  //     key: "customer_email",
  //   },
  //   {
  //     title: "Customer Phone",
  //     dataIndex: "customer_phone",
  //     key: "customer_phone",
  //   },
  //   {
  //     title: "Customer Address",
  //     dataIndex: "customer_address",
  //     key: "customer_address",
  //   },
  //   {
  //     title: "Pizza",
  //     dataIndex: "pizza",
  //     key: "pizza",
  //   },
  //   {
  //     title: "Addons",
  //     dataIndex: "addons",
  //     key: "addons",
  //   },
  //   {
  //     title: "Action",
  //     dataIndex: "mark",
  //     key: "mark",
  //     render: () => (
  //       <Button type="primary" size="small">
  //         Mark as received
  //       </Button>
  //     ),
  //   },
  // ];

  // const confirmedOrdersColumns = columns.slice(0, 8);
  // confirmedOrdersColumns.append({
  //   title: "Action",
  //   dataIndex: "mark",
  //   key: "mark",
  //   render: () => (
  //     <Button type="primary" size="small">
  //       Start cooking
  //     </Button>
  //   ),
  // });

  return (
    <main>
      <Container>
        <OrderSection orderStatus="new" title="New Orders" />
        <OrderSection orderStatus="received" title="Confirmed Orders" />
        <OrderSection orderStatus="cooking" title="In Kitchen" />
        <OrderSection orderStatus="delivered" title="Delivered Orders" />

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
