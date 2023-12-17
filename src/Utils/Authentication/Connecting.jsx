import { message } from "antd";
import React, { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase/Firebase_config";

export default function Connection() {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    let isMounted = true;

    const handleChange = (snap) => {
      if (isMounted) {
        if (snap.val()) {
          messageApi
            .open({
              type: "loading",
              content: "Connecting...",
              duration: 2.5,
            })
            .then(() => message.success("Connected", 2.5));
        } else {
          messageApi
            .open({
              type: "loading",
              content: "Connecting...",
              duration: 2.5,
            })
            .then(() => message.error("Connection Lost, Disconnected", 2.5));
        }
      }
    };
    onValue(ref(db, ".info/connected"), handleChange);
    return () => {
      isMounted = false;
    };
  }, [messageApi]);

  return <>{contextHolder}</>;
}
