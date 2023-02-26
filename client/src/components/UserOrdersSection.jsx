import React from "react";
import { Table, Typography } from "antd";

const UserOrdersSection = ({ sectionTitle, orders }) => {
  let tableData = [];

  for (let i = 0; i < orders.length; i += 1) {
    const orderItem = orders[i];
    console.log(orderItem);
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

    tableData.push({
      ...orderItem,
      pizzas: pizzas.join(", ").trim(),
      addons: addons.join(", ").trim(),
    });
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Pizza",
      dataIndex: "pizzas",
      key: "pizzas",
    },
    {
      title: "Addons",
      dataIndex: "addons",
      key: "addons",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <section>
      <br />
      <Typography.Title level={3}>{sectionTitle}</Typography.Title>
      <br />
      <Table pagination={false} dataSource={tableData} columns={columns} />
    </section>
  );
};

export default UserOrdersSection;
