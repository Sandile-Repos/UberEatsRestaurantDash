import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useRestaurantContext } from "../../contexts/RestaurantContext.js";

const SideMenu = () => {
  const navigate = useNavigate();
  const { restaurant } = useRestaurantContext();

  const menuItems = [
    {
      key: "/",
      label: "Orders",
    },
    {
      key: "menu",
      label: "Menu",
    },
    {
      key: "order-history",
      label: "Order History",
    },
    {
      key: "settings",
      label: "Settings",
    },
    {
      key: "signOut",
      label: "Sign Out",
      danger: true,
    },
  ];
  const onMenuItemClicked = async (menuItem) => {
    if (menuItem.key === "signOut") {
      await Auth.signOut();
      window.location.reload(); // to refresh the page and get rid of state after signing out
    } else {
      navigate(menuItem.key);
    }
  };

  return (
    <>
      {restaurant && <h4>{restaurant.name}</h4>}
      <Menu items={menuItems} onClick={onMenuItemClicked} />
      {/* <Menu items={menuItems} onClick={(menuItem)=>navigate(menuItem.key)} /> */}
    </>
  );
};

export default SideMenu;
