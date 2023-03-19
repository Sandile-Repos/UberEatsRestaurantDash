import React, { useState } from "react";
import { Form, Input, Card, Button } from "antd";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

const Settings = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const getAddressLatLng = async (address) => {
    setAddress(address);
    const geocodedByAddress = await geocodeByAddress(address.label);
    // console.log("geo", geocodedByAddress[0]);
    const latLng = await getLatLng(geocodedByAddress[0]);
    setCoordinates(latLng);
  };

  return (
    <Card title="Restaurant Details" style={{ margin: 20 }}>
      <Form layout="vertical" wrapperCol={{ span: 8 }}>
        <Form.Item label="Restaurant Details" required>
          <Input placeholder="Enter restaurant name here" />
        </Form.Item>
        <Form.Item label="Restaurant Address" required>
          <GooglePlacesAutocomplete
            apiKey={API_KEY}
            selectProps={{ value: address, onChange: getAddressLatLng }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
      <span>
        {coordinates?.lat} - {coordinates?.lng}
      </span>
    </Card>
  );
};

export default Settings;
