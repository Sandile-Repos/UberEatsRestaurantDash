import React from "react";
import { Card, Table, Tag } from "antd";

import ordersHistory from "../../assets/data/orders-history.json";

const OrderHistory = () => {
  //   const renderOrderStatus = (orderStatus) => {
  //     if (orderStatus === "Delivered") {
  //       return <Tag color={"green"}>{orderStatus}</Tag>;
  //     }
  //     return <Tag color={"red"}>{orderStatus}</Tag>;
  //   };
  const tableColumns = [
    {
      title: "Order ID",
      dataIndex: "orderID",
      key: "orderID",
    },
    {
      title: "Delivery Address",
      dataIndex: "deliveryAddress",
      key: "deliveryAddress",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `R ${price}`,
    },
    {
      title: "Delivery Address",
      dataIndex: "deliveryAddress",
      key: "orderID",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Delivered" ? "green" : "red"}>{status}</Tag>
      ),
    },
  ];

  return (
    <Card title={"Order History"} style={{ margin: 20 }}>
      <Table
        dataSource={ordersHistory}
        columns={tableColumns}
        rowKey="orderID"
      />
    </Card>
  );
};

export default OrderHistory;
