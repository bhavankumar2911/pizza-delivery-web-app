import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Modal,
  Carousel,
  Typography,
  Radio,
  Space,
  Checkbox,
} from "antd";
import { useAppContext } from "../providers/App";
const { Meta } = Card;

const PizzaCard = ({ pizza }) => {
  const { addToCart } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [base, setBase] = useState("Thin Crust");
  const [sauce, setSauce] = useState("Pesto Sauce");
  const [cheese, setCheese] = useState("Mozzarella Cheese");
  const [wantVeggies, setWantVeggies] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carousel = useRef();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = () => {
    showModal();
    // addToCart(pizza)
  };

  const onChange = (cs) => {
    setCurrentSlide(cs);
  };

  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const next = () => carousel.current.next();
  const previous = () => carousel.current.prev();

  const onBaseChange = (e) => {
    setBase(e.target.value);
  };

  const addItemToCart = () => {
    addToCart({ ...pizza, base, sauce, cheese, wantVeggies, quantity: 1 });
    setIsModalOpen(false);
  };

  const modalFooter = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "space-between",
      }}
    >
      {currentSlide != 0 && (
        <Button onClick={previous} style={{ justifySelf: "flex-start" }}>
          Previous
        </Button>
      )}

      {currentSlide != 3 && (
        <Button type="primary" onClick={next} style={{ marginLeft: "auto" }}>
          Next
        </Button>
      )}

      {currentSlide == 3 && (
        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          onClick={addItemToCart}
        >
          Confirm
        </Button>
      )}
    </div>
  );

  return (
    <React.Fragment>
      <Modal
        title="Customize your pizza"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={modalFooter}
      >
        <Carousel ref={carousel} afterChange={onChange} dots={false}>
          <div>
            <Typography.Title level={3}>Choose the base</Typography.Title>
            <Radio.Group onChange={onBaseChange} value={base}>
              <Space direction="vertical">
                <Radio value="Thin Crust">Thin Crust</Radio>
                <Radio value="Thick Crust">Thick Crust</Radio>
                <Radio value="Stuffed Crust">Stuffed Crust</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div>
            <Typography.Title level={3}>Choose sauce type</Typography.Title>
            <Radio.Group
              onChange={(e) => setSauce(e.target.value)}
              value={sauce}
            >
              <Space direction="vertical">
                <Radio value="Pesto Sauce">Pesto</Radio>
                <Radio value="White Garlic Sauce">White Garlic Sauce</Radio>
                <Radio value="Garlic Ranch Sauce">Garlic Ranch Sauce</Radio>
                <Radio value="Buffalo Sauce">Buffalo Sauce</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div>
            <Typography.Title level={3}>Choose cheese type</Typography.Title>
            <Radio.Group
              onChange={(e) => setCheese(e.target.value)}
              value={cheese}
            >
              <Space direction="vertical">
                <Radio value="Mozzarella Cheese">Mozzarella</Radio>
                <Radio value="Cheddar Cheese">Cheddar</Radio>
                <Radio value="Parmesan Cheese">Parmesan</Radio>
                <Radio value="Goat Cheese">Goat Cheese</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div>
            <Typography.Title level={3}>Extras</Typography.Title>
            <Checkbox
              onChange={(e) => setWantVeggies(e.target.checked)}
              checked={wantVeggies}
            >
              Veggies
            </Checkbox>
          </div>
        </Carousel>
      </Modal>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src={pizza.image}
            style={{ height: "200px", objectFit: "cover" }}
          />
        }
      >
        <Meta title={pizza.name} description={`Rs. ${pizza.price}`} />
        <br />
        <Button type="primary" onClick={handleAddToCart} block>
          Add To Cart
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default PizzaCard;
