import React, { useState } from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaRegLaughWink, FaHeart, FaExchangeAlt } from 'react-icons/fa';
import { MdProductionQuantityLimits } from "react-icons/md";
import { FiMaximize2 } from "react-icons/fi";
import { GiClothes } from "react-icons/gi";
import { SiHandshake } from "react-icons/si";
import { BsCurrencyDollar } from "react-icons/bs";
import image from "./bg1.png";
import "./sideBar.scss"
import { Link } from 'react-router-dom';

export const SideBar = () => {

  const [width, setWidth] = useState<number>(270);

  const changeWidthSidibar = () => {
    if (width == 80) {
      setWidth(270);
    }
    else {
      setWidth(80);
    }
  }

  return (
    <ProSidebar
      image={image}
      collapsed={false}
      toggled={false}
      width={width}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          SidebarTitle
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}>
            Dashboard
            <Link to="/admin" />
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            Banners
            <Link to="/admin/banner" />
          </MenuItem>
          <MenuItem icon={<GiClothes />}>
            Products
            <Link to="/admin/products" />
          </MenuItem>
          <MenuItem icon={<FaRegLaughWink />}>
            ЖАНР
            <Link to="/admin/category" />
          </MenuItem>
          {/* <MenuItem icon={<FaHeart />}>
            Blog
            <Link to="/admin/blog" />
          </MenuItem> */}
          <MenuItem icon={<SiHandshake />}>
            ПИСЬМЕННИК
            <Link to="/admin/designer" />
          </MenuItem>
          <MenuItem icon={<MdProductionQuantityLimits />}>
            Orders
            <Link to="/admin/orders" />
          </MenuItem>
          {/* <SubMenu title="Statistics" icon={<BsCurrencyDollar />}>
            <MenuItem>
              Customers
              <Link to="/admin/customers" />
            </MenuItem>
            <MenuItem>
              Pre-ordered Products
              <Link to="/admin/pre-ordered" />
            </MenuItem>
            <MenuItem>
              Locations
              <Link to="/admin/locations" />
            </MenuItem>
            <MenuItem>
              Clicks
              <Link to="/admin/clicks" />
            </MenuItem>
            <MenuItem>
              Phones
              <Link to="/admin/phones" />
            </MenuItem>
            <MenuItem>
              E-mails
              <Link to="/admin/e-mails" />
            </MenuItem>
          </SubMenu> */}
          <MenuItem icon={<FaExchangeAlt />} onClick={() => changeWidthSidibar()}>
            Change Size
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};