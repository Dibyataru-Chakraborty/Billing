import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Input, Space, Table, Button, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ref, remove } from "firebase/database";
import { db } from "../Utils/Firebase/Firebase_config";

export default function Log() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Sl",
      dataIndex: "key",
      width: 50,
      rowScope: "row",
      sorter: (a, b) => a.key - b.key,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("key"),
    },
    {
      title: "Email",
      dataIndex: "Email",
      width: 150,
      sorter: (a, b) => a.Email.length - b.Email.length,
      ...getColumnSearchProps("Email"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Login",
      dataIndex: "lastSignInTime",
      width: 100,
      sorter: (a, b) => a.lastSignInTime - b.lastSignInTime,
      ...getColumnSearchProps("lastSignInTime"),
      sortDirections: ["descend", "ascend"],
      render: (text) => {
        var lastSignInTime = new Date(parseInt(text, 10));
        var formattedDate = lastSignInTime.toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });

        return (
          <>
            <div>{formattedDate}</div>
          </>
        );
      },
    },
    {
      title: "IP",
      dataIndex: "Ip",
      width: 100,
      sorter: (a, b) => a.Ip.length - b.Ip.length,
      ...getColumnSearchProps("Ip"),
      sortDirections: ["descend", "ascend"],
    },
  ];

  const data = [];
  var count = "0";
  JSON.parse(sessionStorage.getItem("LogData")).forEach((element) => {
    if (element !== null) {
      data.push({
        key: count++,
        id: element.id,
        Email: element.user,
        Ip: element.ip,
        lastSignInTime: element.lastSignInTime,
      });
    }
  });

  const [Permission, setPermission] = useState(true);
  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("user")) || {};

    const { email } = storedData;

    const data = JSON.parse(sessionStorage.getItem("UserData"));

    const isUserInData = data.some((item) => item.Email === email);
    setPermission(isUserInData);
  }, []);

  const Delete = async () => {
    await remove(ref(db, "Log"));
    message.success("Delete Successfully");
  };

  return (
    <>
      <div
        className="container"
        style={{
          overflow: "auto",
        }}
      >
        {!Permission && data.length > 100 ? (
          <>
            <div className="alert alert-danger my-3" role="alert">
              File size exceeded 100
              <button
                type="button"
                className="btn btn-danger mx-3"
                id="Delete"
                onClick={Delete}
              >
                Delete
              </button>
              <label htmlFor="Delete">Click On Delete Button</label>
            </div>
          </>
        ) : null}
        <div className="row my-3">
          <div className="card">
            <div className="row my-3">
              <Table
                columns={columns}
                dataSource={data}
                scroll={{
                  y: 1000,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
