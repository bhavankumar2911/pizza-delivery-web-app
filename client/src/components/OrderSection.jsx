import { Typography, Table, Button, message } from "antd";
import axios from "axios";
import React from "react";
import { useMutation } from "react-query";

const OrderSection = ({
  orders,
  title,
  orderStatus,
  tableData,
  setTableData,
}) => {
  const { mutate } = useMutation(
    (data) =>
      axios.patch(`/order/update-status/${data.id}`, { status: data.status }),
    {
      onError: (err) => {
        message.error(err.response.data.message);
      },
      onSuccess: (res) => {
        console.log(res.data);
        const orderId = res.data.order._id;
        setTableData([
          ...tableData.map((item) => {
            if (item._id == orderId)
              return { ...item, status: res.data.order.status };
            else return { ...item };
          }),
        ]);
        message.success(res.data.message);
      },
    }
  );
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      textWrap: "word-break",
      width: "10px",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Customer Id",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Customer Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Customer Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Customer Address",
      dataIndex: "address",
      key: "address",
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
    // new: {
    //   title: "Action",
    //   dataIndex: "mark",
    //   key: "mark",
    //   render: (_, record) => {
    //     return (
    //       <Button
    //         type="primary"
    //         size="small"
    //         onClick={() => console.log(record._id)}
    //       >
    //         Cook
    //       </Button>
    //     );
    //   },
    // },
    received: {
      title: "Action",
      dataIndex: "mark",
      key: "mark",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => mutate({ id: record._id, status: "cooking" })}
        >
          Cook
        </Button>
      ),
    },
    cooking: {
      title: "Action",
      dataIndex: "mark",
      key: "mark",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => mutate({ id: record._id, status: "delivered" })}
        >
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
        dataSource={orders}
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
