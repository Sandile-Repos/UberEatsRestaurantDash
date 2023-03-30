import React from "react";
import { Form, Input, Button, Card, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";

const CreateMenuItem = () => {
  return (
    <Card title="New Menu Item" style={{ margin: 20 }}>
      <Form layout="vertical" wrapperCol={{ span: 8 }}>
        <Form.Item label="Dish Name" required>
          <Input placeholder="Enter dish Name" />
        </Form.Item>
        <Form.Item label="Dish Description" required>
          <TextArea rows={4} placeholder="Enter dish Name" />
        </Form.Item>
        <Form.Item label="Price (R)" required>
          <InputNumber />
        </Form.Item>
        <Form.Item required>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateMenuItem;
