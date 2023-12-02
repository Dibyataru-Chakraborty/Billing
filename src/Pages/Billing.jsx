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
                    <table className="table table-striped table-bordered table-responsive" border={2}>
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
                    </table>
                    <div className="col-5">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <div className="fs-4">Thank You!</div>
                              <div className="fw-normal">
                                Report will be delivered only after full payment
                                is done.
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
                      <table className="table">
                        <tbody>
                          {/* {Patientdata.map((item) => (
                            <>
                              <tr className="fs-6">
                                <th className="text-end" colSpan={4}>
                                  SUBTOTAL
                                </th>
                                <th className="text-end">
                                  <FontAwesomeIcon icon={faInr} />
                                  {item.test_total}
                                </th>
                              </tr>
                              {item.discount_cause_total !== 0 ? (
                                <tr className="fs-6">
                                  <th className="text-end" colSpan={4}>
                                    Discount Cause Total{" "}
                                  </th>
                                  <th className="text-end text-success">
                                    - <FontAwesomeIcon icon={faInr} />
                                    {item.discount_cause_total}
                                  </th>
                                </tr>
                              ) : null}
                              {item.service_charge_total !== 0 ? (
                                <tr className="fs-6">
                                  <th className="text-end" colSpan={4}>
                                    Service Charge Total{" "}
                                  </th>
                                  <th className="text-end">
                                    + <FontAwesomeIcon icon={faInr} />
                                    {item.service_charge_total}
                                  </th>
                                </tr>
                              ) : null}
                              {item.flat_discount !== 0 ? (
                                <tr className="fs-6">
                                  <th className="text-end" colSpan={4}>
                                    Flat Discount{" "}
                                  </th>
                                  <th className="text-end text-success">
                                    - <FontAwesomeIcon icon={faInr} />
                                    {item.flat_discount}
                                  </th>
                                </tr>
                              ) : null}
                              <tr className="table-active fs-6">
                                <th className="text-end" colSpan={4}>
                                  GRAND TOTAL{" "}
                                </th>
                                <th className="text-end">
                                  <FontAwesomeIcon icon={faInr} />
                                  {item.grand_total}
                                </th>
                              </tr>
                              <tr className="fs-6">
                                <th className="fs-6 text-end" colSpan={4}>
                                  Received Amount{" "}
                                </th>
                                {income.length !== 0 ? (
                                  income.map((items) => (
                                    <div
                                      className="fs-6 fw-bold text-end"
                                      key={items.id}
                                    >
                                      - <FontAwesomeIcon icon={faInr} />
                                      {items.amount || 0} ({items.payment_mode}{" "}
                                      on {items.payment_date.split(" ")[0]})
                                    </div>
                                  ))
                                ) : (
                                  <div className="fs-6 fw-bold text-end">
                                    - <FontAwesomeIcon icon={faInr} />0
                                  </div>
                                )}
                              </tr>
                              <tr className="fs-4 table-group-divider table-borderless">
                                <th
                                  className="text-end text-primary"
                                  colSpan={4}
                                >
                                  Due Amount
                                </th>
                                <th className="text-end text-danger">
                                  <FontAwesomeIcon icon={faInr} />
                                  {item.dues}
                                </th>
                              </tr>
                              <tr>
                                <th
                                  className="text-end font-monospace text-body-tertiary"
                                  colSpan={6}
                                >
                                  Software Powered By © Dibyataru Chakraborty
                                </th>
                              </tr>
                            </>
                          ))} */}
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
