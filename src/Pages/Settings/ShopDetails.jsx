import { Input, InputNumber, message } from "antd";
import { ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../../Utils/Firebase/Firebase_config";
import { SaveOutlined, EditOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import runes from "runes2";

export default function BankDetails() {
  const [ShopName, setShopName] = useState("");
  const [ShopAddress, setShopAddress] = useState("");
  const [GSTINNumber, setGSTINNumber] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const [Email, setEmail] = useState("");
  const [Pan, setPan] = useState("");

  const [Readonly, setReadonly] = useState(true);

  const save = async () => {
    const client = {
      ShopName: ShopName,
      ShopAddress: ShopAddress,
      GSTINNumber: GSTINNumber,
      ContactNo: ContactNo,
      Email: Email,
      Pan: Pan,
    };

    try {
      await set(ref(db, "Details/"), client);
      message.success("Details Update");
      setReadonly(true);
    } catch (e) {
      message.error("Something Wrong");
      setReadonly(false);
    }
  };

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData =
      JSON.parse(sessionStorage.getItem("DetailsConfig")) || {};

    const {
      ShopName: storedShopName,
      ShopAddress: storedShopAddress,
      GSTINNumber: storedGSTINNumber,
      ContactNo: storedContactNo,
      Email: storedEmail,
      Pan: storedPan,
    } = storedData;

    // Set state variables using the extracted values
    setShopName(storedShopName || "");
    setShopAddress(storedShopAddress || "");
    setGSTINNumber(storedGSTINNumber || "");
    setContactNo(storedContactNo || "");
    setEmail(storedEmail || "");
    setPan(storedPan || "");
  }, []);

  return (
    <>
      <div
        className="container"
        style={{
          overflow: "auto",
        }}
      >
        <div className="row my-3">
          <div className="col-12">
            <label htmlFor="ShopName" className="form-label">
              Shop Name
            </label>
            <Input
              disabled={Readonly}
              type="text"
              id="ShopName"
              value={ShopName}
              onChange={(e) => setShopName(e.target.value)}
              count={{
                show: true,
                max: 50,
                strategy: (txt) => runes(txt).length,
                exceedFormatter: (txt, { max }) =>
                  runes(txt).slice(0, max).join(""),
              }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="ShopAddress" className="form-label">
              Shop Address
            </label>
            <TextArea
              disabled={Readonly}
              autoSize
              count={{
                show: true,
                max: 200,
                strategy: (txt) => runes(txt).length,
                exceedFormatter: (txt, { max }) =>
                  runes(txt).slice(0, max).join(""),
              }}
              type="text"
              className="form-control"
              id="ShopAddress"
              value={ShopAddress}
              onChange={(e) => setShopAddress(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label htmlFor="GSTINNumber" className="form-label">
              GSTIN Number
            </label>
            <Input
              disabled={Readonly}
              type="text"
              className="form-control"
              id="GSTINNumber"
              value={GSTINNumber}
              onChange={(e) => setGSTINNumber(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label htmlFor="ContactNo" className="form-label">
              Contact No.
            </label>
            <InputNumber
              maxLength={10}
              disabled={Readonly}
              size="small"
              className="form-control"
              id="ContactNo"
              value={ContactNo}
              onChange={(e) => setContactNo(e)}
            />
          </div>
          <div className="col-6">
            <label htmlFor="Pan" className="form-label">
              Pan
            </label>
            <Input
              disabled={Readonly}
              type="text"
              className="form-control"
              id="Pan"
              value={Pan}
              onChange={(e) => setPan(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <Input
              disabled={Readonly}
              type="email"
              className="form-control"
              id="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <footer className="my-3 text-end">
            {Readonly ? (
              <button
                type="button"
                className="btn btn-danger btn-sm rounded-circle"
                onClick={() => setReadonly(false)}
              >
                <EditOutlined />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success btn-sm rounded-circle"
                onClick={save}
              >
                <SaveOutlined />
              </button>
            )}
          </footer>
        </div>
      </div>
    </>
  );
}
