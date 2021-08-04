import React, { useRef, useState } from "react";
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

function OptionsCopy() {
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
      <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <EllipsisOutlined style = {{transform: 'rotate(90deg)'}}/>
      </span>
    </Dropdown>
  )
}

export default OptionsCopy;