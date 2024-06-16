import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  Input,
  Space,
  Table,
  Button,
  message,
  Popconfirm,
  Modal,
  InputNumber,
  Radio,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { onValue, ref, remove, set } from "firebase/database";
import { db } from "../Utils/Firebase/Firebase_config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function AccountOut() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [Permission, setPermission] = useState(true);

  const [date, setDate] = useState("");

  let dates = new Date();
  const day = String(dates.getDate()).padStart(2, "0");
  const month = String(dates.getMonth() + 1).padStart(2, "0");
  const year = dates.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;

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

  const [PaidDue, setPaidDue] = useState(false);
  const [netAmount, setNetAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [dueAmount, setDueAmount] = useState("");
  const [Pay, setPay] = useState(0);
  const [payAmount, setpayAmount] = useState([]);
  const [Id, setId] = useState(0);

  const showPaidDue = (e) => {
    const { NetAmount, PaidAmount, DueAmount, Payment, id } = e;
    setNetAmount(NetAmount);
    setPaidAmount(PaidAmount);
    setDueAmount(DueAmount);
    setDate(formattedDate);
    setpayAmount(Payment);
    setId(id);
    setPay(0);
    setPaidDue(true);
  };
  const handleOk_PaidDue = async () => {
    setPaidDue(false);
    let length = payAmount.length;
    let due = dueAmount - Pay;
    let paid = paidAmount + Pay;
    let data = { date, PaidAmount: paid, DueAmount: due };
    await set(ref(db, `Customer/${Id}/Payment/${length}`), data);
  };
  const handleCancel_PaidDue = () => {
    setPaidDue(false);
  };

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
    {
      title: "Action",
      dataIndex: "Option",
      width: 100,
      render: (text, record) => {
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a style={{ color: "#1554ad" }} onClick={(e) => showPaidDue(record)}>
            Edit
          </a>
        );
      },
      fixed: "right",
    },
  ];

  const expandedRowRender = (record) => {
    const expandcolumn = [
      {
        title: "Date",
        dataIndex: "date",
        width: 150,
        sorter: (a, b) => a.date.length - b.date.length,
        ...getColumnSearchProps("date"),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Paid",
        dataIndex: "PaidAmount",
        width: 150,
        sorter: (a, b) => a.PaidAmount - b.PaidAmount,
        ...getColumnSearchProps("PaidAmount"),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Due",
        dataIndex: "DueAmount",
        width: 150,
        sorter: (a, b) => a.DueAmount - b.DueAmount,
        ...getColumnSearchProps("DueAmount"),
        sortDirections: ["descend", "ascend"],
      },
    ];

    return (
      <Table
        columns={expandcolumn}
        dataSource={record.Payment.map((payment, index) => ({
          ...payment,
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
        const customerArray = Object.keys(data).map((customerId) => {
          const { NetAmount, Payment } = data[customerId];
          const lastPayment = Payment[Payment.length - 1];
          const DueAmount = NetAmount - lastPayment.PaidAmount;

          // Check if DueAmount is greater than 0
          if (DueAmount > 0) {
            return {
              id: customerId,
              key: count++,
              PaidAmount: lastPayment.PaidAmount,
              DueAmount: lastPayment.DueAmount,
              ...data[customerId],
            };
          } else {
            return null; // Filter out customers with DueAmount <= 0
          }
        });

        // Remove null values from the array
        const filteredCustomerArray = customerArray.filter(
          (customer) => customer !== null
        );

        // Update the state with the filtered array of customer objects
        setCustomersData(filteredCustomerArray);
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

      <Modal
        title="Payment"
        open={PaidDue}
        onOk={handleOk_PaidDue}
        onCancel={handleCancel_PaidDue}
        okButtonProps={{
          disabled: Pay === 0 || Pay === null,
        }}
      >
        <div className="row g-3">
          <div className="col-md-12">
            <label htmlFor="Date" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Net Amount</label>
            <div className="form-control">{netAmount}</div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Last Paid Amount</label>
            <div className="form-control">{paidAmount}</div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Due Amount</label>
            <div className="form-control">{dueAmount}</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="PaidAmount" className="form-label">
              Paid Amount
            </label>
            <InputNumber
              className="form-control form-control-sm"
              size="small"
              value={Pay}
              onChange={(e) => setPay(e)}
              id="PaidAmount"
              max={dueAmount}
              min={1}
            />
          </div>
          {/* <div className="col-md-8">
            <label htmlFor="Payment_Mode" className="form-label">
              Payment Mode
            </label>
            <br />
            <Radio.Group onChange={onChange}defaultValue="offline" buttonStyle="solid">
              <Radio.Button value="offline">offline</Radio.Button>
              <Radio.Button value="online">Online</Radio.Button>
            </Radio.Group>
          </div> */}
        </div>
      </Modal>
    </>
  );
}
