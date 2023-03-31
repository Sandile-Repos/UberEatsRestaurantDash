import React, { useEffect, useState } from "react";
import { Card, Table, Tag } from "antd";

// import ordersHistory from "../../assets/data/orders-history.json";
import { useRestaurantContext } from "../../contexts/RestaurantContext.js";
import { DataStore } from "aws-amplify";
import { Order, OrderStatus } from "../../models";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState();
  const { restaurant } = useRestaurantContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    //filter restaurant with certain statuses usinf or keyword
    DataStore.query(Order, (o) =>
      o.and((o) => [
        o.orderRestaurantId.eq(restaurant.id),
        o.or((c) => [
          o.status.eq("PICKED_UP"),
          o.status.eq("COMPLETED"),
          o.status.eq("DECLINED_BY_RESTAURANT"),
        ]),
      ])
    ).then(setOrders);
  }, [restaurant]);

  const renderOrderStatus = (orderStatus) => {
    const statusToColor = {
      [OrderStatus.PICKED_UP]: "orange",
      [OrderStatus.COMPLETED]: "green",
      [OrderStatus.DECLINED_BY_RESTAURANT]: "red",
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
    <Card title={"Order History"} style={{ margin: 20 }}>
      <Table
        dataSource={orders}
        columns={tableColumns}
        rowKey="id"
        onRow={(orderItem) => ({
          onClick: () => navigate(`/order/${orderItem.id}`), // the trailing forward slash helps in not adding page to order-history but going to orders
        })}
      />
    </Card>
  );
};

export default OrderHistory;
