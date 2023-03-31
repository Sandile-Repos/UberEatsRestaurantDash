import React, { useEffect, useState } from "react";
import { Card, Descriptions, Divider, List, Button, Tag, Spin } from "antd";
import { useParams } from "react-router-dom";

import { DataStore } from "aws-amplify";
import { Order, OrderDish, OrderStatus, User } from "../../models";

const statusToColor = {
  [OrderStatus.NEW]: "green",
  [OrderStatus.COOKING]: "orange",
  [OrderStatus.READY_FOR_PICKUP]: "red",
  [OrderStatus.ACCEPTED]: "purple",
};

const DetailedOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    DataStore.query(Order, id).then(setOrder);
  }, [id]);

  useEffect(() => {
    if (order?.userID) {
      DataStore.query(User, order.userID).then(setCustomer);
    }
  }, [order?.userID]);

  useEffect(() => {
    if (!order?.id) {
      return;
    }
    DataStore.query(OrderDish, (c) => c.orderID.eq(order.id)).then(setDishes);
  }, [order?.id]);

  console.log(dishes);
  // console.log(JSON.stringify(dishes, null, 2));
  if (!order) {
    return <Spin size="large" />;
  }

  const acceptOrder = async () => {
    updatedOrderStatus(OrderStatus.COOKING);
  };

  const declineOrder = async () => {
    updatedOrderStatus(OrderStatus.DECLINED_BY_RESTAURANT);
  };

  const readyForPickup = async () => {
    updatedOrderStatus(OrderStatus.READY_FOR_PICKUP);
  };

  const updatedOrderStatus = async (newStatus) => {
    const updatedOrder = await DataStore.save(
      Order.copyOf(order, (updated) => {
        updated.status = newStatus;
      })
    );
    setOrder(updatedOrder);
  };

  return (
    <Card title={`Order ${id}`} style={{ margin: 20 }}>
      <Tag color={statusToColor[order?.status]}>{order?.status}</Tag>
      <Descriptions bordered column={{ lg: 1, md: 1, sm: 1 }}>
        <Descriptions.Item label="Customer">{customer?.name}</Descriptions.Item>
        <Descriptions.Item label="Customer Address">
          {customer?.address}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <List
        dataSource={dishes}
        renderItem={(dishItem) => (
          <List.Item>
            <div style={{ fontWeight: "bold" }}>
              {dishItem.Dish.name} x {dishItem.quantity}
            </div>
            <div>{dishItem.Dish.price}</div>
          </List.Item>
        )}
      />
      <Divider />
      <div style={styles.totalSumContainer}>
        <h2>Total:</h2>
        <h2 style={styles.totalPrice}>R{order?.total?.toFixed(2)}</h2>
      </div>
      <Divider />
      {order?.status === OrderStatus.NEW && (
        <div style={styles.buttonsContainer}>
          <Button
            block
            danger
            style={{ ...styles.button }}
            size="large"
            onClick={declineOrder}
          >
            Decline Order
          </Button>
          <Button
            block
            style={styles.button}
            type="primary"
            size="large"
            onClick={acceptOrder}
          >
            Accept Order
          </Button>
        </div>
      )}
      {order?.status === OrderStatus.COOKING && (
        <Button
          block
          style={styles.button}
          type="primary"
          size="large"
          onClick={readyForPickup}
        >
          Food is Ready
        </Button>
      )}
    </Card>
  );
};

const styles = {
  totalSumContainer: {
    flexDirection: "row",
    display: "flex",
  },
  totalPrice: {
    marginLeft: "auto",
    fontWeight: "bold",
  },
  buttonsContainer: {
    display: "flex",
    paddingBottom: 30,
  },
  button: {
    marginRight: 20,
    // marginLeft: 20,
  },
};
export default DetailedOrder;
