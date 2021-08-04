import React, { useRef, useState } from "react";
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { DesktopOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

function ScreenShare() {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://www.aliyun.com">2nd menu item</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
        <DesktopOutlined />
    </Dropdown>
  )
}

export default ScreenShare;