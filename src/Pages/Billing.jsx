import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Button } from "antd";

export default function Billing() {
  const [searchAvailableValue, setSearchAvailableValue] = useState("");
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [TestTotal, setTestTotal] = useState("0");
  const [BillTotal, setBillTotal] = useState("0");
  const [FlatDiscount, setFlatDiscount] = useState("0");
  const [DoctorDiscountisToggled, DoctorDiscountsetToggled] = useState(true);
  const [DoctorDiscount, setDoctorDiscount] = useState("0");
  const [currentDateTime, setcurrentDateTime] = useState("");
  const [PaidAmount, setPaidAmount] = useState("0");
  const [DueRefund, setDueRefund] = useState(true);
  const [RefundMoney, setRefundMoney] = useState("0");
  const [loadings, setLoadings] = useState(false);
  const [Paid, setPaid] = useState(true);

  const [mobile, setMobile] = useState('')
  const [Patientinfo, setPatientinfo] = useState([]);
  const Patientinfo_data = [];
  var Patientinfo_count = "0";
  JSON.parse(localStorage.getItem("PatientManage")).forEach((element) => {
    if (element !== null) {
      Patientinfo_data.push({
        key: Patientinfo_count++,
        address: element["address"],
        age: element["age"],
        age_day: element["age_day"],
        age_month: element["age_month"],
        age_period: element["age_period"],
        age_year: element["age_year"],
        breed_id: element["breed_id"],
        city: element["city"],
        created_at: element["created_at"],
        discount_expiry_date: element["discount_expiry_date"],
        discount_package_id: element["discount_package_id"],
        dob: element["dob"],
        gender: element["gender"],
        id: element["id"],
        is_revisit: element["is_revisit"],
        local_area: element["local_area"],
        mobile: element["mobile"],
        name_prefix: element["name_prefix"],
        owner_name: element["owner_name"],
        p_name: element["p_name"],
        pin: element["pin"],
        referral_lab_id: element["referral_lab_id"],
        updated_at: element["updated_at"],
        whatsapp: element["whatsapp"],
      });
    }
  });
  const getMobile = useRef()
  const filterPatientInfo = () => {
    const filteredData = Patientinfo_data.filter((item) => item.mobile === mobile);
    setPatientinfo(filteredData);
    console.log(filteredData);
  };

  const getarea = (event) => {
    var [Local_Area] = "";
    let pincode = event.target;
    let pos = document.getElementById("Local_Area");
    if (pincode.value !== "" && pincode.value.length === 6) {
      fetch("https://api.postalpincode.in/pincode/" + pincode.value)
        .then((response) => response.json())
        .then((data) => {
          var html = "";
          if (data[0].PostOffice === null) {
          } else {
            for (let i = 0; i < data[0].PostOffice.length; i++) {
              let info = data[0].PostOffice[i];
              html +=
                '<option value="' + info.Name + '">' + info.Name + "</option>";
              Local_Area = pos.innerHTML = html;
            }
          }
        });
    } else {
      var html1 = "";
      html1 = '<option value="">Select</option>';
      Local_Area = pos.innerHTML = html1;
    }
  };

  const getTest = () => {
    const tempTargetKeys = [];
    const temptestData = [];

    var count = "";

    JSON.parse(localStorage.getItem("LabTest")).forEach((element) => {
      const data = {
        key: count++,
        title: element["name"],
        price: element["price"],
      };
      if (data.chosen) {
        tempTargetKeys.push(data.key);
      }
      temptestData.push(data);
    });
    setAvailableItems(temptestData);
    setSelectedItems(tempTargetKeys);
  };

  const AvailableSearch = (event) => {
    setSearchAvailableValue(event.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.find((i) => i.key === item.key)) {
        return prevSelected.filter((i) => i.key !== item.key);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  const filteredAvailableItems = availableItems.filter((item) =>
    item.title.toLowerCase().includes(searchAvailableValue.toLowerCase())
  );

  const DateTime = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    setcurrentDateTime(year + "-" + month + "-" + day + " " + hour + ":" + min);
  };

  const [ServiceCharge, setServiceCharge] = useState("0");
  const [ServiceChargeSelect, setServiceChargeSelect] = useState([]);
  const ServiceOtherChargePay = (e) => {
    const selectedOptions = e.map((selected) => selected.value);

    const selectedOptionDetails = e
      .filter((option) => selectedOptions.includes(option.value))
      .map((option) => ({ label: option.label, amount: option.amount }));

    const totalAmount = selectedOptionDetails.reduce(
      (total, option) => Number(total) + Number(option.amount),
      0
    );

    setServiceCharge(Number(totalAmount));
    setServiceChargeSelect(selectedOptionDetails);
  };
  const Service_Other_Charge = [];
  JSON.parse(localStorage.getItem("ServiceCharge")).forEach((element) => {
    Service_Other_Charge.push({
      label: element["name"],
      value: element["name"],
      amount: element["amount"],
    });
  });

  const Sample_Collected_From = [
    { value: "Inside", label: "Inside" },
    { value: "Outside", label: "Outside" },
  ];
  const SampleCollectedFrom = (e) => {
    console.log(e.value);
  };

  const [Discount_Amount, setDiscount_Amount] = useState("");
  const [DiscountCauseSelect, setDiscountCauseSelect] = useState([]);
  const DiscountCause = (e) => {
    if (e !== null) {
      const value = e.value;
      const amount = e.amount;
      setDiscount_Amount(Number(amount));
      setDiscountCauseSelect([{ label: value, amount }]);
    } else {
      const amount = '0'
      const value = []
      setDiscount_Amount(Number(amount));
      setDiscountCauseSelect(value);
    }
  };
  const Discount_Cause = [];
  JSON.parse(localStorage.getItem("DiscountCause")).forEach((element) => {
    Discount_Cause.push({
      label: element["name"],
      value: element["name"],
      amount: element["amount"],
    });
  });

  const Gender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" },
  ];

  const PayMode = [
    { value: "Cash", label: "Cash" },
    { value: "Card", label: "Card" },
    { value: "UPI", label: "UPI" },
  ];

  const DoctorDiscountToggle = () => {
    DoctorDiscountsetToggled((prev) => !prev);
  };

  const Due_Refund = () => {
    PaidAmount > BillTotal ? refund() : due();

    function due() {
      return (
        setDueRefund(true),
        setRefundMoney(Number(BillTotal) - Number(PaidAmount))
      );
    }

    function refund() {
      return (
        setDueRefund(false),
        setRefundMoney(Number(PaidAmount) - Number(BillTotal))
      );
    }
  };

  const TotalTest = () => {
    var sum = 0;
    selectedItems.length > 0
      ? selectedItems.forEach((e) => {
          setTestTotal((sum = sum + Number(e.price)));
        })
      : setTestTotal("0");
  };

  const TotalBill = () => {
    var sum = 0;
    var charge = sum + Number(TestTotal) + Number(ServiceCharge);
    var discount = Math.round((Number(TestTotal) * Number(DoctorDiscount)) / 100);
    var discountcause = (Number(TestTotal) * Number(Discount_Amount)) / 100;
    selectedItems.length > 0
      ? DoctorDiscountisToggled
        ? Rupee()
        : Percentage()
      : setBillTotal("0");

    function Percentage() {
      return (
        setBillTotal(Math.round(Number(charge) - Number(discount) - Number(discountcause))),
        setFlatDiscount(discount)
      );
    }

    function Rupee() {
      return (
        setBillTotal(
          Math.round(Number(charge) - Number(DoctorDiscount) - Number(discountcause))
        ),
        setFlatDiscount(Number(DoctorDiscount))
      );
    }

    Number(PaidAmount) !== "0" && Number(PaidAmount) !== Number("")
      ? Number(PaidAmount) <= Number(BillTotal)
        ? setPaid(false)
        : setPaid(true)
      : setPaid(true);
  };

  useEffect(() => {
    getTest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [1]);

  useEffect(() => {
    TotalTest();
    DateTime();
    TotalBill();
    Due_Refund();
  });

  const Submit = () => {
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
    }, 2000);
  };

  return (
    <>
      <div
        className="container"
        style={{
          overflow: "auto",
        }}
      >
        <div className="row my-3 justify-content-between">
          <div className="col-sm-6 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-header">
                <strong>Lab Patient</strong> Basic Information
              </div>
              <div className="card-body">
                <div className="card-text">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="Mobile">
                          Mobile
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="ex: 9898988988"
                          id="Mobile"
                          maxLength={10}
                          minLength={10}
                          pattern="[6-9][0-9]{9}"
                          onChange={(e) => setMobile(e.target.value)}
                          list="mobile"
                          onKeyUp={filterPatientInfo}
                        />
                        <datalist id="mobile" ref={getMobile}>
                          {Patientinfo.map((patient, index) => (
                            <option key={index} value={`${patient.mobile}${" "}${patient.p_name}`} />
                          ))}
                        </datalist>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="Name">
                          Name
                        </label>
                        <div className="input-group">
                          <select className="btn active">
                            <option value="Mr">Mr.</option>
                            <option value="Mrs">Mrs.</option>
                            <option value="Miss">Miss.</option>
                            <option value="Master">Master</option>
                            <option value="B/O.">B/O.</option>
                            <option value="C/O.">C/O.</option>
                            <option value="Dr.">Dr.</option>
                            <option value=" ">N/A</option>
                          </select>
                          <input
                            type="text"
                            id="Name"
                            className="form-control"
                            aria-label="Text input with dropdown button"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="Gender">
                          Gender
                        </label>
                        <Select options={Gender} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-outline">
                        <label htmlFor="Age" className="form-label">
                          Age
                        </label>
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control col"
                            placeholder="Year"
                            required
                            maxLength={3}
                            minLength={1}
                            pattern="[0-9]{1,3}"
                            //   onChange={(event) => {
                            //     setpatientAge(event.target.value);
                            //   }}
                          />
                          <input
                            type="number"
                            className="form-control col"
                            placeholder="Month"
                            required
                            maxLength={3}
                            minLength={1}
                            pattern="[0-9]{1,3}"
                            //   onChange={(event) => {
                            //     setpatientAge(event.target.value);
                            //   }}
                          />
                          <input
                            type="number"
                            className="form-control col"
                            placeholder="Day"
                            required
                            maxLength={3}
                            minLength={1}
                            pattern="[0-9]{1,3}"
                            //   onChange={(event) => {
                            //     setpatientAge(event.target.value);
                            //   }}
                          />
                        </div>

                        <div
                          className="invalid-feedback"
                          style={{ color: "#fbacb4" }}
                        >
                          Please enter a Age.
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="Ref_Doctor">
                          Ref Doctor
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="Ref_Doctor"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-header">
                <strong>Patient</strong> Additional Information
              </div>
              <div className="card-body">
                <div className="card-text">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="WhatsApp">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Enter WhatsApp Number"
                          id="WhatsApp"
                          maxLength={10}
                          minLength={10}
                          pattern="[6-9][0-9]{9}"
                          //   onChange={(event) => {
                          //     setpatientMobile(event.target.value);
                          //   }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="Local_Area">
                          Local Area
                        </label>
                        <select className="form-control" id="Local_Area">
                          <option value="">Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="Address">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Address"
                          id="Address"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="Pincode">
                          Pincode
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Pincode"
                          maxLength={6}
                          minLength={6}
                          pattern="[0-9]{6}"
                          id="Pincode"
                          onKeyUp={getarea}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="City">
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter City"
                          id="City"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-header">
                <div className="row justify-content-between">
                  <div className="col-6">
                    <strong>Lab Test</strong> Information
                  </div>
                  <div className="col-6">
                    <div className="d-grid justify-content-end">
                      <strong>Test Total: ₹{TestTotal}</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="card-text">
                  <div className="container">
                    <div className="row my-3 justify-content-between">
                      <div className="col-md-6">
                        <h5>Available Tests</h5>
                        <input
                          type="text"
                          className="form-control mb-3"
                          placeholder="Search Available Items"
                          value={searchAvailableValue}
                          onChange={AvailableSearch}
                        />
                        <div style={{ maxHeight: 300, overflow: "auto" }}>
                          <table className="table table-bordered table-hover">
                            <thead>
                              <tr>
                                <th>Item Name</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredAvailableItems.map((item) => (
                                <tr
                                  key={item.key}
                                  onClick={() => handleItemClick(item)}
                                  className={
                                    selectedItems.includes(item)
                                      ? "table-info"
                                      : ""
                                  }
                                >
                                  <td>{item.title}</td>
                                  <td>{item.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h5>Selected Tests</h5>
                        <div style={{ maxHeight: 300, overflow: "auto" }}>
                          <table className="table table-bordered table-hover">
                            <thead>
                              <tr>
                                <th>Item Name</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedItems.map((item) => (
                                <tr key={item.key}>
                                  <td>{item.title}</td>
                                  <td>{item.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="row justify-content-end">
                  <div className="d-grid justify-content-end">
                    <strong>Test Total: ₹{TestTotal}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-3 justify-content-between">
          <div className="col-sm-6 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-header">
                <strong>Billing</strong> Information
              </div>
              <div className="card-body">
                <div className="card-text">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="Billing_Time">
                          Billing Time
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="Billing_Time"
                          value={currentDateTime}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label
                          className="form-label"
                          htmlFor="Sample_Collected_From"
                        >
                          Sample Collected From
                        </label>
                        <Select
                          onChange={SampleCollectedFrom}
                          options={Sample_Collected_From}
                          id="Sample_Collected_From"
                          defaultValue={Sample_Collected_From[0]}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label
                          className="form-label"
                          htmlFor="Service/Other_Charge"
                        >
                          Service/Other Charge
                        </label>
                        <Select
                          isMulti
                          name="Service/Other_Charge"
                          onChange={ServiceOtherChargePay}
                          options={Service_Other_Charge}
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="Discount_Cause">
                          Discount Cause
                        </label>
                        <Select
                          isClearable
                          name="Discount_Cause"
                          options={Discount_Cause}
                          onChange={DiscountCause}
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="DoctorDiscount">
                          Doctor Discount
                        </label>
                        <div className="input-group mb-3">
                          <button
                            className="input-group-text"
                            onClick={DoctorDiscountToggle}
                          >
                            {DoctorDiscountisToggled ? "₹" : "%"}
                          </button>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Doctor Discount"
                            aria-label="DoctorDiscount"
                            onChange={(event) => {
                              setDoctorDiscount(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="Agent">
                          Agent
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="Agent"
                        />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="Comment">
                          Comment
                        </label>
                        <textarea
                          style={{ height: 10 }}
                          type="text"
                          className="form-control"
                          id="Comment"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-header">
                <strong>Billing </strong>Preview
              </div>
              <div className="card-body">
                <div className="card-text d-flex justify-content-center">
                  <table>
                    <tbody>
                      <tr className="h4">
                        <th>Test Total:</th>
                        <td></td>
                        <td className="text-success text-end">+ {TestTotal} ₹</td>
                      </tr>
                      {ServiceChargeSelect.map((charge) => (
                        <tr className="h4" key={charge.label}>
                          <th>{charge.label}</th>
                          <td></td>
                          <td className="text-success text-end">
                            + {charge.amount} ₹
                          </td>
                        </tr>
                      ))}
                      {DiscountCauseSelect.map((charge) => (
                        <tr className="h4" key={charge.label}>
                          <th>{charge.label}</th>
                          <td></td>                  
                          <td className="text-danger text-end">
                            - {charge.amount} %
                          </td>
                        </tr>
                      ))}
                      <tr className="h4">
                        <th>Flat Discount:</th>
                        <td></td>
                        <td className="text-danger text-end">
                          - {FlatDiscount} ₹
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3">
                          <hr className="border border-danger border-2 opacity-50" />
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Paid Amount"
                            onChange={(event) => {
                              setPaidAmount(event.target.value);
                            }}
                          />
                        </th>
                        <td>
                          <Select options={PayMode} defaultValue={PayMode[0]} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between">
                  {DueRefund ? (
                    <div className="text-danger">
                      <h4>Due: ₹{RefundMoney}</h4>
                    </div>
                  ) : (
                    <div className="text-success">
                      <h4>Refund: ₹{RefundMoney}</h4>
                    </div>
                  )}
                  <div>
                    <h4>Bill Total: ₹{BillTotal}</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end my-3">
              {Paid ? (
                <></>
              ) : (
                <Button type="primary" loading={loadings} onClick={Submit}>
                  Generate Bill
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
