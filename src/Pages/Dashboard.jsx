import { Card } from "antd";
import React, { useState } from "react";
import MonthLineChrat from "./Components/MonthLineChrat";
import DayLineChart from "./Components/DayLineChart";

function Dashboard() {
  const [activeTabKey, setActiveTabKey] = useState("Month");

  const tabList = [
    {
      key: "Month",
      tab: "Month",
    },
    {
      key: "Day",
      tab: "Day",
    },
  ];

  const contentList = {
    Day: (
      <Card bordered={false} className="h-full">
        <DayLineChart/>
      </Card>
    ),
    Month: (
      <Card bordered={false} className="h-full">
        <MonthLineChrat/>
      </Card>
    ),
  };

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };
  return (
    <div className="container my-3">
      <Card
        style={{
          width: "100%",
        }}
        title="Statistics"
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        {contentList[activeTabKey]}
      </Card>
    </div>
  );
}

export default Dashboard;
