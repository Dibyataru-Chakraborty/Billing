import React, { useEffect } from "react";

import { message } from "antd";

import { ref, onValue } from "firebase/database";
import { db } from "../Firebase/Firebase_config";

export default function Connection() {
  const [messageApi, contextHolder] = message.useMessage();

  const check = () => {
    const connectedRef = ref(db, ".info/connected");
    onValue(connectedRef, (snap) => {
      snap.val()
        ? messageApi
            .open({
              type: "loading",
              content: "Connecting...",
              duration: 2.5,
            })
            .then(() => message.success("Connected", 2.5))
        : messageApi
            .open({
              type: "loading",
              content: "Connecting...",
              duration: 2.5,
            })
            .then(() => message.error("Connection Lost, Disconnected", 2.5));
    });
  };

  useEffect(() => {
    check();
  }, [0])
  
  return <>{contextHolder}</>;
}
