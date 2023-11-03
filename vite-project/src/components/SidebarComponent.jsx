import React from "react";
import {Menu } from 'antd';
import { UnorderedListOutlined,CheckCircleOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';



function SidebarComponent () {
    return(
        <div className="sidebar">
            <Menu mode="vertical" theme="light">
            <Menu.Item icon={<UnorderedListOutlined />} key="1">
              <Link to="">List</Link>
            </Menu.Item>
          </Menu>
        </div>
    )
}


export default SidebarComponent;