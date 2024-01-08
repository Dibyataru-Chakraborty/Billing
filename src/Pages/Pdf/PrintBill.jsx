import { faInr } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FloatButton, Spin, Watermark } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SaveOutlined } from "@ant-design/icons";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ToWords } from "to-words";
import { useParams } from "react-router-dom";

export default function PrintBill() {
  const BillId = useParams();

  const invoice = useRef();

  const handlePrint = (heading) => {
    html2canvas(invoice.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.setFontSize(8);
      pdf.text(heading, 170, 5);
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      const pdfBlob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      window.open(blobUrl);
    });
  };

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

  const BillSave = async (e) => {
    e.preventDefault();
    handlePrint("Original for Recipient");
    handlePrint("Duplicate for Transporter");
    handlePrint("Triplicate for Supplier");
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

  return (
    <>
      <div className="container my-2">
        <div className="card">
          <div ref={invoice}>
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
                                <div className="text-end">Total</div>
                              </td>
                              <td colSpan={4}></td>
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
      </div>

      <FloatButton
        onClick={BillSave}
        tooltip={<div>Bill Save</div>}
        icon={<SaveOutlined />}
      />
    </>
  );
}
