import { message } from "antd";
import { ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../../Utils/Firebase/Firebase_config";
import { SaveOutlined } from "@ant-design/icons";

export default function BankDetails() {
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchAndIFSC, setBranchAndIFSC] = useState("");

  const save = async () => {
    const client = {
      accountHolderName: accountHolderName,
      bankName: bankName,
      accountNumber: accountNumber,
      branchAndIFSC: branchAndIFSC,
    };

    try {
      await update(ref(db, "Settings/"), client);
      message.success("Details Update");
    } catch (e) {
      message.error("Something Wrong");
    }
  };

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = JSON.parse(sessionStorage.getItem("SettingsConfig")) || {};

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
              type="text"
              className="form-control"
              id="branchAndIFSC"
              value={branchAndIFSC}
              onChange={(e) => setBranchAndIFSC(e.target.value)}
            />
          </div>
          <footer className="my-3 text-end">
            <button
              type="button"
              className="btn btn-primary btn-sm rounded-circle"
              onClick={save}
            >
              <SaveOutlined />
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
