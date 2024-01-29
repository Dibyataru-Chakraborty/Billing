import { message } from "antd";
import { ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../../Utils/Firebase/Firebase_config";
import { SaveOutlined, EditOutlined } from "@ant-design/icons";

export default function BankDetails() {
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchAndIFSC, setBranchAndIFSC] = useState("");

  const [Readonly, setReadonly] = useState(true);

  const save = async () => {
    const client = {
      accountHolderName: accountHolderName,
      bankName: bankName,
      accountNumber: accountNumber,
      branchAndIFSC: branchAndIFSC,
    };

    try {
      await set(ref(db, "Bank/"), client);
      message.success("Details Update");
    } catch (e) {
      message.error("Something Wrong");
    }
  };

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = JSON.parse(sessionStorage.getItem("BankConfig")) || {};

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
      <div
        className="container"
        style={{
          overflow: "auto",
        }}
      >
        <div className="row my-3">
          <div className="col-12">
            <label htmlFor="accountHolderName" className="form-label">
              A/c Holder’s Name
            </label>
            <input
              disabled={Readonly}
              type="text"
              className="form-control"
              id="accountHolderName"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="bankName" className="form-label">
              Bank Name
            </label>
            <input
              disabled={Readonly}
              type="text"
              className="form-control"
              id="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="accountNumber" className="form-label">
              A/c No.
            </label>
            <input
              disabled={Readonly}
              type="text"
              className="form-control"
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="branchAndIFSC" className="form-label">
              Branch & IFS Code
            </label>
            <input
              disabled={Readonly}
              type="text"
              className="form-control"
              id="branchAndIFSC"
              value={branchAndIFSC}
              onChange={(e) => setBranchAndIFSC(e.target.value)}
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
