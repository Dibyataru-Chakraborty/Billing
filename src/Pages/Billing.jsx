/* eslint-disable react-hooks/exhaustive-deps */
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
  Watermark,
  Input,
  Space,
  Table,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  PlusCircleOutlined,
  SaveOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { ToWords } from "to-words";
import { onValue, push, ref, update } from "firebase/database";
import { db } from "../Utils/Firebase/Firebase_config";
import PDF from "./Pdf/PDF";
import { render } from "react-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

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
        onChange={(e) => setPayment(e.value)}
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
        onChange={(e) => setSale(e.value)}
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

  const Save = async () => {
    const confirmation = window.confirm("Before Save Please Print Your Bill");

    if (confirmation) {
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

        await push(ref(db, "Customer/"), bill);
        await update(ref(db), updates);

        message.success("Bill Saved successfully");
      } catch (error) {
        alert("Error saving bill: " + error.message);
      }
    } else {
      alert("Save operation canceled.");
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

  const BillSave = async (e) => {
    const invoiceData = {
      Consignee_Name,
      Consignee_Address,
      Consignee_State,
      Consignee_Code,
      Consignee_Contact,
      Consignee_GSTIN,
      Buyer_Name,
      Buyer_Address,
      Buyer_State,
      Buyer_Code,
      Buyer_Contact,
      Buyer_GSTIN,
      InvoiceNumber,
      formattedDate,
      formattedTime,
      Vehicle,
      Payment,
      Reference_No,
      Other_References,
      Sale,
      EWayBill,
      SelectedCheckbox,
      totalAmount,
      IGSTAmount,
      CGSTAmount,
      SGSTAmount,
      NetAmount,
      NetAmountWord,
      IGSTAmountWord,
      uHSN,
      accountHolderName,
      bankName,
      accountNumber,
      branchAndIFSC,
      printmode: e,
    };
    const newWindow = window.open("", "_blank", "width=600,height=400");

    newWindow.document.head.innerHTML = `
    <style type="text/css">:root, :host {
      --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
      --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
      --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
      --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
      --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
      --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
      --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
      --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
      --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
      --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
    }
    
    svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
      overflow: visible;
      box-sizing: content-box;
    }
    
    .svg-inline--fa {
      display: var(--fa-display, inline-block);
      height: 1em;
      overflow: visible;
      vertical-align: -0.125em;
    }
    .svg-inline--fa.fa-2xs {
      vertical-align: 0.1em;
    }
    .svg-inline--fa.fa-xs {
      vertical-align: 0em;
    }
    .svg-inline--fa.fa-sm {
      vertical-align: -0.0714285705em;
    }
    .svg-inline--fa.fa-lg {
      vertical-align: -0.2em;
    }
    .svg-inline--fa.fa-xl {
      vertical-align: -0.25em;
    }
    .svg-inline--fa.fa-2xl {
      vertical-align: -0.3125em;
    }
    .svg-inline--fa.fa-pull-left {
      margin-right: var(--fa-pull-margin, 0.3em);
      width: auto;
    }
    .svg-inline--fa.fa-pull-right {
      margin-left: var(--fa-pull-margin, 0.3em);
      width: auto;
    }
    .svg-inline--fa.fa-li {
      width: var(--fa-li-width, 2em);
      top: 0.25em;
    }
    .svg-inline--fa.fa-fw {
      width: var(--fa-fw-width, 1.25em);
    }
    
    .fa-layers svg.svg-inline--fa {
      bottom: 0;
      left: 0;
      margin: auto;
      position: absolute;
      right: 0;
      top: 0;
    }
    
    .fa-layers-counter, .fa-layers-text {
      display: inline-block;
      position: absolute;
      text-align: center;
    }
    
    .fa-layers {
      display: inline-block;
      height: 1em;
      position: relative;
      text-align: center;
      vertical-align: -0.125em;
      width: 1em;
    }
    .fa-layers svg.svg-inline--fa {
      -webkit-transform-origin: center center;
              transform-origin: center center;
    }
    
    .fa-layers-text {
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
      -webkit-transform-origin: center center;
              transform-origin: center center;
    }
    
    .fa-layers-counter {
      background-color: var(--fa-counter-background-color, #ff253a);
      border-radius: var(--fa-counter-border-radius, 1em);
      box-sizing: border-box;
      color: var(--fa-inverse, #fff);
      line-height: var(--fa-counter-line-height, 1);
      max-width: var(--fa-counter-max-width, 5em);
      min-width: var(--fa-counter-min-width, 1.5em);
      overflow: hidden;
      padding: var(--fa-counter-padding, 0.25em 0.5em);
      right: var(--fa-right, 0);
      text-overflow: ellipsis;
      top: var(--fa-top, 0);
      -webkit-transform: scale(var(--fa-counter-scale, 0.25));
              transform: scale(var(--fa-counter-scale, 0.25));
      -webkit-transform-origin: top right;
              transform-origin: top right;
    }
    
    .fa-layers-bottom-right {
      bottom: var(--fa-bottom, 0);
      right: var(--fa-right, 0);
      top: auto;
      -webkit-transform: scale(var(--fa-layers-scale, 0.25));
              transform: scale(var(--fa-layers-scale, 0.25));
      -webkit-transform-origin: bottom right;
              transform-origin: bottom right;
    }
    
    .fa-layers-bottom-left {
      bottom: var(--fa-bottom, 0);
      left: var(--fa-left, 0);
      right: auto;
      top: auto;
      -webkit-transform: scale(var(--fa-layers-scale, 0.25));
              transform: scale(var(--fa-layers-scale, 0.25));
      -webkit-transform-origin: bottom left;
              transform-origin: bottom left;
    }
    
    .fa-layers-top-right {
      top: var(--fa-top, 0);
      right: var(--fa-right, 0);
      -webkit-transform: scale(var(--fa-layers-scale, 0.25));
              transform: scale(var(--fa-layers-scale, 0.25));
      -webkit-transform-origin: top right;
              transform-origin: top right;
    }
    
    .fa-layers-top-left {
      left: var(--fa-left, 0);
      right: auto;
      top: var(--fa-top, 0);
      -webkit-transform: scale(var(--fa-layers-scale, 0.25));
              transform: scale(var(--fa-layers-scale, 0.25));
      -webkit-transform-origin: top left;
              transform-origin: top left;
    }
    
    .fa-1x {
      font-size: 1em;
    }
    
    .fa-2x {
      font-size: 2em;
    }
    
    .fa-3x {
      font-size: 3em;
    }
    
    .fa-4x {
      font-size: 4em;
    }
    
    .fa-5x {
      font-size: 5em;
    }
    
    .fa-6x {
      font-size: 6em;
    }
    
    .fa-7x {
      font-size: 7em;
    }
    
    .fa-8x {
      font-size: 8em;
    }
    
    .fa-9x {
      font-size: 9em;
    }
    
    .fa-10x {
      font-size: 10em;
    }
    
    .fa-2xs {
      font-size: 0.625em;
      line-height: 0.1em;
      vertical-align: 0.225em;
    }
    
    .fa-xs {
      font-size: 0.75em;
      line-height: 0.0833333337em;
      vertical-align: 0.125em;
    }
    
    .fa-sm {
      font-size: 0.875em;
      line-height: 0.0714285718em;
      vertical-align: 0.0535714295em;
    }
    
    .fa-lg {
      font-size: 1.25em;
      line-height: 0.05em;
      vertical-align: -0.075em;
    }
    
    .fa-xl {
      font-size: 1.5em;
      line-height: 0.0416666682em;
      vertical-align: -0.125em;
    }
    
    .fa-2xl {
      font-size: 2em;
      line-height: 0.03125em;
      vertical-align: -0.1875em;
    }
    
    .fa-fw {
      text-align: center;
      width: 1.25em;
    }
    
    .fa-ul {
      list-style-type: none;
      margin-left: var(--fa-li-margin, 2.5em);
      padding-left: 0;
    }
    .fa-ul > li {
      position: relative;
    }
    
    .fa-li {
      left: calc(var(--fa-li-width, 2em) * -1);
      position: absolute;
      text-align: center;
      width: var(--fa-li-width, 2em);
      line-height: inherit;
    }
    
    .fa-border {
      border-color: var(--fa-border-color, #eee);
      border-radius: var(--fa-border-radius, 0.1em);
      border-style: var(--fa-border-style, solid);
      border-width: var(--fa-border-width, 0.08em);
      padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
    }
    
    .fa-pull-left {
      float: left;
      margin-right: var(--fa-pull-margin, 0.3em);
    }
    
    .fa-pull-right {
      float: right;
      margin-left: var(--fa-pull-margin, 0.3em);
    }
    
    .fa-beat {
      -webkit-animation-name: fa-beat;
              animation-name: fa-beat;
      -webkit-animation-delay: var(--fa-animation-delay, 0s);
              animation-delay: var(--fa-animation-delay, 0s);
      -webkit-animation-direction: var(--fa-animation-direction, normal);
              animation-direction: var(--fa-animation-direction, normal);
      -webkit-animation-duration: var(--fa-animation-duration, 1s);
              animation-duration: var(--fa-animation-duration, 1s);
      -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
              animation-iteration-count: var(--fa-animation-iteration-count, infinite);
      -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
              animation-timing-function: var(--fa-animation-timing, ease-in-out);
    }
    
    .fa-bounce {
      -webkit-animation-name: fa-bounce;
              animation-name: fa-bounce;
      -webkit-animation-delay: var(--fa-animation-delay, 0s);
              animation-delay: var(--fa-animation-delay, 0s);
      -webkit-animation-direction: var(--fa-animation-direction, normal);
              animation-direction: var(--fa-animation-direction, normal);
      -webkit-animation-duration: var(--fa-animation-duration, 1s);
              animation-duration: var(--fa-animation-duration, 1s);
      -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
              animation-iteration-count: var(--fa-animation-iteration-count, infinite);
      -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
              animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
    }
    
    .fa-fade {
      -webkit-animation-name: fa-fade;
              animation-name: fa-fade;
      -webkit-animation-delay: var(--fa-animation-delay, 0s);
              animation-delay: var(--fa-animation-delay, 0s);
      -webkit-animation-direction: var(--fa-animation-direction, normal);
              animation-direction: var(--fa-animation-direction, normal);
      -webkit-animation-duration: var(--fa-animation-duration, 1s);
              animation-duration: var(--fa-animation-duration, 1s);
      -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
              animation-iteration-count: var(--fa-animation-iteration-count, infinite);
      -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
              animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
    }
    
    .fa-beat-fade {
      -webkit-animation-name: fa-beat-fade;
              animation-name: fa-beat-fade;
      -webkit-animation-delay: var(--fa-animation-delay, 0s);
              animation-delay: var(--fa-animation-delay, 0s);
      -webkit-animation-direction: var(--fa-animation-direction, normal);
              animation-direction: var(--fa-animation-direction, normal);
      -webkit-animation-duration: var(--fa-animation-duration, 1s);
              animation-duration: var(--fa-animation-duration, 1s);
      -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
              animation-iteration-count: var(--fa-animation-iteration-count, infinite);
      -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
              animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
    }
    
    .fa-flip {
      -webkit-animation-name: fa-flip;
              animation-name: fa-flip;
      -webkit-animation-delay: var(--fa-animation-delay, 0s);
              animation-delay: var(--fa-animation-delay, 0s);
      -webkit-animation-direction: var(--fa-animation-direction, normal);
              animation-direction: var(--fa-animation-direction, normal);
      -webkit-animation-duration: var(--fa-animation-duration, 1s);
              animation-duration: var(--fa-animation-duration, 1s);
      -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
              animation-iteration-count: var(--fa-animation-iteration-count, infinite);
      -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
              animation-timing-function: var(--fa-animation-timing, ease-in-out);
    }
    
    .fa-shake {
      -webkit-animation-name: fa-shake;
              animation-name: fa-shake;
      -webkit-animation-delay: var(--fa-animation-delay, 0s);
              animation-delay: var(--fa-animation-delay, 0s);
      -webkit-animation-direction: var(--fa-animation-direction, normal);
              animation-direction: var(--fa-animation-direction, normal);
      -webkit-animation-duration: var(--fa-animation-duration, 1s);
              animation-duration: var(--fa-animation-duration, 1s);
      -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
              animation-iteration-count: var(--fa-animation-iteration-count, infinite);
      -webkit-animation-timing-function: var(--fa-animation-timing, linear);
              animation-timing-function: var(--fa-animation-timing, linear);
    }
    
    .fa-spin {
      -webkit-animation-name: fa-spin;
              animation-name: fa-spin;
      -webkit-animation-delay: var(--fa-animation-delay, 0s);
              animation-delay: var(--fa-animation-delay, 0s);
      -webkit-animation-direction: var(--fa-animation-direction, normal);
              animation-direction: var(--fa-animation-direction, normal);
      -webkit-animation-duration: var(--fa-animation-duration, 2s);
              animation-duration: var(--fa-animation-duration, 2s);
      -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
              animation-iteration-count: var(--fa-animation-iteration-count, infinite);
      -webkit-animation-timing-function: var(--fa-animation-timing, linear);
              animation-timing-function: var(--fa-animation-timing, linear);
    }
    
    .fa-spin-reverse {
      --fa-animation-direction: reverse;
    }
    
    .fa-pulse,
    .fa-spin-pulse {
      -webkit-animation-name: fa-spin;
              animation-name: fa-spin;
      -webkit-animation-direction: var(--fa-animation-direction, normal);
              animation-direction: var(--fa-animation-direction, normal);
      -webkit-animation-duration: var(--fa-animation-duration, 1s);
              animation-duration: var(--fa-animation-duration, 1s);
      -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
              animation-iteration-count: var(--fa-animation-iteration-count, infinite);
      -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
              animation-timing-function: var(--fa-animation-timing, steps(8));
    }
    
    @media (prefers-reduced-motion: reduce) {
      .fa-beat,
    .fa-bounce,
    .fa-fade,
    .fa-beat-fade,
    .fa-flip,
    .fa-pulse,
    .fa-shake,
    .fa-spin,
    .fa-spin-pulse {
        -webkit-animation-delay: -1ms;
                animation-delay: -1ms;
        -webkit-animation-duration: 1ms;
                animation-duration: 1ms;
        -webkit-animation-iteration-count: 1;
                animation-iteration-count: 1;
        -webkit-transition-delay: 0s;
                transition-delay: 0s;
        -webkit-transition-duration: 0s;
                transition-duration: 0s;
      }
    }
    @-webkit-keyframes fa-beat {
      0%, 90% {
        -webkit-transform: scale(1);
                transform: scale(1);
      }
      45% {
        -webkit-transform: scale(var(--fa-beat-scale, 1.25));
                transform: scale(var(--fa-beat-scale, 1.25));
      }
    }
    @keyframes fa-beat {
      0%, 90% {
        -webkit-transform: scale(1);
                transform: scale(1);
      }
      45% {
        -webkit-transform: scale(var(--fa-beat-scale, 1.25));
                transform: scale(var(--fa-beat-scale, 1.25));
      }
    }
    @-webkit-keyframes fa-bounce {
      0% {
        -webkit-transform: scale(1, 1) translateY(0);
                transform: scale(1, 1) translateY(0);
      }
      10% {
        -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
                transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
      }
      30% {
        -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
                transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
      }
      50% {
        -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
                transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
      }
      57% {
        -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
                transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
      }
      64% {
        -webkit-transform: scale(1, 1) translateY(0);
                transform: scale(1, 1) translateY(0);
      }
      100% {
        -webkit-transform: scale(1, 1) translateY(0);
                transform: scale(1, 1) translateY(0);
      }
    }
    @keyframes fa-bounce {
      0% {
        -webkit-transform: scale(1, 1) translateY(0);
                transform: scale(1, 1) translateY(0);
      }
      10% {
        -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
                transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
      }
      30% {
        -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
                transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
      }
      50% {
        -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
                transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
      }
      57% {
        -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
                transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
      }
      64% {
        -webkit-transform: scale(1, 1) translateY(0);
                transform: scale(1, 1) translateY(0);
      }
      100% {
        -webkit-transform: scale(1, 1) translateY(0);
                transform: scale(1, 1) translateY(0);
      }
    }
    @-webkit-keyframes fa-fade {
      50% {
        opacity: var(--fa-fade-opacity, 0.4);
      }
    }
    @keyframes fa-fade {
      50% {
        opacity: var(--fa-fade-opacity, 0.4);
      }
    }
    @-webkit-keyframes fa-beat-fade {
      0%, 100% {
        opacity: var(--fa-beat-fade-opacity, 0.4);
        -webkit-transform: scale(1);
                transform: scale(1);
      }
      50% {
        opacity: 1;
        -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
                transform: scale(var(--fa-beat-fade-scale, 1.125));
      }
    }
    @keyframes fa-beat-fade {
      0%, 100% {
        opacity: var(--fa-beat-fade-opacity, 0.4);
        -webkit-transform: scale(1);
                transform: scale(1);
      }
      50% {
        opacity: 1;
        -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
                transform: scale(var(--fa-beat-fade-scale, 1.125));
      }
    }
    @-webkit-keyframes fa-flip {
      50% {
        -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
                transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
      }
    }
    @keyframes fa-flip {
      50% {
        -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
                transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
      }
    }
    @-webkit-keyframes fa-shake {
      0% {
        -webkit-transform: rotate(-15deg);
                transform: rotate(-15deg);
      }
      4% {
        -webkit-transform: rotate(15deg);
                transform: rotate(15deg);
      }
      8%, 24% {
        -webkit-transform: rotate(-18deg);
                transform: rotate(-18deg);
      }
      12%, 28% {
        -webkit-transform: rotate(18deg);
                transform: rotate(18deg);
      }
      16% {
        -webkit-transform: rotate(-22deg);
                transform: rotate(-22deg);
      }
      20% {
        -webkit-transform: rotate(22deg);
                transform: rotate(22deg);
      }
      32% {
        -webkit-transform: rotate(-12deg);
                transform: rotate(-12deg);
      }
      36% {
        -webkit-transform: rotate(12deg);
                transform: rotate(12deg);
      }
      40%, 100% {
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
      }
    }
    @keyframes fa-shake {
      0% {
        -webkit-transform: rotate(-15deg);
                transform: rotate(-15deg);
      }
      4% {
        -webkit-transform: rotate(15deg);
                transform: rotate(15deg);
      }
      8%, 24% {
        -webkit-transform: rotate(-18deg);
                transform: rotate(-18deg);
      }
      12%, 28% {
        -webkit-transform: rotate(18deg);
                transform: rotate(18deg);
      }
      16% {
        -webkit-transform: rotate(-22deg);
                transform: rotate(-22deg);
      }
      20% {
        -webkit-transform: rotate(22deg);
                transform: rotate(22deg);
      }
      32% {
        -webkit-transform: rotate(-12deg);
                transform: rotate(-12deg);
      }
      36% {
        -webkit-transform: rotate(12deg);
                transform: rotate(12deg);
      }
      40%, 100% {
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
      }
    }
    @-webkit-keyframes fa-spin {
      0% {
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
      }
    }
    @keyframes fa-spin {
      0% {
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
      }
    }
    .fa-rotate-90 {
      -webkit-transform: rotate(90deg);
              transform: rotate(90deg);
    }
    
    .fa-rotate-180 {
      -webkit-transform: rotate(180deg);
              transform: rotate(180deg);
    }
    
    .fa-rotate-270 {
      -webkit-transform: rotate(270deg);
              transform: rotate(270deg);
    }
    
    .fa-flip-horizontal {
      -webkit-transform: scale(-1, 1);
              transform: scale(-1, 1);
    }
    
    .fa-flip-vertical {
      -webkit-transform: scale(1, -1);
              transform: scale(1, -1);
    }
    
    .fa-flip-both,
    .fa-flip-horizontal.fa-flip-vertical {
      -webkit-transform: scale(-1, -1);
              transform: scale(-1, -1);
    }
    
    .fa-rotate-by {
      -webkit-transform: rotate(var(--fa-rotate-angle, none));
              transform: rotate(var(--fa-rotate-angle, none));
    }
    
    .fa-stack {
      display: inline-block;
      vertical-align: middle;
      height: 2em;
      position: relative;
      width: 2.5em;
    }
    
    .fa-stack-1x,
    .fa-stack-2x {
      bottom: 0;
      left: 0;
      margin: auto;
      position: absolute;
      right: 0;
      top: 0;
      z-index: var(--fa-stack-z-index, auto);
    }
    
    .svg-inline--fa.fa-stack-1x {
      height: 1em;
      width: 1.25em;
    }
    .svg-inline--fa.fa-stack-2x {
      height: 2em;
      width: 2.5em;
    }
    
    .fa-inverse {
      color: var(--fa-inverse, #fff);
    }
    
    .sr-only,
    .fa-sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
    
    .sr-only-focusable:not(:focus),
    .fa-sr-only-focusable:not(:focus) {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
    
    .svg-inline--fa .fa-primary {
      fill: var(--fa-primary-color, currentColor);
      opacity: var(--fa-primary-opacity, 1);
    }
    
    .svg-inline--fa .fa-secondary {
      fill: var(--fa-secondary-color, currentColor);
      opacity: var(--fa-secondary-opacity, 0.4);
    }
    
    .svg-inline--fa.fa-swap-opacity .fa-primary {
      opacity: var(--fa-secondary-opacity, 0.4);
    }
    
    .svg-inline--fa.fa-swap-opacity .fa-secondary {
      opacity: var(--fa-primary-opacity, 1);
    }
    
    .svg-inline--fa mask .fa-primary,
    .svg-inline--fa mask .fa-secondary {
      fill: black;
    }
    
    .fad.fa-inverse,
    .fa-duotone.fa-inverse {
      color: var(--fa-inverse, #fff);
    }</style>
    <style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>
        <meta charset="utf-8">
        <link rel="icon" href="/favicon.ico">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#000000">
        <meta name="description" content="Web site created using create-react-app">
        <link rel="apple-touch-icon" href="/logo192.png">
    
        <link rel="manifest" href="/manifest.json">
    
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    
        <!-- FontAwesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/fontawesome.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
    
        <title>JALANGI POLYMER ENTERPRISE</title>
      <script defer="" src="/static/js/bundle.js"></script><style>body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
    
    /*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9pbmRleC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxTQUFTO0VBQ1Q7O2NBRVk7RUFDWixtQ0FBbUM7RUFDbkMsa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0U7YUFDVztBQUNiIiwic291cmNlc0NvbnRlbnQiOlsiYm9keSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgJ1JvYm90bycsICdPeHlnZW4nLFxuICAgICdVYnVudHUnLCAnQ2FudGFyZWxsJywgJ0ZpcmEgU2FucycsICdEcm9pZCBTYW5zJywgJ0hlbHZldGljYSBOZXVlJyxcbiAgICBzYW5zLXNlcmlmO1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbn1cblxuY29kZSB7XG4gIGZvbnQtZmFtaWx5OiBzb3VyY2UtY29kZS1wcm8sIE1lbmxvLCBNb25hY28sIENvbnNvbGFzLCAnQ291cmllciBOZXcnLFxuICAgIG1vbm9zcGFjZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */</style><script src="https://www.googletagmanager.com/gtag/js?l=dataLayer&amp;id=G-911LZS7WE1" async=""></script><meta http-equiv="origin-trial" content="AymqwRC7u88Y4JPvfIF2F37QKylC04248hLCdJAsh8xgOfe/dVJPV3XS3wLFca1ZMVOtnBfVjaCMTVudWM//5g4AAAB7eyJvcmlnaW4iOiJodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjk1MTY3OTk5LCJpc1RoaXJkUGFydHkiOnRydWV9">
    `;
    const pdfContent = <PDF {...invoiceData} />;
    render(pdfContent, newWindow.document.body);
  };

  const customersData = JSON.parse(sessionStorage.getItem("CustomersData")) || [];
  const consigneeOptions = customersData.map((customer) => {
    const consigneeName = customer.Consignee[0].Name || "";
    return { value: consigneeName, label: consigneeName };
  });

  const [selectedConsignee, setSelectedConsignee] = useState(null);
  const [consignee, setconsignee] = useState("");
  useEffect(() => {
    if (consignee !== "") {
      const foundConsignee = customersData.find(
        (customer) => customer.Consignee[0].Name === consignee
      );
      setSelectedConsignee(foundConsignee || null);
    } else {
      setSelectedConsignee(null);
    }
  }, [consignee, customersData]);

  useEffect(() => {
    if (selectedConsignee) {
      // Use selected consignee details
      setConsignee_Name(selectedConsignee.Consignee[0].Name || "");
      setConsignee_Address(selectedConsignee.Consignee[0].Address || "");
      setConsignee_State(selectedConsignee.Consignee[0].State || "");
      setConsignee_Code(selectedConsignee.Consignee[0].Code || "");
      setConsignee_Contact(selectedConsignee.Consignee[0].Contact || "");
      setConsignee_GSTIN(selectedConsignee.Consignee[0].GSTIN || "");
      setBuyer_Name(selectedConsignee.Buyer[0].Name || "");
      setBuyer_Address(selectedConsignee.Buyer[0].Address || "");
      setBuyer_State(selectedConsignee.Buyer[0].State || "");
      setBuyer_Code(selectedConsignee.Buyer[0].Code || "");
      setBuyer_Contact(selectedConsignee.Buyer[0].Contact || "");
      setBuyer_GSTIN(selectedConsignee.Buyer[0].GSTIN || "");
    } else {
      setConsignee_Name(Consignee_Name);
      setConsignee_Address(Consignee_Address);
      setConsignee_State(Consignee_State);
      setConsignee_Code(Consignee_Code);
      setConsignee_Contact(Consignee_Contact);
      setConsignee_GSTIN(Consignee_GSTIN);
      setBuyer_Name(Buyer_Name);
      setBuyer_Address(Buyer_Address);
      setBuyer_State(Buyer_State);
      setBuyer_Code(Buyer_Code);
      setBuyer_Contact(Buyer_Contact);
      setBuyer_GSTIN(Buyer_GSTIN);
    }
  }, [
    Buyer_Address,
    Buyer_Code,
    Buyer_Contact,
    Buyer_GSTIN,
    Buyer_Name,
    Buyer_State,
    Consignee_Address,
    Consignee_Code,
    Consignee_Contact,
    Consignee_GSTIN,
    Consignee_Name,
    Consignee_State,
    selectedConsignee,
  ]);

  const handleInputChange = (inputValue) => {
    setConsignee_Name(inputValue.value);
    setconsignee(inputValue ? inputValue.value : "");
  };

  return (
    <>
      <div className="container my-2">
        <div className="card">
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
                            <div>GSTIN: 19AATFJ7691R1ZV</div>
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
                                Consignee (Ship to){" "}
                                <span className="text-danger">
                                  *(Click here)
                                </span>
                              </Popover>
                            </div>
                            <div className="fs-6 fw-bold">{Consignee_Name}</div>
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
                                Buyer (Bill to){" "}
                                <span className="text-danger">
                                  *(Click here)
                                </span>
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
                                Vehicle No.{" "}
                                <span className="text-danger">
                                  *(Click here)
                                </span>
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
                                Mode/Terms of Payment{" "}
                                <span className="text-danger">
                                  *(Click here)
                                </span>
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
                                  Reference No.{" "}
                                  <span className="text-danger">
                                    *(Click here)
                                  </span>
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
                                  Other References:{" "}
                                  <span className="text-danger">
                                    *(Click here)
                                  </span>
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
                                Sale Type:{" "}
                                <span className="text-danger">
                                  *(Click here)
                                </span>
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
                                E Way Bill No:{" "}
                                <span className="text-danger">
                                  *(Click here)
                                </span>
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
                            {Sale !== undefined &&
                            Sale !== "" &&
                            Consignee_Name !== "" &&
                            Consignee_Address !== "" &&
                            Consignee_State !== "" &&
                            Consignee_Code !== "" &&
                            Consignee_Contact !== "" &&
                            Consignee_GSTIN !== "" ? (
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
                            <th scope="row" className="text-start" key={index}>
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
                            <div className="text-end fw-bold">Total Amount</div>
                          </td>
                          <td></td>
                          {/* <td>{totalProductQuantity}</td> */}
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="text-end fw-bold">
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
                                <span className="fw-bold">AATFJ7691R</span>
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
                                4. We declare that this invoice shows the actual
                                price of the goods desscribed.
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
                                <span className="fw-bold">{accountNumber}</span>
                              </div>
                              <div>
                                <span>Branch & IFS Code:</span>&nbsp;
                                <span className="fw-bold">{branchAndIFSC}</span>
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

            <div className="card-footer text-center fw-bold">
              Thank You For Purchasing. Visit Again.
            </div>
          </Watermark>

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
                <CreatableSelect
                  className="form-control"
                  optionFilterProp="children"
                  onChange={(inputValue) => handleInputChange(inputValue)}
                  options={consigneeOptions}
                  isSearchable
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
        <>
          <FloatButton.Group
            trigger="hover"
            type="primary"
            style={{
              right: 94,
            }}
          >
            <FloatButton
              onClick={Save}
              tooltip={<div>Save</div>}
              icon={<SaveOutlined />}
            />
            <FloatButton
              icon={<PrinterOutlined />}
              onClick={() => BillSave("Original for Recipient")}
              tooltip={<div>Original for Recipient</div>}
            />
            <FloatButton
              icon={<PrinterOutlined />}
              onClick={() => BillSave("Duplicate for Transporter")}
              tooltip={<div>Duplicate for Transporter</div>}
            />
            <FloatButton
              icon={<PrinterOutlined />}
              onClick={() => BillSave("Triplicate for Supplier")}
              tooltip={<div>Triplicate for Supplier</div>}
            />
          </FloatButton.Group>
        </>
      ) : null}
    </>
  );
}
