import React, { useRef, useState } from "react";
import "./styles.css";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { EllipsisOutlined } from '@ant-design/icons';

function Options() {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
      return setIsActive(!isActive); 
  }
  return (
    <div className="container">
      <div className="menu-container">
        <EllipsisOutlined onClick={onClick} className="menu-trigger" style = {{transform: 'rotate(90deg)'}}/>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>
              <a href="#">설정</a>
            </li>
            <li>
              <a href="#">문제 해결 및 도움말</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Options;