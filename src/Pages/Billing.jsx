import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { faInr } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Checkbox,
  FloatButton,
  Modal,
  Popover,
  Select,
  Watermark,
  Input,
  Space,
  Table,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { PlusCircleOutlined, SaveOutlined } from "@ant-design/icons";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TextArea from "antd/es/input/TextArea";
import { ToWords } from "to-words";
import { onValue, push, ref, update } from "firebase/database";
import { db } from "../Utils/Firebase/Firebase_config";
import { useNavigate } from "react-router-dom";

export default function Billing() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  const navigate = useNavigate();

  const invoice = useRef();

  const [StyleW, setStyleW] = useState("100%");

  const handlePrint = (heading) => {
    setStyleW(1296);
    html2canvas(invoice.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.setFontSize(10);
      pdf.text(heading, 170, 5);
      pdf.addImage(imgData, "PNG", 5, 10, 199, 0);
      const pdfBlob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      window.open(blobUrl);
    }).then(()=>{
      navigate("/billing-manage");
    });
    // html2pdf(invoice.current, {
    //   margin: 10,
    //   filename: 'invoice.pdf',
    //   image: { type: 'png', quality: 1 },
    //   html2canvas: { scale: 1},
    //   jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    // });
  };

  const [Consignee_isModalOpen, setConsignee_isModalOpen] = useState(false);
  const [Consignee_Name, setConsignee_Name] = useState("");
  const [Consignee_Address, setConsignee_Address] = useState("");
  const [Consignee_State, setConsignee_State] = useState("");
  const [Consignee_Code, setConsignee_Code] = useState("");
  const [Consignee_Contact, setConsignee_Contact] = useState("");
  const [Consignee_GSTIN, setConsignee_GSTIN] = useState("");
  const Consignee_showModal = () => {
    setConsignee_isModalOpen(true);
  };
  const Consignee_handleCancel = () => {
    setConsignee_isModalOpen(false);
  };

  const [Buyer_isModalOpen, setBuyer_isModalOpen] = useState(false);
  const [Buyer_Name, setBuyer_Name] = useState("");
  const [Buyer_Address, setBuyer_Address] = useState("");
  const [Buyer_State, setBuyer_State] = useState("");
  const [Buyer_Code, setBuyer_Code] = useState("");
  const [Buyer_Contact, setBuyer_Contact] = useState("");
  const [Buyer_GSTIN, setBuyer_GSTIN] = useState("");
  const Buyer_showModal = () => {
    setBuyer_isModalOpen(true);
  };
  const Buyer_handleCancel = () => {
    setBuyer_isModalOpen(false);
  };
  const BuyerSame = (e) => {
    e.target.checked ? assignConsigneeToBuyer() : NotassignConsigneeToBuyer();
    function assignConsigneeToBuyer() {
      setBuyer_Name(Consignee_Name);
      setBuyer_Address(Consignee_Address);
      setBuyer_State(Consignee_State);
      setBuyer_Code(Consignee_Code);
      setBuyer_Contact(Consignee_Contact);
      setBuyer_GSTIN(Consignee_GSTIN);
    }
    function NotassignConsigneeToBuyer() {
      setBuyer_Name("");
      setBuyer_Address(null);
      setBuyer_State("");
      setBuyer_Code("");
      setBuyer_Contact("");
      setBuyer_GSTIN("");
    }
  };

  const [InvoiceNumber, setInvoiceNumber] = useState("0");
  useEffect(() => {
    onValue(ref(db, "Customer"), (snapshot) => {
      setInvoiceNumber(`JPE/${year}/${snapshot.size + 1}`);
    });
  }, [year]);

  const [Vehicle, setVehicle] = useState("");
  const Vehicleno = (
    <div>
      <input
        type="text"
        className="form-control"
        value={Vehicle}
        onChange={(e) => setVehicle(e.target.value)}
      />
    </div>
  );

  const [Payment, setPayment] = useState("");
  const Mode_of_Payment = (
    <div>
      <Select
        optionFilterProp="children"
        onChange={(e) => setPayment(e)}
        options={[
          {
            value: "offline",
            label: "Offline",
          },
          {
            value: "online",
            label: "Online",
          },
        ]}
        allowClear
        style={{
          width: 200,
        }}
      />
    </div>
  );

  const [Reference_No, setReference_No] = useState("");
  const Reference = (
    <div>
      <input
        type="text"
        className="form-control"
        value={Reference_No}
        onChange={(e) => setReference_No(e.target.value)}
      />
    </div>
  );

  const [Other_References, setOther_References] = useState("");
  const OtherReferences = (
    <div>
      <input
        type="text"
        className="form-control"
        value={Other_References}
        onChange={(e) => setOther_References(e.target.value)}
      />
    </div>
  );

  const [Sale, setSale] = useState("");
  const Sale_Type = (
    <div>
      <Select
        optionFilterProp="children"
        onChange={(e) => setSale(e)}
        options={[
          {
            value: "State Sale",
            label: "State sale",
          },
          {
            value: "Other State Sale",
            label: "Other state sale",
          },
        ]}
        allowClear
        style={{
          width: 200,
        }}
      />
    </div>
  );

  const [EWayBill, setEWayBill] = useState("");
  const E_Way_Bill_No = (
    <div>
      <input
        type="text"
        className="form-control"
        value={EWayBill}
        onChange={(e) => setEWayBill(e.target.value)}
      />
    </div>
  );

  const [Services_isModalOpen, setServices_isModalOpen] = useState(false);
  const Services_showModal = () => {
    setServices_isModalOpen(true);
  };
  const Services_handleCancel = () => {
    setServices_isModalOpen(false);
  };

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
  const [SelectedCheckbox, setSelectedCheckbox] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedCheckbox(selectedRows);
    },
  };
  const columns = [
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
  ];
  const data = [];
  var count = "0";
  JSON.parse(sessionStorage.getItem("ProductsData")).forEach((element) => {
    if (element !== null && element.Quantity > 0) {
      data.push({
        key: count++,
        id: element.id,
        DescriptionofServices: element.DescriptionofServices,
        HSN: element.HSN,
        Quantity: element.Quantity,
        RATE: element.RATE,
        Amount: 0,
        userQyt: 0,
        userRate: 0,
        Per: element.Per || "",
      });
    }
  });
  sessionStorage.setItem("SelectedCheckbox", JSON.stringify(SelectedCheckbox));

  const handleQuantityChange = (e, productId) => {
    let newQuantity = parseFloat(e.target.value) || 0;

    const maxQuantity = Math.max(
      ...SelectedCheckbox.filter((item) => item.id === productId).map(
        (item) => item.Quantity
      )
    );

    if (newQuantity > maxQuantity) {
      // Display an alert if the entered value exceeds maxQuantity
      alert(`Maximum allowed quantity is ${maxQuantity}`);
      e.target.value = maxQuantity;
      newQuantity = maxQuantity;
    }

    // Update the state with the new quantity
    setSelectedCheckbox((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              userQyt: newQuantity,
              Amount: +(product.userRate * newQuantity).toFixed(2),
            }
          : product
      )
    );
  };
  const handleRateChange = (e, productId) => {
    const newRate = parseFloat(e.target.value) || 0;

    const maxRate = Math.max(
      ...SelectedCheckbox.filter((item) => item.id === productId).map(
        (item) => item.RATE
      )
    );

    if (newRate > maxRate) {
      // Display an alert if the entered value exceeds maxRate
      alert(`Maximum Rate is ${maxRate}`);
    }

    // Update the state with the new Rate
    setSelectedCheckbox((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              userRate: newRate,
              Amount: +(newRate * product.userQyt).toFixed(2),
            }
          : product
      )
    );
  };

  const [totalAmount, setTotalAmount] = useState(0);
  const [IGSTAmount, setIGSTAmount] = useState(0);
  const [CGSTAmount, setCGSTAmount] = useState(0);
  const [SGSTAmount, setSGSTAmount] = useState(0);
  // const [totalProductQuantity, setTotalProductQuantity] = useState(0);
  const [NetAmount, setNetAmount] = useState(0);
  const [NetAmountWord, setNetAmountWord] = useState("");
  const [IGSTAmountWord, setIGSTAmountWord] = useState("");
  const [uHSN, setuHSN] = useState("");

  useEffect(() => {
    const uniqueHsns = [
      ...new Set(SelectedCheckbox.map((item) => item.HSN)),
    ].join(", ");
    // Calculate the total amount whenever selectedProducts change
    const toWords = new ToWords();
    const newTotalAmount = SelectedCheckbox.reduce(
      (total, product) => +(total + product.Amount).toFixed(2),
      0
    );
    const newIGSTAmount = Math.round(Number(newTotalAmount) * 18) / 100;
    const newCGSTAmount = Math.round(Number(newTotalAmount) * 9) / 100;
    const newSGSTAmount = Math.round(Number(newTotalAmount) * 9) / 100;
    // const newtotalProductQuantity = SelectedCheckbox.reduce(
    //   (total, product) => +(total + product.userQyt).toFixed(2),
    //   0
    // );
    const newNetAmount = Math.round(
      Number(newTotalAmount) + Number(newIGSTAmount)
    );

    setuHSN(uniqueHsns);
    setTotalAmount(newTotalAmount);
    // setTotalProductQuantity(newtotalProductQuantity);
    setIGSTAmount(newIGSTAmount);
    setCGSTAmount(newCGSTAmount);
    setSGSTAmount(newSGSTAmount);
    setNetAmount(newNetAmount);
    setNetAmountWord(toWords.convert(newNetAmount, { currency: true }));
    setIGSTAmountWord(toWords.convert(newIGSTAmount, { currency: true }));
    newNetAmount !== "" && newNetAmount !== 0
      ? setSavePrintBtn(true)
      : setSavePrintBtn(false);
  }, [SelectedCheckbox]);

  const [SavePrintBtn, setSavePrintBtn] = useState(false);

  const BillSave = async (e) => {
    e.preventDefault();

    try {
      const bill = {
        Product: SelectedCheckbox,
        BillId: InvoiceNumber,
        BillDate: formattedDate,
        BillTime: formattedTime,
        Consignee: [
          {
            Name: Consignee_Name,
            Address: Consignee_Address,
            State: Consignee_State,
            Code: Consignee_Code,
            Contact: Consignee_Contact,
            GSTIN: Consignee_GSTIN,
          },
        ],
        Buyer: [
          {
            Name: Buyer_Name,
            Address: Buyer_Address,
            State: Buyer_State,
            Code: Buyer_Code,
            Contact: Buyer_Contact,
            GSTIN: Buyer_GSTIN,
          },
        ],
        Vehicle,
        Payment,
        Reference_No,
        Other_References,
        Sale,
        EWayBill,
        IGSTAmount,
        CGSTAmount,
        SGSTAmount,
        NetAmount,
        TotalAmount: totalAmount,
      };

      const updatedProducts = SelectedCheckbox.map((item) => ({
        ...item,
        Quantity: +(item.Quantity - item.userQyt).toFixed(2),
      }));

      const updates = {};
      updatedProducts.forEach((item) => {
        const productIndex = item.id - 1;
        updates[`Products/${productIndex}/Quantity`] = item.Quantity;
      });

      message.success("Please don't reload the page");

      handlePrint("Original for Recipient");
      handlePrint("Duplicate for Transporter");
      handlePrint("Triplicate for Supplier");

      await push(ref(db, "Customer/"), bill);
      await update(ref(db), updates);

      message.success("Bill Saved successfully");
    } catch (error) {
      alert("Error saving bill: " + error.message);
    }
  };

  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchAndIFSC, setBranchAndIFSC] = useState("");

  useEffect(() => {
    // Retrieve data from sessionStorage
    const storedData =
      JSON.parse(sessionStorage.getItem("SettingsConfig")) || {};

    // Extract values from the stored data
    const {
      accountHolderName: storedAccountHolderName,
      accountNumber: storedAccountNumber,
      bankName: storedBankName,
      branchAndIFSC: storedBranchAndIFSC,
    } = storedData;

    // Set state variables using the extracted values
    setAccountHolderName(storedAccountHolderName || "");
    setAccountNumber(storedAccountNumber || "");
    setBankName(storedBankName || "");
    setBranchAndIFSC(storedBranchAndIFSC || "");
  }, []);

  return (
    <>
      <div className="container my-2">
        <div className="card">
          <div ref={invoice} style={{ width: StyleW }}>
            <Watermark
              fontSize={16}
              zIndex={11}
              rotate={-26}
              content={"JALANGI POLYMER ENTERPRISE"}
            >
              <div className="card-header text-center fw-bold fs-4">
                Tax Invoice
              </div>
              <div className="card-body">
                <header>
                  <div className="row">
                    <div className="col">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td>
                              <div className="fs-2">
                                JALANGI POLYMER ENTERPRISE
                              </div>
                              <div>
                                <p>
                                  Nimtala Bazar, Near Dhubulia Station,
                                  <br />
                                  Dwipchandrapur, Dhubulia,
                                  <br />
                                  Nadia, 19 - West Bengal,
                                  <br />
                                  741125
                                </p>
                              </div>
                              <div>GSTIN: 19AATFJ769IR1ZV</div>
                              <div>Contact No.: 9002630036 / 9563414242</div>
                              <div>E-Mail : jpedhubulia@gmail.com</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <hr className="border border-dark border-1 opacity-100" />
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td>
                              <div>
                                <Popover
                                  title={false}
                                  arrow={false}
                                  onClick={Consignee_showModal}
                                >
                                  Consignee (Ship to)
                                </Popover>
                              </div>
                              <div className="fs-6 fw-bold">
                                {Consignee_Name}
                              </div>
                              <div>{Consignee_Address}</div>
                              <div>
                                State: {Consignee_State} Code: {Consignee_Code}
                              </div>
                              <div>Contact No.: {Consignee_Contact}</div>
                              <div>GSTIN: {Consignee_GSTIN}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <hr className="border border-dark border-1 opacity-100" />
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td>
                              <div>
                                <Popover
                                  title={false}
                                  arrow={false}
                                  onClick={Buyer_showModal}
                                >
                                  Buyer (Bill to)
                                </Popover>
                              </div>
                              <div className="fs-6 fw-bold">{Buyer_Name}</div>
                              <div>{Buyer_Address}</div>
                              <div>
                                State: {Buyer_State} Code: {Buyer_Code}
                              </div>
                              <div>Contact No.: {Buyer_Contact}</div>
                              <div>GSTIN: {Buyer_GSTIN}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col">
                      <table className="table table-bordered table-responsive">
                        <tbody>
                          <tr>
                            <td>
                              <div>Invoice No.</div>
                              <div>{InvoiceNumber}</div>
                            </td>
                            <td>
                              <div>Dated</div>
                              <div>{formattedDate}</div>
                              <div>{formattedTime}</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div>
                                <Popover
                                  title={false}
                                  content={Vehicleno}
                                  trigger="click"
                                >
                                  Vehicle No.
                                </Popover>
                              </div>
                              <div>{Vehicle}</div>
                            </td>
                            <td>
                              <div>
                                <Popover
                                  title={false}
                                  content={Mode_of_Payment}
                                  trigger="click"
                                >
                                  Mode/Terms of Payment
                                </Popover>
                              </div>
                              <div>{Payment}</div>
                            </td>
                          </tr>
                          {Payment === "online" ? (
                            <tr>
                              <td colSpan={2}>
                                <div>
                                  <Popover
                                    title={false}
                                    content={Reference}
                                    trigger="click"
                                  >
                                    Reference No.
                                  </Popover>
                                </div>
                                <div>{Reference_No}</div>
                              </td>
                            </tr>
                          ) : Payment === "offline" ? (
                            <tr>
                              <td colSpan={2}>
                                <div>
                                  <Popover
                                    title={false}
                                    content={OtherReferences}
                                    trigger="click"
                                  >
                                    Other References:
                                  </Popover>
                                </div>
                                <div>{Other_References}</div>
                              </td>
                            </tr>
                          ) : null}
                          <tr>
                            <td colSpan={2}>
                              <div>
                                <Popover
                                  title={false}
                                  content={Sale_Type}
                                  trigger="click"
                                >
                                  Sale Type:
                                </Popover>{" "}
                                {Sale}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <div>
                                <Popover
                                  title={false}
                                  content={E_Way_Bill_No}
                                  trigger="click"
                                >
                                  E Way Bill No:
                                </Popover>
                              </div>
                              <div>{EWayBill}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </header>
                <main>
                  <div className="col">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className="table-secondary fs-6">
                          <tr>
                            <th className="text-start">Sl No.</th>
                            <th className="text-center">
                              Description of Goods{" "}
                              {Sale !== undefined && Sale !== "" ? (
                                <Button
                                  onClick={Services_showModal}
                                  danger
                                  type="primary"
                                  shape="circle"
                                  icon={<PlusCircleOutlined />}
                                  size="small"
                                />
                              ) : null}
                            </th>
                            <th className="text-center">HSN/SAC</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Rate</th>
                            <th className="text-center">Per</th>
                            <th className="text-end">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="fs-5 table-group-divider">
                          {SelectedCheckbox.map((item, index) => (
                            <tr>
                              <th
                                scope="row"
                                className="text-start"
                                key={index}
                              >
                                {index + 1}
                              </th>
                              <td className="text-center">
                                {item.DescriptionofServices}
                              </td>
                              <td className="text-center">{item.HSN}</td>
                              <td className="text-center">
                                <input
                                  className="form-control"
                                  type={"number"}
                                  min={1}
                                  max={item.Quantity}
                                  defaultValue={0}
                                  onChange={(e) =>
                                    handleQuantityChange(e, item.id)
                                  }
                                />
                              </td>
                              <td className="text-center">
                                <input
                                  className="form-control"
                                  type={"number"}
                                  min={1}
                                  defaultValue={0}
                                  onChange={(e) => handleRateChange(e, item.id)}
                                />
                              </td>
                              <td className="text-center">{item.Per}</td>
                              <td className="text-end">{item.Amount}</td>
                            </tr>
                          ))}
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-end table-group-divider">
                              {totalAmount}
                            </td>
                          </tr>
                          {Sale === "Other State Sale" ? (
                            <tr>
                              <td></td>
                              <td>
                                <div className="text-end">IGST 18%</div>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td className="text-end">{IGSTAmount}</td>
                            </tr>
                          ) : Sale === "State Sale" ? (
                            <>
                              <tr>
                                <td></td>
                                <td>
                                  <div className="text-end">CGST 9%</div>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="text-end">{CGSTAmount}</td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                  <div className="text-end">SGST 9%</div>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="text-end">{SGSTAmount}</td>
                              </tr>
                            </>
                          ) : null}
                        </tbody>
                        <tfoot className="table-bordered">
                          <tr>
                            <td></td>
                            <td>
                              <div className="text-end">Total</div>
                            </td>
                            <td></td>
                            {/* <td>{totalProductQuantity}</td> */}
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-end">
                              <FontAwesomeIcon icon={faInr} /> {NetAmount}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  <div className="row">
                    <div className="d-flex justify-content-between">
                      <span className="text-start">
                        Amount Chargeable (in words)
                      </span>
                      <span className="text-end">E. & O.E</span>
                    </div>
                    <div className="text-start fs-6 fw-bold">
                      {NetAmount > 0 ? <>INR {NetAmountWord}</> : null}
                    </div>
                    {Sale === "Other State Sale" ? (
                      <>
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead className="fs-6 text-center">
                              <tr>
                                <td rowSpan={2}>HSN/SAC</td>
                                <td rowSpan={2}>Taxable Value</td>
                                <td colSpan={2}>Integrated Tax</td>
                                <td rowSpan={2}>Total Tax Amount</td>
                              </tr>
                              <tr>
                                <td>Rate</td>
                                <td>Amount</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-start">{uHSN}</td>
                                <td className="text-center">{totalAmount}</td>
                                <td className="text-center">18%</td>
                                <td className="text-center">{IGSTAmount}</td>
                                <td className="text-center">{NetAmount}</td>
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                <td className="text-end fw-bold">Total</td>
                                <td className="text-center fw-bold">
                                  {totalAmount}
                                </td>
                                <td className="text-center fw-bold"></td>
                                <td className="text-center fw-bold">
                                  {IGSTAmount}
                                </td>
                                <td className="text-center fw-bold">
                                  {IGSTAmount}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </>
                    ) : Sale === "State Sale" ? (
                      <>
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead className="fs-6 text-center">
                              <tr>
                                <td rowSpan={2}>HSN/SAC</td>
                                <td rowSpan={2}>Taxable Value</td>
                                <td colSpan={2}>Central Tax</td>
                                <td colSpan={2}>State Tax</td>
                                <td rowSpan={2}>Total Tax Amount</td>
                              </tr>
                              <tr>
                                <td>Rate</td>
                                <td>Amount</td>
                                <td>Rate</td>
                                <td>Amount</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-start">{uHSN}</td>
                                <td className="text-center">{totalAmount}</td>
                                <td className="text-center">9%</td>
                                <td className="text-center">{CGSTAmount}</td>
                                <td className="text-center">9%</td>
                                <td className="text-center">{SGSTAmount}</td>
                                <td className="text-center">{IGSTAmount}</td>
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                <td className="text-end fw-bold">Total</td>
                                <td className="text-center fw-bold">
                                  {totalAmount}
                                </td>
                                <td className="text-center fw-bold"></td>
                                <td className="text-center fw-bold">
                                  {CGSTAmount}
                                </td>
                                <td className="text-center fw-bold"></td>
                                <td className="text-center fw-bold">
                                  {SGSTAmount}
                                </td>
                                <td className="text-center fw-bold">
                                  {IGSTAmount}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </>
                    ) : null}
                    <div className="text-start">
                      <span>Tax Amount (in words) :</span>&nbsp;&nbsp;&nbsp;
                      <span className="fs-6 fw-bold">
                        {IGSTAmount > 0 ? <>INR {IGSTAmountWord}</> : null}
                      </span>
                    </div>
                    <div className="col">
                      <div className="table-responsive">
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <div>
                                  <span>Company’s PAN:</span>&nbsp;
                                  <span className="fw-bold">AATFJ769IR</span>
                                </div>
                                <div>
                                  <u>Declaration</u>
                                </div>
                                <div className="fw-normal">
                                  1. Goods once sold can't be taken back. <br />
                                  2. Credit option not available.
                                  <br />
                                  3. Subject to Nadia District Judge Court
                                  Jurisdiction.
                                  <br />
                                  4. We declare that this invoice shows the
                                  actual price of the goods desscribed.
                                  <br />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col">
                      <div className="table-responsive">
                        <table className="table table-bordered" border={2}>
                          <tbody>
                            <tr>
                              <td>
                                <div>Company’s Bank Details</div>
                                <div>
                                  <span>A/c Holder’s Name:</span>&nbsp;
                                  <span className="fw-bold">
                                    {accountHolderName}
                                  </span>
                                </div>
                                <div>
                                  <span>Bank Name:</span>&nbsp;
                                  <span className="fw-bold">{bankName}</span>
                                </div>
                                <div>
                                  <span>A/c No.:</span>&nbsp;
                                  <span className="fw-bold">
                                    {accountNumber}
                                  </span>
                                </div>
                                <div>
                                  <span>Branch & IFS Code:</span>&nbsp;
                                  <span className="fw-bold">
                                    {branchAndIFSC}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card">
                        <div className="card-header text-end">
                          for JALANGI POLYMER ENTERPRISE
                        </div>
                        <div
                          className="card-body"
                          style={{ minWidth: 100, minHeight: 100 }}
                        ></div>
                        <div className="card-footer">Authorised Signatory</div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>

              {/* {SavePrintBtn ? (
                <>
                  <footer className="text-end">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm rounded-circle"
                      onClick={BillSave}
                    >
                      <SaveOutlined />
                    </button>
                  </footer>
                </>
              ) : null} */}

              <div className="card-footer text-center fw-bold">
                Thank You For Purchasing. Visit Again.
              </div>
            </Watermark>
          </div>

          {/* Consignee */}
          <Modal
            title="Consignee"
            open={Consignee_isModalOpen}
            onCancel={Consignee_handleCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
          >
            <div className="row g-3">
              <div className="col-md-12">
                <label htmlFor="Consignee_Name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Consignee_Name"
                  value={Consignee_Name}
                  onChange={(e) => setConsignee_Name(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="Consignee_Address" className="form-label">
                  Address
                </label>
                <TextArea
                  className="form-control"
                  value={Consignee_Address}
                  onChange={(e) => setConsignee_Address(e.target.value)}
                  type="text"
                  autoSize
                  id="Consignee_Address"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Consignee_State" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Consignee_State"
                  value={Consignee_State}
                  onChange={(e) => setConsignee_State(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Consignee_Code" className="form-label">
                  Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Consignee_Code"
                  value={Consignee_Code}
                  onChange={(e) => setConsignee_Code(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Consignee_Contact" className="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Consignee_Contact"
                  value={Consignee_Contact}
                  onChange={(e) => setConsignee_Contact(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Consignee_GSTIN" className="form-label">
                  GSTIN
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Consignee_GSTIN"
                  value={Consignee_GSTIN}
                  onChange={(e) => setConsignee_GSTIN(e.target.value)}
                />
              </div>
            </div>
          </Modal>
          {/* Buyer */}
          <Modal
            title={
              <div>
                Buyer / (Same as Consignee){" "}
                <Checkbox onChange={BuyerSame} style={{ marginRight: 8 }} />
              </div>
            }
            open={Buyer_isModalOpen}
            onCancel={Buyer_handleCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
          >
            <div className="row g-3">
              <div className="col-md-12">
                <label htmlFor="Buyer_Name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Buyer_Name"
                  value={Buyer_Name}
                  onChange={(e) => setBuyer_Name(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="Buyer_Address" className="form-label">
                  Address
                </label>
                <TextArea
                  className="form-control"
                  value={Buyer_Address}
                  onChange={(e) => setBuyer_Address(e.target.value)}
                  type="text"
                  autoSize
                  id="Buyer_Address"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Buyer_State" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Buyer_State"
                  value={Buyer_State}
                  onChange={(e) => setBuyer_State(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Buyer_Code" className="form-label">
                  Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Buyer_Code"
                  value={Buyer_Code}
                  onChange={(e) => setBuyer_Code(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Buyer_Contact" className="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Buyer_Contact"
                  value={Buyer_Contact}
                  onChange={(e) => setBuyer_Contact(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Buyer_GSTIN" className="form-label">
                  GSTIN
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Buyer_GSTIN"
                  value={Buyer_GSTIN}
                  onChange={(e) => setBuyer_GSTIN(e.target.value)}
                />
              </div>
            </div>
          </Modal>

          {/*Products*/}
          <Modal
            title="Products"
            open={Services_isModalOpen}
            okButtonProps={{ hidden: true }}
            onCancel={Services_handleCancel}
            width={1000}
          >
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
              scroll={{
                y: 240,
              }}
            />
          </Modal>
        </div>
      </div>

      {SavePrintBtn ? (
        <FloatButton
          onClick={BillSave}
          tooltip={<div>Bill Save</div>}
          icon={<SaveOutlined />}
        />
      ) : null}

      {/* {!SavePrintBtn ? (
        <>
          <FloatButton.Group
            trigger="hover"
            type="primary"
            style={{
              right: 94,
            }}
          >
            <FloatButton
              onClick={() => handlePrint("Original for Recipient")}
              tooltip={<div>Original for Recipient</div>}
              icon={<PrinterOutlined />}
            />
            <FloatButton
              onClick={() => handlePrint("Duplicate for Transporter")}
              tooltip={<div>Duplicate for Transporter</div>}
              icon={<PrinterOutlined />}
            />
            <FloatButton
              onClick={() => handlePrint("Triplicate for Supplier")}
              tooltip={<div>Triplicate for Supplier</div>}
              icon={<PrinterOutlined />}
            />
          </FloatButton.Group>
        </>
      ) : null} */}
    </>
  );
}
