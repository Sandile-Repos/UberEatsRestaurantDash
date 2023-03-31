import React, { useState, useEffect } from "react";
import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

import { DataStore } from "aws-amplify";
import { Order, OrderStatus } from "../../models";
import { useRestaurantContext } from "../../contexts/RestaurantContext.js";

const Orders = () => {
  const [orders, setOrders] = useState();
  const { restaurant } = useRestaurantContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    DataStore.query(
      Order,
      (o) =>
        o.and((o) => [
          o.orderRestaurantId.eq(restaurant.id),
          o.or((o) => [
            o.status.eq("NEW"),
            o.status.eq("COOKING"),
            o.status.eq("ACCEPTED"),
            o.status.eq("READY_FOR_PICKUP"),
          ]),
        ])

      // .or((order) =>
      //   order.status.eq("NEW")
      // .status.eq("COOKING")
      //   .status.eq("ACCEPTED")
      //   .status.eq("READY_FOR_PICKUP")
      // )
      // .or((order) => [
      //   order.status.eq("NEW"),
      //   order.status.eq("COOKING"),
      //   order.status.eq("ACCEPTED"),
      //   order.status.eq("READY_FOR_PICKUP"),
      // ])
    ).then(setOrders);
  }, [restaurant]);

  useEffect(() => {
    if (!restaurant.id) {
      return;
    }
    const subscription = DataStore.observe(Order).subscribe((msg) => {
      // create order on amplify console and link user and restaurant
      console.log(msg);
      // subscribe to order updates
      const { opType, element } = msg;
      if (opType === "INSERT" && element.orderRestaurantId === restaurant.id) {
        setOrders((existingOrders) => [element, ...existingOrders]);
      }
    });
    return () => subscription.unsubscribe();
  }, [restaurant.id]);

  // console.log(orders);
  const renderOrderStatus = (orderStatus) => {
    //   let color = "grey";
    //   if (orderStatus === OrderStatus.NEW) {
    //     color = "green";
    //   }
    //   if (orderStatus === OrderStatus.COOKING) {
    //     color = "orange";
    //   }
    //   if (orderStatus === OrderStatus.READY_FOR_PICKUP) {
    //     color = "red";
    //   }
    //   return <Tag color={color}>{orderStatus}</Tag>;

    //Switch statement

    // Or below:

    // const statusToColor ={
    //   NEW: 'green',
    //   COOKING: 'orange',
    //   READY_FOR_PICKUP: 'red',
    // }
    // return <Tag color={statusToColor[orderStatus]}>{orderStatus}</Tag>;

    //rather use  status from database and make them dynamic
    const statusToColor = {
      [OrderStatus.NEW]: "green",
      [OrderStatus.COOKING]: "orange",
      [OrderStatus.READY_FOR_PICKUP]: "red",
      [OrderStatus.ACCEPTED]: "purple",
    };
    return <Tag color={statusToColor[orderStatus]}>{orderStatus}</Tag>;
  };
  const tableColumns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Price",
      dataIndex: "total",
      key: "total",
      render: (price) => `R ${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderOrderStatus,
    },
  ];

  return (
    <Card title={"Orders"} style={{ margin: 20 }}>
      <Table
        dataSource={orders}
        columns={tableColumns}
        rowKey="id"
        onRow={(orderItem) => ({
          onClick: () => navigate(`order/${orderItem.id}`),
        })}
      />
    </Card>
  );
};

export default Orders;
