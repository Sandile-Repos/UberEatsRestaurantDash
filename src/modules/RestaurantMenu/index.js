import React, { useEffect, useState } from "react";
import { Button, Card, Popconfirm, Table } from "antd";
// import dishes from "../../assets/data/dishes.json";
import { Link } from "react-router-dom";
import { DataStore } from "aws-amplify";
import { Dish } from "../../models";
import { useRestaurantContext } from "../../contexts/RestaurantContext.js";

const RestaurantMenu = () => {
  const [dishes, setDishes] = useState([]);
  const { restaurant } = useRestaurantContext();

  useEffect(() => {
    if (!restaurant?.id) {
      return;
    }
    DataStore.query(Dish, (c) => c.restaurantID.eq(restaurant.id)).then(
      setDishes
    );
  }, [restaurant?.id]);

  const deleteDish = (dish) => {
    // console.log("Delete dish", dish.description);
    DataStore.delete(dish);
    setDishes(dishes.filter((d) => d.id !== dish.id));
  };

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
      render: (_, item) => (
        <Popconfirm
          placement="topRight"
          title={"Deleting Dish"}
          description={"Are you sure you want to delete this Dish"}
          onConfirm={() => deleteDish(item)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Remove
          </Button>
        </Popconfirm>
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
