import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormOutlined,
  StarOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCartPlus, faGears, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar(props) {
  const navigate = useNavigate();
  const { Sider } = Layout;
  const [current, setCurrent] = useState(props.number);

  const routeMapping = {
    '2': '/billing',
    '9': '/productentry',
    default: '/dashboard',
  };
  
  const navigateToRoute = (key) => {
    const route = routeMapping[key] || routeMapping.default;
    navigate(route);
  };
  
  const onClick = (e) => {
    navigateToRoute(e.key);
    setCurrent(e.key);
    console.log(e.key);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem('FRONT DESK',null,null,[
      getItem('Billing', '1', <FontAwesomeIcon icon={faBook} />,[
        getItem('New','2',<StarOutlined />),
        getItem('Manage Bill','3',<StarOutlined />),
      ]),
    ],'group'),
    getItem('ACCOUNT DESK',null,null,[
      getItem('Purchase','4',<FontAwesomeIcon icon={faCartPlus} />,[
        getItem('Vendor','5',<FormOutlined/>),
        getItem('Orders','6',<FormOutlined/>),
        getItem('Purchase Bill','7',<FormOutlined/>)
      ]),
      getItem('Stock','8',<SettingOutlined />,[
        getItem('Products','9',<FormOutlined/>),
      ]),
    ],'group'),
    getItem('ADMIN DESK',null,null,[
      getItem('Master Settings','10',<FontAwesomeIcon icon={faGears} />,[
        getItem('Configuration','11',<FontAwesomeIcon icon={faScrewdriverWrench} />),
      ]),
    ],'group')
  ];

  return (
    <>
      <Sider
        style={{
            minHeight: '100vh',
        }}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          onClick={onClick} 
          selectedKeys={[current]}
        />
      </Sider>
    </>
  );
}
