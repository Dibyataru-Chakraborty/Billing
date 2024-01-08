import { Button, Result } from "antd";
import React from "react";

export default function Offline() {
  return (
    <div className="container my-2">
      <Result
        status="500"
        title="Network Lost"
        subTitle="Check your internet"
        extra={
            <Button type="primary" onClick={() => window.location.reload()}>Refresh</Button>
        }
      />
    </div>
  );
}
