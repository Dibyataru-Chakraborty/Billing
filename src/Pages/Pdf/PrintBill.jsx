import { faInr } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FloatButton, Spin, Watermark } from "antd";
import React, { useEffect, useState } from "react";
import { SaveOutlined, PrinterOutlined } from "@ant-design/icons";

import { ToWords } from "to-words";
import { useParams } from "react-router-dom";
import { render } from "react-dom";
import PDF from "./PDF";

export default function PrintBill() {
  const BillId = useParams();

  const [Consignee_Name, setConsignee_Name] = useState("");
  const [Consignee_Address, setConsignee_Address] = useState("");
  const [Consignee_State, setConsignee_State] = useState("");
  const [Consignee_Code, setConsignee_Code] = useState("");
  const [Consignee_Contact, setConsignee_Contact] = useState("");
  const [Consignee_GSTIN, setConsignee_GSTIN] = useState("");

  const [Buyer_Name, setBuyer_Name] = useState("");
  const [Buyer_Address, setBuyer_Address] = useState("");
  const [Buyer_State, setBuyer_State] = useState("");
  const [Buyer_Code, setBuyer_Code] = useState("");
  const [Buyer_Contact, setBuyer_Contact] = useState("");
  const [Buyer_GSTIN, setBuyer_GSTIN] = useState("");

  const [InvoiceNumber, setInvoiceNumber] = useState("0");
  const [formattedDate, setformattedDate] = useState("0");
  const [formattedTime, setformattedTime] = useState("0");
  const [Vehicle, setVehicle] = useState("");
  const [Payment, setPayment] = useState("");
  const [Reference_No, setReference_No] = useState("");
  const [Other_References, setOther_References] = useState("");
  const [Sale, setSale] = useState("");
  const [EWayBill, setEWayBill] = useState("");

  const [SelectedCheckbox, setSelectedCheckbox] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [IGSTAmount, setIGSTAmount] = useState(0);
  const [CGSTAmount, setCGSTAmount] = useState(0);
  const [SGSTAmount, setSGSTAmount] = useState(0);
  const [NetAmount, setNetAmount] = useState(0);
  const [NetAmountWord, setNetAmountWord] = useState("");
  const [IGSTAmountWord, setIGSTAmountWord] = useState("");
  const [uHSN, setuHSN] = useState("");

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

  const [load, setload] = useState(true);

  useEffect(() => {
    const CustomersData = JSON.parse(sessionStorage.getItem("CustomersData"));
    const filteredData = CustomersData.filter(
      (item) => item.id === BillId.billid
    )[0];
    const toWords = new ToWords();

    if (BillId) {
      if (CustomersData.length !== 0) {
        setload(false);
        setInvoiceNumber(filteredData.BillId);
        setformattedDate(filteredData.BillDate);
        setformattedTime(filteredData.BillTime);
        setVehicle(filteredData.Vehicle);
        setPayment(filteredData.Payment);
        setReference_No(filteredData.Reference_No);
        setOther_References(filteredData.Other_References);
        setSale(filteredData.Sale);
        setEWayBill(filteredData.EWayBill);
        setBuyer_Name(filteredData.Buyer[0].Name);
        setBuyer_Address(filteredData.Buyer[0].Address);
        setBuyer_State(filteredData.Buyer[0].State);
        setBuyer_Code(filteredData.Buyer[0].Code);
        setBuyer_Contact(filteredData.Buyer[0].Contact);
        setBuyer_GSTIN(filteredData.Buyer[0].GSTIN);
        setConsignee_Name(filteredData.Consignee[0].Name);
        setConsignee_Address(filteredData.Consignee[0].Address);
        setConsignee_State(filteredData.Consignee[0].State);
        setConsignee_Code(filteredData.Consignee[0].Code);
        setConsignee_Contact(filteredData.Consignee[0].Contact);
        setConsignee_GSTIN(filteredData.Consignee[0].GSTIN);
        setSelectedCheckbox(filteredData.Product || []);
        setTotalAmount(filteredData.TotalAmount);
        setIGSTAmount(filteredData.IGSTAmount);
        setCGSTAmount(filteredData.CGSTAmount);
        setSGSTAmount(filteredData.SGSTAmount);
        setNetAmount(filteredData.NetAmount);
        setNetAmountWord(
          toWords.convert(filteredData.NetAmount, { currency: true })
        );
        setIGSTAmountWord(
          toWords.convert(filteredData.IGSTAmount, { currency: true })
        );
        const uniqueHsns = [
          ...new Set(filteredData.Product.map((item) => item.HSN)),
        ].join(", ");
        setuHSN(uniqueHsns);
      } else {
        setload(true);
      }
    }
  }, [BillId]);

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
      printmode:e
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

  return (
    <>
      <div className="container my-2">
        <div className="card">
          {load ? (
            <>
              <div className="container py-5 h-100">
                <Spin tip="Loading" size="large">
                  <div className="content" />
                </Spin>
              </div>
            </>
          ) : (
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
                              <div>Consignee (Ship to)</div>
                              <div className="fs-6 fw-bold">
                                {Consignee_Name}
                              </div>
                              <div>{Consignee_Address}</div>
                              <div>
                                State: {Consignee_State} Code:{" "}
                                {Consignee_Code}
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
                              <div>Buyer (Bill to)</div>
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
                              <div>Vehicle No.</div>
                              <div>{Vehicle}</div>
                            </td>
                            <td>
                              <div>Mode/Terms of Payment</div>
                              <div>{Payment}</div>
                            </td>
                          </tr>
                          {Payment === "online" ? (
                            <tr>
                              <td colSpan={2}>
                                <div>Reference No.</div>
                                <div>{Reference_No}</div>
                              </td>
                            </tr>
                          ) : Payment === "offline" ? (
                            <tr>
                              <td colSpan={2}>
                                <div>Other References:</div>
                                <div>{Other_References}</div>
                              </td>
                            </tr>
                          ) : null}
                          <tr>
                            <td colSpan={2}>
                              <div>Sale Type: {Sale}</div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <div>E Way Bill No:</div>
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
                              Description of Goods
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
                                  value={item.userQyt}
                                  readOnly
                                />
                              </td>
                              <td className="text-center">
                                <input
                                  className="form-control"
                                  type={"number"}
                                  value={item.userRate}
                                  readOnly
                                />
                              </td>
                              <td className="text-center">{item.Per}</td>
                              <td className="text-end">{item.Amount}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={6}></td>
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
                              <td colSpan={4}></td>
                              <td className="text-end">{IGSTAmount}</td>
                            </tr>
                          ) : Sale === "State Sale" ? (
                            <>
                              <tr>
                                <td></td>
                                <td>
                                  <div className="text-end">CGST 9%</div>
                                </td>
                                <td colSpan={4}></td>
                                <td className="text-end">{CGSTAmount}</td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                  <div className="text-end">SGST 9%</div>
                                </td>
                                <td colSpan={4}></td>
                                <td className="text-end">{SGSTAmount}</td>
                              </tr>
                            </>
                          ) : null}
                        </tbody>
                        <tfoot className="table-bordered">
                          <tr>
                            <td></td>
                            <td>
                              <div className="text-end fw-bold">Total</div>
                            </td>
                            <td colSpan={4}></td>
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
                                  1. Goods once sold can't be taken back.{" "}
                                  <br />
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
                        <div className="card-footer">
                          Authorised Signatory
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>

              <div className="card-footer text-center fw-bold">
                Thank You For Purchasing. Visit Again.
              </div>
            </Watermark>
            )}
        </div>
      </div>

      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{
          right: 24,
        }}
        icon={<SaveOutlined />}
      >
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
  );
}
