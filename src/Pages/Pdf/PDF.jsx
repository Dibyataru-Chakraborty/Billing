import React from "react";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PDF extends React.Component {
  render() {
    const {
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
      printmode,
      ShopName,
      ShopAddress,
      GSTINNumber,
      ContactNo,
      Pan,
      Email,
    } = this.props;
    return (
      <>
        <section>
          <header>
            <div className="text-center">
              <div className="row justify-content-end">
                <div className="text-center fw-bold fs-4 text-decoration-underline col">
                  TAX INVOICE
                </div>
              </div>
              <div className="row">
                <div className="text-end fw-bold fs-6 col">{printmode}</div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <div className="fs-2">{ShopName}</div>
                        <div>
                          <pre>{ShopAddress}</pre>
                        </div>
                        <div className="fw-bold">GSTIN: {GSTINNumber}</div>
                        <div>Contact No.: {ContactNo}</div>
                        <div>E-Mail : {Email}</div>
                      </td>
                    </tr>
                    <tr className="table-group-divider">
                      <td>
                        <div>Consignee (Ship to)</div>
                        <div className="fs-6 fw-bold">{Consignee_Name}</div>
                        <div>{Consignee_Address}</div>
                        <div>
                          State: {Consignee_State} Code: {Consignee_Code}
                        </div>
                        <div>Contact No.: {Consignee_Contact}</div>
                        <div className="fw-bold">GSTIN: {Consignee_GSTIN}</div>
                      </td>
                    </tr>
                    <tr className="table-group-divider">
                      <td>
                        <div>Buyer (Bill to)</div>
                        <div className="fs-6 fw-bold">{Buyer_Name}</div>
                        <div>{Buyer_Address}</div>
                        <div>
                          State: {Buyer_State} Code: {Buyer_Code}
                        </div>
                        <div>Contact No.: {Buyer_Contact}</div>
                        <div className="fw-bold">GSTIN: {Buyer_GSTIN}</div>
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
                  <thead className="fs-6 table-group-divider">
                    <tr>
                      <th className="text-start">Sl No.</th>
                      <th className="text-center">Description of Goods</th>
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
                        <td className="text-center">{item.userQyt}</td>
                        <td className="text-center">{item.userRate}</td>
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
                        <div className="text-end fw-bold">Total Amount</div>
                      </td>
                      <td colSpan={4}></td>
                      <td className="text-end fw-bold">
                        <FontAwesomeIcon icon={faIndianRupeeSign} /> {NetAmount}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="d-flex justify-content-between">
                <span className="text-start">Amount Chargeable (in words)</span>
                <span className="text-end">E. & O.E</span>
              </div>
              <div className="text-start fs-6 fw-bold">
                {NetAmount > 0 ? <>INR {NetAmountWord}</> : null}
              </div>
              {Sale === "Other State Sale" ? (
                <>
                  <div className="table-responsive">
                    <table className="table table-bordered" border={2}>
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
                          <td className="text-center fw-bold">{totalAmount}</td>
                          <td className="text-center fw-bold"></td>
                          <td className="text-center fw-bold">{IGSTAmount}</td>
                          <td className="text-center fw-bold">{IGSTAmount}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </>
              ) : Sale === "State Sale" ? (
                <>
                  <div className="table-responsive">
                    <table
                      className="table table-bordered border-primary"
                      border={2}
                    >
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
                          <td className="text-center fw-bold">{totalAmount}</td>
                          <td className="text-center fw-bold"></td>
                          <td className="text-center fw-bold">{CGSTAmount}</td>
                          <td className="text-center fw-bold"></td>
                          <td className="text-center fw-bold">{SGSTAmount}</td>
                          <td className="text-center fw-bold">{IGSTAmount}</td>
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
                            <span className="fw-bold">{Pan}</span>
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
                            <span className="fw-bold">{accountHolderName}</span>
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
                  <div className="card-header text-end">for {ShopName}</div>
                  <div
                    className="card-body"
                    style={{ minWidth: 100, minHeight: 100 }}
                  ></div>
                  <div className="card-footer text-center">
                    Authorised Signatory
                  </div>
                </div>
              </div>
            </div>
          </main>

          <div className="card-footer text-center fw-bold">
            Thank You For Purchasing. Visit Again.
          </div>
        </section>
      </>
    );
  }
}

export default PDF;
