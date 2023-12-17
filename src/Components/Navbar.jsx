import { Layout, Menu, Button, Drawer, Row, Col } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookBible,
  faEarthAmericas,
  faLock,
  faPlus,
  faScrewdriverWrench,
  // faShare,
  faSquarePlus,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { onValue, ref } from "firebase/database";
import { auth, db } from "../Utils/Firebase/Firebase_config";
import { signOut } from "firebase/auth";

export default function Navbar(props) {
  const navigate = useNavigate();

  const connectedRef = ref(db, ".info/connected");
  onValue(connectedRef, (snap) => {
    console.log(snap.val());
  });
  const connectedIcon = connectedRef ? (
    <FontAwesomeIcon icon={faWifi} style={{ color: "#06c767" }} />
  ) : (
    <FontAwesomeIcon icon={faEarthAmericas} style={{ color: "#f22602" }} />
  );

  const { Header } = Layout;
  const [current, setCurrent] = useState(props.number);
  const logout = {
    user: "",
    email: "",
    uid: "",
    lastSignInTime: "",
    creationTime: "",
    refreshToken: "",
    expirationTime: "",
    accessToken: "",
  };
  const onClick = (e) => {
    const routes = {
      1: "/dashboard",
      2: "/billing",
      3: "/billing-manage",
      4: "/productentry",
      5: "/updates",
      // "6": "/admin/accounts/account-in",
      // "7": "/admin/accounts/account-out",
      8: "/settings",
      9: "/",
      default: "/dashboard",
    };

    setCurrent(e.key);
    log_out();
    function log_out() {
      if (e.key === "9") {
        signOut(auth).then(() => {
          localStorage.setItem("user", JSON.stringify(logout));
          navigate("/");
        });
      } else {
        navigate(routes[e.key] || routes["default"]);
      }
    }
  };

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
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

  const items1 = [
    getItem("Dashboard", "1", null, null, null),
    getItem(
      "Billing",
      null,
      <FontAwesomeIcon icon={faBookBible} style={{ color: "#10cb14" }} />,
      [
        getItem(
          "New",
          "2",
          <FontAwesomeIcon icon={faPlus} style={{ color: "#07ab38" }} />
        ),
        getItem(
          "Manage Bill",
          "3",
          <FontAwesomeIcon icon={faBook} style={{ color: "#f04f0a" }} />
        ),
      ]
    ),
    getItem(
      "Stock",
      null,
      <FontAwesomeIcon icon={faSquarePlus} style={{ color: "#f04f0a" }} />,
      [
        getItem(
          "Products",
          "4",
          <FontAwesomeIcon icon={faBookBible} style={{ color: "#10cb14" }} />
        ),
        getItem(
          "Updates",
          "5",
          <FontAwesomeIcon icon={faBookBible} style={{ color: "#10cb14" }} />
        ),
      ]
    ),
    // getItem(
    //   "Account In",
    //   "6",
    //   <FontAwesomeIcon
    //     icon={faShare}
    //     flip="horizontal"
    //     style={{ color: "#10cb14" }}
    //   />,
    //   null,
    //   null
    // ),
    // getItem(
    //   "Account Out",
    //   "7",
    //   <FontAwesomeIcon icon={faShare} style={{ color: "#f22602" }} />,
    //   null,
    //   null
    // ),
  ];

  const items2 = [
    getItem(
      "Setings",
      "8",
      <FontAwesomeIcon
        icon={faScrewdriverWrench}
        style={{ color: "#f22602" }}
      />
    ),
    getItem(null, null, connectedIcon),
    getItem(null, "9", <FontAwesomeIcon icon={faLock} />),
  ];

  const items3 = [
    getItem("Dashboard", "1", null, null, null),
    getItem(
      "New",
      "2",
      <FontAwesomeIcon icon={faPlus} style={{ color: "#07ab38" }} />
    ),
    getItem(
      "Manage Bill",
      "3",
      <FontAwesomeIcon icon={faBook} style={{ color: "#f04f0a" }} />
    ),
    getItem(
      "Products",
      "4",
      <FontAwesomeIcon icon={faBookBible} style={{ color: "#10cb14" }} />
    ),
    getItem(
      "Updates",
      "5",
      <FontAwesomeIcon icon={faBookBible} style={{ color: "#10cb14" }} />
    ),
    // getItem(
    //   "Account In",
    //   "6",
    //   <FontAwesomeIcon
    //     icon={faShare}
    //     flip="horizontal"
    //     style={{ color: "#10cb14" }}
    //   />,
    //   null,
    //   null
    // ),
    // getItem(
    //   "Account Out",
    //   "7",
    //   <FontAwesomeIcon icon={faShare} style={{ color: "#f22602" }} />,
    //   null,
    //   null
    // ),
  ];

  return (
    <>
      <Layout className="layout">
        <Header style={{ padding: 0, background: "white", position: "sticky" }}>
          <Row justify="space-between" align="middle">
            <Col xs={0} sm={0} md={14}>
              <Menu
                theme="light"
                mode="horizontal"
                onClick={onClick}
                items={items1}
                selectedKeys={[current]}
              />
            </Col>
            <Col xs={0} sm={0} md={6}>
              <Menu
                theme="light"
                mode="horizontal"
                onClick={onClick}
                selectedKeys={[current]}
                items={items2}
              />
            </Col>
            <Col xs={4} sm={4} md={0}>
              <Button type="primary" danger onClick={showDrawer}>
                <MenuOutlined />
              </Button>
            </Col>
          </Row>
          <Drawer
            title="Menu"
            placement="right"
            onClick={onClose}
            onClose={onClose}
            open={visible}
          >
            <Menu
              theme="light"
              mode="vertical"
              onClick={onClick}
              selectedKeys={[current]}
              items={items3}
            ></Menu>
          </Drawer>
        </Header>
      </Layout>
    </>
  );
}
