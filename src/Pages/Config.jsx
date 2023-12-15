import { Card } from 'antd'
import React, { useState } from 'react'
import BankDetails from './Settings/BankDetails';

export default function Config() {

    const [activeTabKey, setActiveTabKey] = useState("Bank");

  const tabList = [
    {
      key: "Bank",
      tab: "Bank",
    },
    // {
    //   key: "Billing",
    //   tab: "Billing",
    // },
    // {
    //   key: "Test",
    //   tab: "Test",
    // },
    // {
    //   key: "Templates",
    //   tab: "Templates",
    // },
    // {
    //   key: "Logo",
    //   tab: "Logo",
    // },
    // {
    //   key: "Password",
    //   tab: "Password",
    // },
    // {
    //   key: "WhatsApp",
    //   tab: "WhatsApp",
    // },
    // {
    //   key: "Teleradio",
    //   tab: "Teleradio",
    // },
  ];
  const contentList = {
    Bank: <BankDetails />,
    // Billing: <Billing/>,
    // Test: <></>,
    // Templates: <Templates/>,
    // Logo: <></>,
    // Password: <></>,
    // WhatsApp: <></>,
    // Teleradio: <></>,
  };
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };
  return (
    <div className="container">
        <Card
          style={{
            width: "100%",
          }}
          title="KANIKA DIAGNOSTIC & POLYCLINIC Settings"
          tabList={tabList}
          activeTabKey={activeTabKey}
          onTabChange={onTabChange}
        >
          {contentList[activeTabKey]}
        </Card>
      </div>
  )
}
