import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Input, Space, Table, Button, Modal, message } from "antd";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { push, ref, set, update } from "firebase/database";
import { db } from "../Utils/Firebase/Firebase_config";

export default function ProductEntry() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);

  const [Id, setId] = useState("");
  const [DescriptionofServices, setDescriptionofServices] = useState("");
  const [HSN, setHSN] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [RATE, setRATE] = useState("");
  const [per, setPer] = useState("");
  const [date, setDate] = useState("");

  let dates = new Date();
  const day = String(dates.getDate()).padStart(2, "0");
  const month = String(dates.getMonth() + 1).padStart(2, "0");
  const year = dates.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;

  const showDetails = () => {
    setIsUpdateVisible(true);
  };

  const updateOk = async () => {
    try {
      setLoadings(true);
  
      let id = Id - 1;
      let product = {
        DescriptionofServices: DescriptionofServices,
        HSN: HSN,
        Quantity: Quantity,
        RATE: RATE,
        Per: per,
        Date: date
      };
  
      // Simulating an asynchronous operation (e.g., API call or database update)
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      await update(ref(db, "Products/" + id + "/"), product);
      await push(ref(db, "Updates/"), product);
  
      setLoadings(false);
      setIsUpdateVisible(false);
      message.success("Update Successfully");
    } catch (error) {
      console.error("Error while updating product:", error.message);
      // Handle the error, e.g., show an error message to the user
      message.error("Failed to update product. Please try again.");
      setLoadings(false);
    }
  };
  
  const updateCancel = () => {
    setIsUpdateVisible(false);
  };

  const showAdd = () => {
    setDescriptionofServices("");
    setHSN("");
    setQuantity("");
    setRATE("");
    setPer("");
    setIsAddVisible(true);
  };

  const addOk = async () => {
    try {
      const count = data.reduce((max, current) => {
        return current.id > max ? current.id : max;
      }, 0);
  
      let product = {
        DescriptionofServices: DescriptionofServices,
        HSN: HSN,
        Quantity: Quantity,
        RATE: RATE,
        Per: per,
        Date: date,
        id: count+1
      };
  
      setLoadings(true);
  
      // Simulating an asynchronous operation (e.g., API call or database update)
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      await set(ref(db, "Products/" + count + "/"), product);
      await push(ref(db, "Updates/"), product);
  
      setLoadings(false);
      setIsAddVisible(false);
      setDescriptionofServices("");
      setHSN("");
      setQuantity("");
      setRATE();
      message.info("Product Added Successfully");
    } catch (error) {
      // Handle the error, e.g., show an error message to the user
      message.error("Failed to add product. Please try again.");
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
      dataIndex: "id",
      width: 150,
      rowScope: "row",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("id"),
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
      dataIndex: "Quantity",
      width: 150,
      sorter: (a, b) => a.Quantity - b.Quantity,
      ...getColumnSearchProps("Quantity"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Rate",
      dataIndex: "RATE",
      width: 150,
      sorter: (a, b) => a.RATE - b.RATE,
      ...getColumnSearchProps("RATE"),
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
    {
      title: "Date",
      dataIndex: "Date",
      width: 150,
      sorter: (a, b) => a.Date - b.Date,
      ...getColumnSearchProps("Date"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Options",
      dataIndex: "Options",
      width: 150,
      rowScope: "row",
      render: (text, record) => {
        const MenuClick = (e) => {
          const { id, DescriptionofServices, HSN, Quantity, RATE, Per, Date } = record;
          setId(id);
          setDescriptionofServices(DescriptionofServices);
          setHSN(HSN);
          setQuantity(Quantity);
          setRATE(RATE);
          setPer(Per);
          setDate(Date || formattedDate);
          showDetails();
        };
        const option = (
          <>
            <Button onClick={MenuClick}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="xl"
                style={{ color: "#9d670c" }}
              />
            </Button>
          </>
        );
        return (
          <>
            <div className="text-center">{option}</div>
          </>
        );
      },
    },
  ];

  const data = [];
  var count = "0";
  JSON.parse(localStorage.getItem("ProductsData")).forEach((element) => {
    if (element !== null) {
      data.push({
        key: count++,
        id: element.id,
        DescriptionofServices: element.DescriptionofServices,
        HSN: element.HSN,
        Quantity: element.Quantity,
        RATE: element.RATE,
        Per: element.Per,
        Date: element.Date,
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
                title={() => (
                  <Button
                    onClick={showAdd}
                    type="primary"
                    style={{
                      marginBottom: 16,
                    }}
                  >
                    Add Product
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

      <Modal
        title="EDIT Product Details"
        open={isUpdateVisible}
        onOk={updateOk}
        onCancel={updateCancel}
        okText="Update"
        confirmLoading={loadings}
      >
        <form className="row g-3">
          <div className="col-md-6">
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
          <div className="col-md-6">
            <label htmlFor="Per" className="form-label">
              Per
            </label>
            <input
              type="text"
              className="form-control"
              id="Per"
              value={per}
              onChange={(e) => setPer(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Description_of_Services" className="form-label">
              Description of Services
            </label>
            <input
              type="text"
              className="form-control"
              id="Description_of_Services"
              value={DescriptionofServices}
              onChange={(e) => setDescriptionofServices(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="HSN" className="form-label">
              HSN/SAC
            </label>
            <input
              type="text"
              className="form-control"
              id="HSN"
              value={HSN}
              onChange={(e) => setHSN(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="Quantity"
              min={0}
              value={Quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="RATE" className="form-label">
              Rate
            </label>
            <input
              type="text"
              className="form-control"
              id="RATE"
              value={RATE}
              onChange={(e) => setRATE(e.target.value)}
            />
          </div>
        </form>
      </Modal>

      <Modal
        title="ADD PRODUCTS"
        open={isAddVisible}
        onOk={addOk}
        onCancel={addCancel}
        okText="Add Record"
        confirmLoading={loadings}
        okButtonProps={{
          disabled:
            DescriptionofServices === null ||
            DescriptionofServices.trim() === "" || date === ""
        }}
      >
        <form className="row g-3">
          <div className="col-md-6">
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
          <div className="col-md-6">
            <label htmlFor="Per" className="form-label">
              Per
            </label>
            <input
              type="text"
              className="form-control"
              id="Per"
              value={per}
              onChange={(e) => setPer(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Description_of_Services" className="form-label">
              Description of Services
            </label>
            <input
              type="text"
              className="form-control"
              id="Description_of_Services"
              value={DescriptionofServices}
              onChange={(e) => setDescriptionofServices(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="HSN" className="form-label">
              HSN/SAC
            </label>
            <input
              type="text"
              className="form-control"
              id="HSN"
              value={HSN}
              onChange={(e) => setHSN(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="Quantity"
              min={0}
              value={Quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="RATE" className="form-label">
              Rate
            </label>
            <input
              type="text"
              className="form-control"
              id="RATE"
              value={RATE}
              onChange={(e) => setRATE(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
