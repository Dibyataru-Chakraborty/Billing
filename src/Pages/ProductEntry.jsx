import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Input, Space, Table, Button, Modal, message, Popconfirm } from "antd";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { ref, remove, set, update } from "firebase/database";
import { db } from "../Utils/Firebase/Firebase_config";

export default function ProductEntry() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [details, setdetails] = useState([]);
  const searchInput = useRef(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [UnitName, setUnitName] = useState("");
  const [loadings, setLoadings] = useState(false);

  const showDetails = () => {
    setIsDetailsVisible(true);
  };

  const detailsOk = () => {
    setLoadings(true);
    const id = details.id - 1;
    setTimeout(async () => {
      await update(ref(db, "Private/ManageTestUnits/" + id + "/"), {
        name: details.name,
      });
      setLoadings(false);
      setIsDetailsVisible(false);
    }, 2000);
  };

  const detailsCancel = () => {
    setIsDetailsVisible(false);
  };

  const showAdd = () => {
    setUnitName("");
    setIsAddVisible(true);
  };

  const addOk = () => {
    const count = data.reduce((max, current) => {
      return current.id > max ? current.id : max;
    }, 0);
    const test = {
      id: count + 1,
      name: UnitName,
    };
    setLoadings(true);
    setTimeout(async () => {
      await set(ref(db, "Private/ManageTestUnits/" + count + "/"), test);
      setLoadings(false);
      setIsAddVisible(false);
      setUnitName("");
    }, 2000);
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
      title: "Unit Name",
      dataIndex: "name",
      width: 150,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Options",
      dataIndex: "Options",
      width: 150,
      rowScope: "row",
      render: (text, record) => {
        const MenuClick = (e) => {
          setdetails(record);
          showDetails();
        };
        const confirm = async () => {
          const { id } = record;
          const key = id - 1;
          await remove(ref(db, "Private/ManageTestUnits/" + key + "/"));
          message.success("Unit Delete");
        };
        const cancel = () => {
          message.error("Unit Not Delete");
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
              title="Delete the Unit"
              description="Are you sure to delete this Unit?"
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
//   JSON.parse(localStorage.getItem("ManageTestUnits")).forEach((element) => {
//     if (element !== null) {
//       data.push({
//         key: count++,
//         id: element.id,
//         name: element.name,
//       });
//     }
//   });

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
                    Add Method
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
        title="EDIT TEST UNITS"
        open={isDetailsVisible}
        onOk={detailsOk}
        onCancel={detailsCancel}
        okText="Update"
        confirmLoading={loadings}
      >
        <h4>ID: {details.id}</h4>
        <hr />
        <form className="row g-3">
          <div className="col-md-12">
            <label htmlFor="Name" className="form-label">
              Unit Name
            </label>
            <input
              type="text"
              className="form-control"
              id="Name"
              value={details.name}
              onChange={(e) =>
                setdetails({
                  key: details.key,
                  id: details.id,
                  name: e.target.value,
                })
              }
            />
          </div>
        </form>
      </Modal>

      <Modal
        title="ADD TEST UNITS"
        open={isAddVisible}
        onOk={addOk}
        onCancel={addCancel}
        okText="Add Record"
        confirmLoading={loadings}
        okButtonProps={{
          disabled: UnitName === null || UnitName.trim() === "",
        }}
      >
        <form className="row g-3">
          <div className="col-md-12">
            <label htmlFor="Name" className="form-label">
              Unit Name
            </label>
            <input
              type="text"
              className="form-control"
              id="Name"
              value={UnitName}
              onChange={(e) => setUnitName(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
