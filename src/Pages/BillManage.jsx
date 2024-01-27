import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Input, Space, Table, Button, message, Popconfirm } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SaveOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { onValue, ref, remove } from "firebase/database";
import { db } from "../Utils/Firebase/Firebase_config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function BillManage() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [Permission, setPermission] = useState(true);

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
      title: "BillDate",
      dataIndex: "BillDate",
      width: 150,
      sorter: (a, b) => a.BillDate - b.BillDate,
      ...getColumnSearchProps("BillDate"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "BillId",
      dataIndex: "BillId",
      width: 150,
      sorter: (a, b) => a.BillId.length - b.BillId.length,
      ...getColumnSearchProps("BillId"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total Amount",
      dataIndex: "TotalAmount",
      width: 150,
      sorter: (a, b) => a.TotalAmount - b.TotalAmount,
      ...getColumnSearchProps("TotalAmount"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "IGSTAmount",
      dataIndex: "IGSTAmount",
      width: 150,
      sorter: (a, b) => a.IGSTAmount.length - b.IGSTAmount.length,
      ...getColumnSearchProps("IGSTAmount"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "CGSTAmount",
      dataIndex: "CGSTAmount",
      width: 150,
      sorter: (a, b) => a.CGSTAmount - b.CGSTAmount,
      ...getColumnSearchProps("CGSTAmount"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "SGSTAmount",
      dataIndex: "SGSTAmount",
      width: 150,
      sorter: (a, b) => a.SGSTAmount - b.SGSTAmount,
      ...getColumnSearchProps("SGSTAmount"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "NetAmount",
      dataIndex: "NetAmount",
      width: 150,
      sorter: (a, b) => a.NetAmount - b.NetAmount,
      ...getColumnSearchProps("NetAmount"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Print",
      dataIndex: "Print",
      width: 100,
      render: (text, record) => {
        const { id } = record;
        return (
          <>
            <div className="text-center">
              <Link to={id}>
                <button
                  type="button"
                  className="btn btn-success btn-sm rounded-circle"
                >
                  <SaveOutlined />
                </button>
              </Link>
            </div>
          </>
        );
      },
    },
    {
      title: "Option",
      dataIndex: "Option",
      width: 100,
      render: (text, record) => {
        const { id } = record;
        const confirm = async () => {
          await remove(ref(db, "Customer/" + id + "/"));
          message.success("Customer Delete");
        };
        const cancel = () => {
          message.error("Customer Not Delete");
        };
        const option = (
          <>
            <Popconfirm
              title="Delete the Agent"
              description="Are you sure to delete this Customer?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  size="xl"
                  style={{ color: "#a30000" }}
                />
              </Button>
            </Popconfirm>
          </>
        );
        return (
          <>
            {!Permission ? (
              <div className="text-center">{option}</div>
            ) : (
              <div className="text-center">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  style={{ color: "#810909" }}
                  size="xl"
                />
              </div>
            )}
          </>
        );
      },
    },
  ];

  const expandedRowRender = (record) => {
    const expandcolumn = [
      {
        title: "Amount",
        dataIndex: "Amount",
        width: 150,
        sorter: (a, b) => a.Amount - b.Amount,
        ...getColumnSearchProps("Amount"),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Description of Services",
        dataIndex: "DescriptionofServices",
        width: 150,
        sorter: (a, b) =>
          a.DescriptionofServices.length - b.DescriptionofServices.length,
        ...getColumnSearchProps("DescriptionofServices"),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "HSN",
        dataIndex: "HSN",
        width: 150,
        sorter: (a, b) => a.HSN.length - b.HSN.length,
        ...getColumnSearchProps("HSN"),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Quantity",
        dataIndex: "userQyt",
        width: 150,
        sorter: (a, b) => a.userQyt - b.userQyt,
        ...getColumnSearchProps("userQyt"),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Rate",
        dataIndex: "userRate",
        width: 150,
        sorter: (a, b) => a.userRate - b.userRate,
        ...getColumnSearchProps("userRate"),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Per",
        dataIndex: "Per",
        width: 150,
        sorter: (a, b) => a.Per.length - b.Per.length,
        ...getColumnSearchProps("Per"),
        sortDirections: ["descend", "ascend"],
      },
    ];

    return (
      <Table
        columns={expandcolumn}
        dataSource={record.Product.map((product, index) => ({
          ...product,
          key: index,
        }))}
        pagination={false}
        size="small"
      />
    );
  };

  const [CustomersData, setCustomersData] = useState([]);
  const Customers = () => {
    let count = 0;

    onValue(ref(db, "Customer"), (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setCustomersData([]);
      } else {
        // Convert the object into an array of customer objects
        const customerArray = Object.keys(data).map((customerId) => ({
          id: customerId,
          key: count++,
          ...data[customerId],
        }));

        // Update the state with the array of customer objects
        setCustomersData(customerArray);
      }
    });
  };

  useEffect(() => {
    Customers();
    const storedData = JSON.parse(sessionStorage.getItem("user")) || {};

    const { email } = storedData;

    const data = JSON.parse(sessionStorage.getItem("UserData"));

    const isUserInData = data.some((item) => item.Email === email);
    setPermission(isUserInData);
  }, []);

  return (
    <>
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
                columns={columns}
                dataSource={CustomersData}
                scroll={{
                  y: 1000,
                }}
                expandable={{
                  expandedRowRender,
                }}
                size="small"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
