import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Input, Space, Table, Button, Modal, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ref, set } from "firebase/database";
import { auth, db } from "../Utils/Firebase/Firebase_config";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword
} from "firebase/auth";

export default function Agents() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [loadings, setLoadings] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const showAdd = () => {
    setEmail("");
    setPassword("");
    setIsAddVisible(true);
  };

  const addOk = async () => {
    try {
      let create = await createUserWithEmailAndPassword(auth, Email, Password);

      // console.log(create);
      let UID = create.user.uid;

      let Users = {
        Email: Email,
        CreationTime: create.user.metadata.createdAt,
        // LastLogin: create.user.
      };

      setLoadings(true);

      // Simulating an asynchronous operation (e.g., API call or database update)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await set(ref(db, `Users/${UID}`), Users);

      setLoadings(false);
      // setIsAddVisible(false);
      setEmail("");
      setPassword("");
      message.info("User Added Successfully");
    } catch (error) {
      const errorMessage = error.message.includes(AuthErrorCodes.EMAIL_EXISTS)
        ? "User Already added"
        : error.message.includes(AuthErrorCodes.INVALID_EMAIL)
        ? "Invalid Email"
        : error.message.includes(AuthErrorCodes.NETWORK_REQUEST_FAILED)
        ? "Check your connection"
        : error.message.includes(AuthErrorCodes.WEAK_PASSWORD)
        ? "Weak password"
        : console.log(error.message);

      message.error(errorMessage || "An error occurred", 2.5);
      setLoadings(false);
    }
  };

  const addCancel = () => {
    setIsAddVisible(false);
  };

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
      title: "Id",
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
      title: "CreationTime",
      dataIndex: "creationTime",
      width: 100,
      sorter: (a, b) => a.creationTime.length - b.creationTime.length,
      ...getColumnSearchProps("creationTime"),
      sortDirections: ["descend", "ascend"],
      render: (text) => {
        var CreationTime = new Date(parseInt(text, 10));
        var formattedDate = CreationTime.toLocaleString("en-US", {
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
    // {
    //   title: "Options",
    //   dataIndex: "Options",
    //   width: 150,
    //   rowScope: "row",
    //   render: (text, record) => {
    //     const confirm = async () => {
    //       const { id } = record;
    //       //   await remove(ref(db, "/Users/" + id ));
    //       // admin.deleteUser()
    //       console.log(id);
    //       message.success("Agent Delete");
    //     };
    //     const cancel = () => {
    //       message.error("Agent Not Delete");
    //     };
    //     const option = (
    //       <>
    //         <Popconfirm
    //           title="Delete the Agent"
    //           description="Are you sure to delete this Agent?"
    //           onConfirm={confirm}
    //           onCancel={cancel}
    //           okText="Yes"
    //           cancelText="No"
    //         >
    //           <Button danger>
    //             <FontAwesomeIcon
    //               icon={faTrashCan}
    //               size="xl"
    //               style={{ color: "#a30000" }}
    //             />
    //           </Button>
    //         </Popconfirm>
    //       </>
    //     );
    //     return (
    //       <>
    //         <div className="text-center">{option}</div>
    //       </>
    //     );
    //   },
    // },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = [];
  var count = "0";
  JSON.parse(sessionStorage.getItem("UserData")).forEach((element) => {
    if (element !== null) {
      data.push({
        key: count++,
        id: element.id,
        Email: element.Email,
        creationTime: element.CreationTime,
      });
    }
  });

  const [Permission, setPermission] = useState(true);

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("user")) || {};

    const { email } = storedData;

    const isUserInData = data.some((item) => item.Email === email);
    setPermission(isUserInData);
  }, [data]);

  return (
    <>
      {!Permission ? (
        <>
          <Modal
            title="ADD USER"
            open={isAddVisible}
            onOk={addOk}
            onCancel={addCancel}
            okText="Add Record"
            confirmLoading={loadings}
            okButtonProps={{
              disabled:
                Email === null || Email.trim() === "" || Password.trim() === "",
            }}
          >
            <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="Email" className="form-label">
                  Email
                </label>
                <input
                  type="Email"
                  className="form-control"
                  id="Email"
                  required
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
                  required
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
          </Modal>

          <div
            className="container"
            style={{
              overflow: "auto",
            }}
          >
            <div className="row my-3">
              <div className="card">
                <div className="row my-3">
                  <Table
                    title={() => (
                      <Button
                        onClick={showAdd}
                        type="primary"
                        style={{
                          marginBottom: 16,
                        }}
                      >
                        Add Users
                      </Button>
                    )}
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
      ) : (
        <div className="alert alert-danger" role="alert">
          <strong>You have no permission</strong>
        </div>
      )}
    </>
  );
}
