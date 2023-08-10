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
          <MenuItem icon={<FaRegLaughWink />}>
            ЖАНР
            <Link to="/admin/genre" />
          </MenuItem>
          <MenuItem icon={<SiHandshake />}>
            ПИСЬМЕННИКИ
            <Link to="/admin/authors" />
          </MenuItem>
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