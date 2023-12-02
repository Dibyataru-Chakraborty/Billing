import { faInr } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FloatButton, QRCode, Watermark } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Barcode from "react-barcode";
import { useParams } from "react-router-dom";
import { PrinterOutlined } from "@ant-design/icons";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Select from "react-select";

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
                    <div className="col-8">
                      <table>
                        <tbody>
                          <tr>
                            {/* <td>
                              <img
                                src="/Logos/Logo.jpg"
                                alt="KD"
                                style={{ maxWidth: 150, maxHeight: 150 }}
                              />
                            </td> */}
                            <td>
                              <div className="fs-2">MINA CREATION</div>
                              <div>
                                <p>
                                  D-39/12-D,Road No.19,
                                  <br />
                                  Hojiwala Industrial Estate,
                                  <br />
                                  PalsanaRoad,
                                  <br />
                                  Surat
                                </p>
                              </div>
                              <div>GSTIN/UIN: 24AWSPB3606K1ZI</div>
                              <div>State Name : Gujarat, Code : 24</div>
                              <div>E-Mail : minacreation3912@gmail.com</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <hr class="border border-dark border-3 opacity-75" />
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <div>Buyer (Bill to)</div>
                              <div className="fs-2">ARYA TEXTILES</div>
                              <div>
                                <p>
                                  Belpukur , DHUBULIYA, Nadia, <br />
                                  WEST BENGAL
                                </p>
                              </div>
                              <div>GSTIN/UIN : 19BLZPB9514R1ZY</div>
                              <div>State Name : West Bengal, Code : 19</div>
                              <div>E-Mail : minacreation3912@gmail.com</div>
                              {/* {Patientdata.map((item) => (
                                <div className="fw-bold">
                                  Bill #: {item.bill_id} on {item.bill_dt_tm}{" "}
                                  {item.is_revised === "y" ? "(Revised)" : ""}
                                </div>
                              ))} */}
                              <div className="p-2">
                                {/* <Barcode
                                  value={Patientdata.map(
                                    (item) => item.bill_id
                                  )}
                                  displayValue={false}
                                  fontSize={100}
                                  margin={0}
                                  format="CODE128"
                                  width={2}
                                  height={30}
                                /> */}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-4">
                      <table class="table table-bordered">
                        <tbody>
                          <tr>
                            <td>
                              <div>Invoice No.</div>
                              <div>01</div>
                            </td>
                            <td>
                              <div>Dated</div>
                              <div>3-Apr-23</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div>Delivery Note</div>
                              <div></div>
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
                  <table className="table table-borderless table-responsive">
                    <thead className="table-secondary fs-6">
                      <tr>
                        <th className="text-start">Sl No.</th>
                        <th>Description of Services</th>
                        <th>HSN/SAC</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>per</th>
                        <th className="text-end">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="fs-5">
                      {/* Testdata.map((item, index) => ( */}
                      <tr>
                        <th scope="row" className="text-start">
                          {/* {index+1}. */}
                        </th>
                        <td>
                          <Select
                          // options={options}
                          // value={{ value: index, label: item.name }}
                          />
                        </td>
                        <td>{/* {item.timeframe} */}</td>
                        <td className="text-end">{/* {item.price} */}</td>
                      </tr>
                      {/* )) */}
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
                                <span className="fw-bold">SACHIN,SURAT & HDFC0001706</span>
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
