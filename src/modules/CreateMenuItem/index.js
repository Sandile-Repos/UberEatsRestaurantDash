import React from "react";
import { Form, Input, Button, Card, InputNumber, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DataStore } from "aws-amplify";
import { Dish } from "../../models";
import { useRestaurantContext } from "../../contexts/RestaurantContext.js";
import { useNavigate } from "react-router-dom";

const CreateMenuItem = () => {
  const { restaurant } = useRestaurantContext();
  const navigation = useNavigate();
  const onFinish = ({ name, description, price }) => {
    DataStore.save(
      new Dish({ name, description, price, restaurantID: restaurant.id })
    );
    message.success("Dish was created");
    navigation("/menu");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Card title="New Menu Item" style={{ margin: 20 }}>
      <Form
        layout="vertical"
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Dish Name"
          name="name"
          rules={[{ required: true }]}
          required
        >
          <Input placeholder="Enter dish Name" />
        </Form.Item>
        <Form.Item
          label="Dish Description"
          name="description"
          rules={[{ required: true }]}
          required
        >
          <TextArea rows={4} placeholder="Enter dish Name" />
        </Form.Item>
        <Form.Item
          label="Price (R)"
          name="price"
          rules={[{ required: true, type: "number" }]}
          required
        >
          <InputNumber />
        </Form.Item>
        <Form.Item required>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateMenuItem;
