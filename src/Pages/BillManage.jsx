import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Input, Space, Table, Button } from "antd";
import React, { useRef, useState } from "react";

export default function BillManage() {
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

  const data = [];
  let count = 0;
  JSON.parse(localStorage.getItem("CustomersData")).forEach((element) => {
    if (element !== null) {
      data.push({
        key: count++,
        BillDate: element.BillDate,
        BillId: element.BillId,
        Buyer: element.Buyer,
        CGSTAmount: element.CGSTAmount,
        Consignee: element.Consignee,
        EWayBill: element.EWayBill,
        IGSTAmount: element.IGSTAmount,
        NetAmount: element.NetAmount,
        OtherReferences: element.Other_References,
        Payment: element.Payment,
        Product: element.Product,
        ReferenceNo: element.Reference_No,
        SGSTAmount: element.SGSTAmount,
        Sale: element.Sale,
        Vehicle: element.Vehicle,
      });
    }
  });
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
                dataSource={data}
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
