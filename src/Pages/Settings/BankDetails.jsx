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
    const center = {
      accountHolderName: accountHolderName,
      bankName: bankName,
      accountNumber: accountNumber,
      branchAndIFSC: branchAndIFSC,
    };

    try {
      await update(ref(db, "Settings/"), center);
      message.success("Details Update");
    } catch (e) {
      message.error("Something Wrong");
    }
  };

  const clinic = JSON.parse(localStorage.getItem("SettingsConfig"))[0]?.Center;

  useEffect(() => {
    setAccountHolderName(clinic?.accountHolderName || "");
    setBankName(clinic?.bankName || "");
    setAccountNumber(clinic?.accountNumber || "");
    setBranchAndIFSC(clinic?.branchAndIFSC || "");
  }, [
    clinic?.accountHolderName,
    clinic?.bankName,
    clinic?.accountNumber,
    clinic?.branchAndIFSC,
  ]);

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
