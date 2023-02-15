import { Typography, Table, Button } from "antd";
import React from "react";
import orders from "../orders.json";

const OrderSection = ({ orderStatus, title }) => {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Customer Id",
      dataIndex: "customer_id",
      key: "customer_id",
    },
    {
      title: "Customer Email",
      dataIndex: "customer_email",
      key: "customer_email",
    },
    {
      title: "Customer Phone",
      dataIndex: "customer_phone",
      key: "customer_phone",
    },
    {
      title: "Customer Address",
      dataIndex: "customer_address",
      key: "customer_address",
    },
    {
      title: "Pizza",
      dataIndex: "pizza",
      key: "pizza",
    },
    {
      title: "Addons",
      dataIndex: "addons",
      key: "addons",
    },
  ];

  const actionColumn = {
    new: {
      title: "Action",
      dataIndex: "mark",
      key: "mark",
      render: () => (
        <Button type="primary" size="small">
          Confirm
        </Button>
      ),
    },
    received: {
      title: "Action",
      dataIndex: "mark",
      key: "mark",
      render: () => (
        <Button type="primary" size="small">
          Cook
        </Button>
      ),
    },
    cooking: {
      title: "Action",
      dataIndex: "mark",
      key: "mark",
      render: () => (
        <Button type="primary" size="small">
          Dispatch
        </Button>
      ),
    },
  };

  //   console.log(columns.push(actionColumn["new"]));

  return (
    <section>
      <br />
      <Typography.Title level={3}>{title}</Typography.Title>
      <br />
      <Table
        pagination={false}
        dataSource={orders.filter((order) => order.status == orderStatus)}
        columns={
          orderStatus == "delivered"
            ? columns
            : [...columns, actionColumn[orderStatus]]
        }
      />
    </section>
  );
};

export default OrderSection;
