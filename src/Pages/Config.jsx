import { Card } from "antd";
import React, { useEffect, useState } from "react";
import BankDetails from "./Settings/BankDetails";
import ShopDetails from "./Settings/ShopDetails";

export default function Config() {
  const [activeTabKey, setActiveTabKey] = useState("Details");

  const tabList = [
    {
      key: "Details",
      tab: "Details",
    },
    {
      key: "Bank",
      tab: "Bank",
    },
  ];
  const contentList = {
    Bank: <BankDetails />,
    Details: <ShopDetails />,
  };
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const [Permission, setPermission] = useState(true);

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("user")) || {};

    const { email } = storedData;

    const data = JSON.parse(sessionStorage.getItem("UserData"));

    const isUserInData = data.some((item) => item.Email === email);
    setPermission(isUserInData);
  }, []);

  return (
    <div className="container my-3">
      <Card
        style={{
          width: "100%",
        }}
        title="Settings"
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        {!Permission ? (
          <>{contentList[activeTabKey]}</>
        ) : (
          <>
            <div className="alert alert-danger" role="alert">
              <strong>You have no permission</strong>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
