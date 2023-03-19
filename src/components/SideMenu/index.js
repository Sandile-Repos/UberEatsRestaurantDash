import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
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
  ];
  const onMenuItemClicked = (menuItem) => {
    console.log(menuItem);
    navigate(menuItem.key);
  };

  return (
    <Menu items={menuItems} onClick={onMenuItemClicked} />
    //   <Menu items={menuItems} onClick={(menuItem)=>navigate(menuItem.key)} />
  );
};

export default SideMenu;