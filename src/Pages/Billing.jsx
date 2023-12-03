import { faInr } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Cascader,
  Checkbox,
  FloatButton,
  Modal,
  Popover,
  QRCode,
  Select,
  Tooltip,
  Watermark,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import Barcode from "react-barcode";
import { useParams } from "react-router-dom";
import { PrinterOutlined } from "@ant-design/icons";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TextArea from "antd/es/input/TextArea";

export default function Billing() {
  const invoice = useRef();

  const handlePrint = () => {
    html2canvas(invoice.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      const pdfBlob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      window.open(blobUrl);
    });
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
    console.log(e.target.checked);
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

  const InvoiceNumber = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

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

  const List = [
    {
      value: "zhejiang",
      label: "Zhejiang",
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
    },
  ];
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const [Products, setProducts] = useState([
    {
      services: "",
      hsn: "",
      quantity: "",
      rate: "",
      per: "PCS",
      amount: "",
    },
  ]);

  return (
    <>
      <div className="container my-2">
        <div className="card">
          <div className="card-body">
            <div ref={invoice}>
              <Watermark
                height={30}
                width={130}
                zIndex={11}
                rotate={-26}
                content={"store name"}
              >
                <header>
                  <div className="row">
                    <div className="col">
                      <table className="table table-borderless table-responsive">
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
                                  Nadia, West Bengal,
                                  <br />
                                  741125
                                </p>
                              </div>
                              <div>GSTIN: I9AATFJ769IR1ZV</div>
                              <div>Contact No.: 9002630036 / 9563414242</div>
                              <div>E-Mail : jpedhubulia@gmail.com</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <hr className="border border-dark border-1 opacity-100" />
                      <table className="table table-borderless table-responsive">
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
                              <div className="fs-2">{Consignee_Name}</div>
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
                      <table className="table table-borderless table-responsive">
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
                              <div className="fs-2">{Buyer_Name}</div>
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
                      <table class="table table-bordered table-responsive">
                        <tbody>
                          <tr>
                            <td>
                              <div>Invoice No.</div>
                              <div>
                                {InvoiceNumber()}/{year}
                              </div>
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
                                <Popover title={false} content={Vehicleno} trigger="click" >
                                  Vehicle No.
                                </Popover>
                              </div>
                              <div>{Vehicle}</div>
                            </td>
                            <td>
                              <div>Mode/Terms of Payment</div>
                              <div></div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div>Reference No. & Date.</div>
                              <div></div>
                            </td>
                            <td>
                              <div>Other References</div>
                              <div></div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div>Buyer’s Order No.</div>
                              <div></div>
                            </td>
                            <td>
                              <div>Dated</div>
                              <div></div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div>Dispatch Doc No.</div>
                              <div>01</div>
                            </td>
                            <td>
                              <div>Delivery Note Date</div>
                              <div></div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div>Dispatched through</div>
                              <div></div>
                            </td>
                            <td>
                              <div>Destination</div>
                              <div></div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <div>Terms of Delivery</div>
                              <div></div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </header>
                <main>
                  <div className="col">
                    <table className="table table-striped table-responsive">
                      <thead className="table-secondary fs-6">
                        <tr>
                          <th className="text-start">Sl No.</th>
                          <th className="text-center">
                            Description of Services
                          </th>
                          <th className="text-center">HSN/SAC</th>
                          <th className="text-center">Quantity</th>
                          <th className="text-center">Rate</th>
                          <th className="text-center">per</th>
                          <th className="text-end">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="fs-5">
                        {Products.map((item, index) => (
                          <tr>
                            <th scope="row" className="text-start" key={index}>
                              {index + 1}.
                            </th>
                            <td className="text-center">
                              <Tooltip>
                                <Select
                                  showSearch
                                  placeholder="Search to Select"
                                  optionFilterProp="children"
                                  onChange={onChange}
                                  onSearch={onSearch}
                                  filterOption={(input, option) =>
                                    (option?.label ?? "")
                                      .toLowerCase()
                                      .includes(input.toLowerCase())
                                  }
                                  options={List}
                                  value={List.find(
                                    (unit) => unit.value === item.services || ""
                                  )}
                                  allowClear
                                  style={{
                                    width: 200,
                                  }}
                                  filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? "")
                                      .toLowerCase()
                                      .localeCompare(
                                        (optionB?.label ?? "").toLowerCase()
                                      )
                                  }
                                />
                              </Tooltip>
                            </td>
                            <td className="text-center">{item.hsn}</td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-center">{item.rate}</td>
                            <td className="text-center">{item.per}</td>
                            <td className="text-end">{item.amount}</td>
                          </tr>
                        ))}
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>TOTAL</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <div className="text-end">IGST</div>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>TOTAL</td>
                        </tr>
                      </tbody>
                      <tfoot className="table-bordered">
                        <tr>
                          <td></td>
                          <td>
                            <div className="text-end">Total</div>
                          </td>
                          <td></td>
                          <td>numberofpcs</td>
                          <td></td>
                          <td></td>
                          <td>
                            <FontAwesomeIcon icon={faInr} /> TOTAL
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="row">
                    <div className="text-start">
                      Amount Chargeable (in words)
                    </div>
                    <div className="text-end">E. & O.E</div>
                    <div className="text-start fs-5 fw-bold">
                      {/* INR Two Lakh Sixty Eight Thousand Five Hundred Sixty Nine Only */}
                    </div>
                    <table className="table table-striped table-bordered table-responsive">
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
                        <tr></tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className="text-end">Total</td>
                          <td className="text-center">a</td>
                          <td className="text-center">b</td>
                          <td className="text-center">b</td>
                          <td className="text-center">b</td>
                        </tr>
                      </tfoot>
                    </table>
                    <div className="text-start">
                      <span>Tax Amount (in words) :</span>&nbsp;&nbsp;&nbsp;
                      <span className="fw-bold">
                        INR Two Lakh Sixty Eight Thousand Five Hundred Sixty
                        Nine Only
                      </span>
                    </div>
                    <div className="col-5">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <div>
                                <span>Company’s PAN:</span>&nbsp;
                                <span className="fw-bold">AWSPB3606K</span>
                              </div>
                              <div>
                                <u>Declaration</u>
                              </div>
                              <div className="fw-normal">
                                1.We declare that this invoice shows the actual
                                price of the goods described and that all
                                particulars are true and correct.2.On Overdue
                                Payment Compensation @ 1.50 Percent Per Month
                                Will Be Charged.
                              </div>
                              <div className="fw-normal">
                                Sample collection:{" "}
                                {/* {Patientdata.map((item) =>
                                  item.sample_collected_from === "in"
                                    ? "Inside"
                                    : "Outside"
                                )}
                              </div>
                              <div className="fw-normal">
                                Billed By:{" "}
                                {Patientdata.map((item) => item.billed_by)}
                              </div>
                              <div className="fw-light">
                                Notes: {clinic_Billing} */}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-2">
                      {/* <QRCode
                        value={`/print-report/${PatientKey.patientId}`}
                        size={150}
                        type="svg"
                      /> */}
                    </div>
                    <div className="col-5">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <div>Company’s Bank Details</div>
                              <div>
                                <span>A/c Holder’s Name:</span>&nbsp;
                                <span className="fw-bold">MINA CREATION</span>
                              </div>
                              <div>
                                <span>Bank Name:</span>&nbsp;
                                <span className="fw-bold">HDFC BANK LTD</span>
                              </div>
                              <div>
                                <span>A/c No.:</span>&nbsp;
                                <span className="fw-bold">50200068169809</span>
                              </div>
                              <div>
                                <span>Branch & IFS Code:</span>&nbsp;
                                <span className="fw-bold">
                                  SACHIN,SURAT & HDFC0001706
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </main>
              </Watermark>
            </div>
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
        </div>
      </div>
      <FloatButton
        onClick={handlePrint}
        tooltip={<div>Print</div>}
        icon={<PrinterOutlined />}
      />
    </>
  );
}
