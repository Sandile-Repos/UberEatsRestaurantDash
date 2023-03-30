import React, { useState, useEffect } from "react";
import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

import { DataStore } from "aws-amplify";
import { Order, OrderStatus } from "../../models";

const Orders = () => {
  const [orders, setOrders] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    DataStore.query(Order).then(setOrders);
  }, []);

  console.log(orders);
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
      title: "Delivery Address",
      dataIndex: "deliveryAddress",
      key: "deliveryAddress",
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
        rowKey="orderID"
        onRow={(orderItem) => ({
          onClick: () => navigate(`order/${orderItem.orderID}`),
        })}
      />
    </Card>
  );
};

export default Orders;
