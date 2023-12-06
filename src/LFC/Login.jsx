import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../Utils/Firebase/Firebase_config";
import { get, ref } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function Login() {
  const navigate = useNavigate();

  const [Validation, setValidation] = useState("");
  const [owner, setOwner] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [remeber, setRemember] = useState(false);
  const [wrong, setWrong] = useState("btn btn-danger btn-lg btn-block");
  const validationcheck = () => {
    setValidation("was-validated");
  };

  const checkPassword = (event) => {
    const passowrd = event.target.checkValidity();
    setWrong(
      passowrd
        ? "btn btn-success btn-lg btn-block"
        : "btn btn-danger btn-lg btn-block"
    );
  };

  const [PasswordType, setPasswordType] = useState({type: "password", passowrd: true});
  const showPassword = () => {
    setPasswordType({
      type: "text",
      passowrd: false
    })
  }
  const hidePassword = () => {
    setPasswordType({
      type: "password",
      passowrd: true
    })
  }

  const getowner = (event) => {
    const getowner = event;
    setOwner(
      getowner === "Admin"
        ? "(Admin)"
        : getowner === "Employee"
        ? "(Employee)"
        : ""
    );
  };

  const checked = () => {
    setRemember(!remeber);
  };
  

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col" style={{width:'fit-content',flex: '0 0 auto'}}>
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div
                  className="row g-0 rounded"
                  style={{ boxShadow: "20px 2rem 3em rgba(121, 115, 115, 1)" }}
                >
                  <div className="col d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fa fa-2x me-3 fa-solid fa-receipt"
                          style={{ color: "#d10000" }}
                        />
                        <span className="h1 fw-bold mb-0">
                          Your Billing
                        </span>
                      </div>
                      <form className={Validation}>
                        <select
                          className="btn btn-warning mb-2 btn-sm form-select"
                          style={{ width: "50%" }}
                          required
                          onChange={(event) => {
                            getowner(event.target.value);
                          }}
                        >
                          <option value="">Select</option>
                          <option value="Admin">Admin</option>
                          <option value="Employee">Employee</option>
                        </select>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: 1 }}
                        >
                          Sign into your account {owner}
                        </h5>
                        <div className="form-outline">
                          <label className="form-label" htmlFor="email">
                            Email address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            placeholder="Email Address"
                            onChange={(event) => {
                              setEmail(event.target.value);
                            }}
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter valid Email address.
                          </div>
                        </div>
                        <div className="form-outline">
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>{" "}
                          {
                            PasswordType.passowrd ? 
                            <FontAwesomeIcon icon={faEye} onClick={showPassword}/>
                            : <FontAwesomeIcon icon={faEyeSlash} onClick={hidePassword}/>
                          }
                          <input
                            type={PasswordType.type}
                            minLength={8}
                            onKeyUp={checkPassword}
                            placeholder="Password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            required
                            autoComplete="True"
                            id="password"
                            onChange={(event) => {
                              setPassword(event.target.value);
                            }}
                            className="form-control form-control-lg"
                          />
                          <div className="invalid-feedback">
                            Please enter valid passowrd.
                          </div>
                        </div>
                        <div className="form-check mb-4">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="checked"
                            checked={remeber}
                            onChange={checked}
                          />
                          <label className="form-check-label" htmlFor="checked">
                            Remember me
                          </label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className={wrong}
                            onClick={validationcheck}
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                        <Link
                          className="small text-muted"
                          to="/forget"
                          style={{ textDecoration: "None" }}
                        >
                          Forgot password?
                        </Link>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
