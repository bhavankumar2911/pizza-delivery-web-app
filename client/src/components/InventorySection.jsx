import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Space, Typography, Card, Button, Badge, Modal } from "antd";

const InventorySection = ({ title, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <Modal
        title="Update Stock"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      <Typography.Title level={4}>{title}</Typography.Title>
      <br />
      <Space
        size="large"
        style={{
          flexWrap: "wrap",
          display: "flex",
          //   justifyContent: "center",
        }}
      >
        {data.map((item, index) => {
          console.log(item.quantity <= item.threshold);
          return (
            <Card
              style={{ textTransform: "capitalize" }}
              key={index}
              title={
                <Space>
                  <span>{item.item}</span>
                  <Button onClick={showModal} icon={<PlusCircleOutlined />} />
                </Space>
              }
              bordered={false}
            >
              <p>
                <Space>
                  In Stock:
                  <Badge
                    count={item.quantity}
                    color={
                      item.quantity <= item.threshold ? "#ff4d4f" : "#52c41a"
                    }
                  />
                </Space>
              </p>
              <Button size="small" style={{ textTransform: "capitalize" }}>
                set threshold
              </Button>
            </Card>
          );
        })}
      </Space>
      <br />
    </section>
  );
};

export default InventorySection;
