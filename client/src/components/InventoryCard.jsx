import { PlusCircleOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import {
  Card,
  Space,
  Button,
  Badge,
  Popover,
  InputNumber,
  Typography,
  message,
} from "antd";
import { useMutation } from "react-query";
import axios from "axios";

function InventoryCard({ data }) {
  const [item, setItem] = useState(data);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [thresholdForm, setThresholdForm] = useState(false);
  const [threshold, setThreshold] = useState("");
  const [quantity, setQuantity] = useState("");
  const { mutate } = useMutation(
    (mutationData) => axios.patch(`/admin/stock/${item._id}`, mutationData),
    {
      onSuccess: () => {
        setItem({ ...item, quantity: item.quantity + quantity });
        setQuantity("");
        setPopoverOpen(false);
      },
      onError: (error) => message.error(error.response.data.message),
    }
  );
  const { mutate: thresholdMutation } = useMutation(
    (mutationData) => axios.patch(`/admin/threshold/${item._id}`, mutationData),
    {
      onSuccess: () => {
        setItem({ ...item, threshold });
        setThreshold("");
        hideThresholdForm();
      },
      onError: (error) => message.error(error.response.data.message),
    }
  );

  const showPopover = () => setPopoverOpen(true);

  const hidePopover = () => setPopoverOpen(false);

  const showThresholdForm = () => setThresholdForm(true);

  const hideThresholdForm = () => setThresholdForm(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    mutate({ quantity: item.quantity + quantity });
  };

  const handleThresholdUpdate = (e) => {
    e.preventDefault();
    thresholdMutation({ threshold });
  };

  return (
    <Card
      style={{ textTransform: "capitalize" }}
      title={
        <Space>
          <span>{item.item}</span>
          <Popover
            content={
              <form onSubmit={handleUpdate}>
                <Space direction="vertical">
                  <Typography>Enter quantity to be added</Typography>
                  <Space>
                    <InputNumber
                      size="small"
                      style={{ width: "100%" }}
                      value={quantity}
                      onChange={(e) => setQuantity(e)}
                    />
                    <Button type="primary" htmlType="submit" size="small">
                      Update
                    </Button>
                  </Space>
                </Space>
              </form>
            }
            title={
              <Space
                style={{ justifyContent: "space-between", display: "flex" }}
              >
                <span>Update Stock</span>
                <span style={{ cursor: "pointer" }} onClick={hidePopover}>
                  <CloseOutlined />
                </span>
              </Space>
            }
            trigger="click"
            open={popoverOpen}
          >
            <Button icon={<PlusCircleOutlined />} onClick={showPopover} />
          </Popover>
        </Space>
      }
      bordered={false}
    >
      <p>
        <Space>
          In Stock:
          <Badge
            overflowCount={9999}
            count={item.quantity}
            color={item.quantity <= item.threshold ? "#ff4d4f" : "#52c41a"}
          />
        </Space>
      </p>
      <Popover
        content={
          <form onSubmit={handleThresholdUpdate}>
            <Space direction="vertical">
              <Typography>Enter a threshold limit</Typography>
              <Space>
                <InputNumber
                  size="small"
                  style={{ width: "100%" }}
                  value={threshold}
                  onChange={(e) => setThreshold(e)}
                />
                <Button type="primary" htmlType="submit" size="small">
                  Update
                </Button>
              </Space>
            </Space>
          </form>
        }
        title={
          <Space style={{ justifyContent: "space-between", display: "flex" }}>
            <span>Set Threshold</span>
            <span style={{ cursor: "pointer" }} onClick={hideThresholdForm}>
              <CloseOutlined />
            </span>
          </Space>
        }
        trigger="click"
        open={thresholdForm}
      >
        <Button
          size="small"
          onClick={showThresholdForm}
          style={{ textTransform: "capitalize" }}
        >
          change threshold
        </Button>
      </Popover>
    </Card>
  );
}

export default InventoryCard;
