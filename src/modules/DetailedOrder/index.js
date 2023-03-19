import React from "react";
import { Card, Descriptions, Divider, List, Button } from "antd";
import { useParams } from "react-router-dom";

import dishes from "../../assets/data/dishes.json";

const DetailedOrder = () => {
  const { id } = useParams();
  return (
    <Card title={`Order ${id}`} style={{ margin: 20 }}>
      <Descriptions bordered column={{ lg: 1, md: 1, sm: 1 }}>
        <Descriptions.Item label="Customer">Sandile Dladla</Descriptions.Item>
        <Descriptions.Item label="Customer Address">
          031 Durban Road, Durban, South Africa
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <List
        dataSource={dishes}
        renderItem={(dishItem) => (
          <List.Item>
            <div style={{ fontWeight: "bold" }}>
              {dishItem.name} x {dishItem.quantity}
            </div>
            <div>{dishItem.price}</div>
          </List.Item>
        )}
      />
      <Divider />
      <div style={styles.totalSumContainer}>
        <h2>Total:</h2>
        <h2 style={styles.totalPrice}>R42.96</h2>
      </div>
      <Divider />
      <div style={styles.buttonsContainer}>
        <Button
          block
          style={{ ...styles.button, backgroundColor: "red" }}
          size="large"
        >
          Decline Order
        </Button>
        <Button block style={styles.button} type="primary" size="large">
          Accept Order
        </Button>
      </div>
      <Button block style={styles.button} type="primary" size="large">
        Food is Ready
      </Button>
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
    marginLeft: 20,
  },
};
export default DetailedOrder;