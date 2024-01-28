import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  Input,
  Space,
  Table,
  Button,
  Modal,
  message,
  Popconfirm,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { push, ref, remove, update } from "firebase/database";
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
  const [AddQuantity, setAddQuantity] = useState(0);
  const [SubQuantity, setSubQuantity] = useState(0);
  const [RATE, setRATE] = useState("");
  const [per, setPer] = useState("");
  const [date, setDate] = useState("");

  let dates = new Date();
  const day = String(dates.getDate()).padStart(2, "0");
  const month = String(dates.getMonth() + 1).padStart(2, "0");
  const year = dates.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;

  const [UserEmail, setUserEmail] = useState("");
  const [UserUid, setUserUid] = useState("");

  useEffect(() => {
    // Retrieve data from sessionStorage
    const storedData = JSON.parse(sessionStorage.getItem("user")) || {};

    // Extract values from the stored data
    const { email: storedemail, uid: storeduid } = storedData;

    // Set state variables using the extracted values
    setUserUid(storeduid || "");
    setUserEmail(storedemail || "");
  }, []);

  const showDetails = () => {
    setAddQuantity(0);
    setSubQuantity(0);
    setIsUpdateVisible(true);
  };

  const updateOk = async () => {
    try {
      setLoadings(true);
      let product = {
        DescriptionofServices: DescriptionofServices,
        HSN: HSN,
        Quantity: Number(Quantity) + Number(AddQuantity) - Number(SubQuantity),
        RATE: RATE,
        Per: per,
      };
      let Updateproduct = {
        DescriptionofServices: DescriptionofServices,
        HSN: HSN,
        AddQuantity: Number(AddQuantity),
        SubQuantity: Number(SubQuantity),
        Quantity,
        RATE: RATE,
        Per: per,
        Date: date,
        userUID: UserUid,
        userEmail: UserEmail,
      };

      // Simulating an asynchronous operation (e.g., API call or database update)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await update(ref(db, "Product/" + Id + "/"), product);
      await push(ref(db, "Updates/"), Updateproduct);

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
      let product = {
        DescriptionofServices: DescriptionofServices,
        HSN: HSN,
        Quantity: Quantity,
        RATE: RATE,
        Per: per,
        Date: date,
        userUID: UserUid,
        userEmail: UserEmail,
      };

      setLoadings(true);

      // Simulating an asynchronous operation (e.g., API call or database update)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await push(ref(db, "Product/"), product);
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
      dataIndex: "key",
      width: 150,
      rowScope: "row",
      sorter: (a, b) => a.key - b.key,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("key"),
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
      width: 100,
      sorter: (a, b) => a.HSN.length - b.HSN.length,
      ...getColumnSearchProps("HSN"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      width: 100,
      sorter: (a, b) => a.Quantity - b.Quantity,
      ...getColumnSearchProps("Quantity"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Rate",
      dataIndex: "RATE",
      width: 100,
      sorter: (a, b) => a.RATE - b.RATE,
      ...getColumnSearchProps("RATE"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Per",
      dataIndex: "Per",
      width: 100,
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
        const { id, DescriptionofServices, HSN, Quantity, RATE, Per, Date } =
          record;
        const MenuClick = () => {
          setId(id);
          setDescriptionofServices(DescriptionofServices);
          setHSN(HSN);
          setQuantity(Quantity);
          setRATE(RATE);
          setPer(Per);
          setDate(Date || formattedDate);
          showDetails();
        };
        const confirm = async () => {
          let Updateproduct = {
            DescriptionofServices: `${DescriptionofServices} (removed)`,
            HSN: HSN,
            AddQuantity: 0,
            SubQuantity: 0,
            Quantity: 0,
            RATE: 0,
            Per: per,
            Date: formattedDate,
            userUID: UserUid,
            userEmail: UserEmail,
          };
          await remove(ref(db, "Product/" + id + "/"));
          await push(ref(db, "Updates/"), Updateproduct);
          message.success("Product Delete");
        };
        const cancel = () => {
          message.error("Product Not Delete");
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
            <Popconfirm
              title="Delete the Product"
              description="Are you sure to delete this Product?"
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
            <div className="text-center">{option}</div>
          </>
        );
      },
    },
  ];

  const data = [];
  var count = "0";
  JSON.parse(sessionStorage.getItem("ProductsData")).forEach((element) => {
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
          <div className="col-md-6">
            <label htmlFor="AddQuantity" className="form-label">
              Add Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="AddQuantity"
              min={0}
              value={AddQuantity}
              onChange={(e) => setAddQuantity(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="SubQuantity" className="form-label">
              Sub Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="SubQuantity"
              min={0}
              value={SubQuantity}
              onChange={(e) => setSubQuantity(e.target.value)}
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
            DescriptionofServices.trim() === "" ||
            date === "",
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
