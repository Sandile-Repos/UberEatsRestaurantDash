import React from "react";
import { Button, Card, Table } from "antd";
import dishes from "../../assets/data/dishes.json";
import { Link } from "react-router-dom";

const RestaurantMenu = () => {
  const tableColumns = [
    {
      title: "Menu Item",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "name",
      render: (price) => `R ${price}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="primary" danger>
          Remove
        </Button>
      ),
    },
  ];

  const renderNewItemButton = () => {
    return (
      <Link to={"create"}>
        <Button>New Item</Button>
      </Link>
    );
  };
  return (
    <Card title="Menu" style={{ margin: 20 }} extra={renderNewItemButton()}>
      <Table dataSource={dishes} columns={tableColumns} rowKey="id" />
    </Card>
  );
};

export default RestaurantMenu;
