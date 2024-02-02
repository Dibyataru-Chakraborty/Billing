import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Input, Space, Table, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../Utils/Firebase/Firebase_config";

export default function AccountOut() {
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
      title: "BillId",
      dataIndex: "BillId",
      width: 100,
      sorter: (a, b) => a.BillId.length - b.BillId.length,
      ...getColumnSearchProps("BillId"),
      sortDirections: ["descend", "ascend"],
      fixed: "left",
    },
    {
      title: "BillDate",
      dataIndex: "BillDate",
      width: 100,
      ...getColumnSearchProps("BillDate"),
      fixed: "left",
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
      width: 140,
      sorter: (a, b) => a.IGSTAmount - b.IGSTAmount,
      ...getColumnSearchProps("IGSTAmount"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "CGSTAmount",
      dataIndex: "CGSTAmount",
      width: 140,
      sorter: (a, b) => a.CGSTAmount - b.CGSTAmount,
      ...getColumnSearchProps("CGSTAmount"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "SGSTAmount",
      dataIndex: "SGSTAmount",
      width: 140,
      sorter: (a, b) => a.SGSTAmount - b.SGSTAmount,
      ...getColumnSearchProps("SGSTAmount"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Net Amount",
      dataIndex: "NetAmount",
      width: 140,
      sorter: (a, b) => a.NetAmount - b.NetAmount,
      ...getColumnSearchProps("NetAmount"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Paid",
      dataIndex: "PaidAmount",
      width: 100,
      sorter: (a, b) => a.PaidAmount - b.PaidAmount,
      ...getColumnSearchProps("PaidAmount"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Due",
      dataIndex: "DueAmount",
      width: 100,
      sorter: (a, b) => a.DueAmount - b.DueAmount,
      ...getColumnSearchProps("DueAmount"),
      sortDirections: ["descend", "ascend"],
    },
  ];

  const expandedRowRender = (record) => {
    const expandcolumn = [
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
        title: "Amount",
        dataIndex: "Amount",
        width: 150,
        sorter: (a, b) => a.Amount - b.Amount,
        ...getColumnSearchProps("Amount"),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "HSN",
        dataIndex: "HSN",
        width: 150,
        sorter: (a, b) => a.HSN - b.HSN,
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
        const customerArray = Object.keys(data)
          .map((customerId) => {
            const customerData = data[customerId];
            const PaidAmount = customerData.PaidAmount || 0;
            const NetAmount = customerData.NetAmount || 0;
            const DueAmount = customerData.DueAmount || 0;

            // Check the condition and include data in the array
            if (PaidAmount === NetAmount - DueAmount && PaidAmount > 0) {
              return {
                id: customerId,
                key: count++,
                ...customerData,
              };
            } else {
              return null; // Exclude data that doesn't meet the condition
            }
          })
          .filter(Boolean); // Filter out null values

        // Update the state with the array of customer objects
        setCustomersData(customerArray);
      }
    });
  };

  useEffect(() => {
    Customers();
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
