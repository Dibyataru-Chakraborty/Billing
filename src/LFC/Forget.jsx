import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { auth } from "../Utils/Firebase/Firebase_config";
import { AuthErrorCodes, sendPasswordResetEmail } from "firebase/auth";

export default function Forget() {
  const navigate = useNavigate();

  const [Validation, setValidation] = useState("");
  const [Email, setEmail] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const validationcheck = () => {
    setValidation("was-validated");
  };

  const checkUser = async(e) => {
    e.preventDefault();
    await messageApi.open({
      type: "loading",
      content: "Checking...",
      duration: 1,
    });
    try {
      await sendPasswordResetEmail(auth, Email);
      await message.success("Successful", 1.5);
      navigate("/");
    } catch (error) {
      const errorMessage = error.message.includes(AuthErrorCodes.USER_DELETED)
        ? "User not found"
        : error.message.includes(AuthErrorCodes.NETWORK_REQUEST_FAILED)
        ? "Check your connection"
        : error.message.includes(AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER)
        ? "Access to this account has been temporarily disabled due to many failed login attempts"
        : console.log(error.message);
      message.error(errorMessage || "An error occurred", 2.5);
    }
  };

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col" style={{ width: "fit-content", flex: "0 0 auto" }}>
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div
                  className="row g-0 rounded"
                  style={{ boxShadow: "20px 2rem 3em rgba(121, 115, 115, 1)" }}
                >
                  <div className="ccol d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fa fa-2x me-3 fa-solid fa-receipt"
                          style={{ color: "#d10000" }}
                        />
                        <span className="h1 fw-bold mb-0">FORBIDDEN 403</span>
                      </div>
                      <form className={Validation} onSubmit={checkUser}>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: 1 }}
                        >
                          Send reset email for your account
                          {contextHolder}
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
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-danger btn-lg btn-block"
                            onClick={validationcheck}
                            type={"submit"}
                          >
                            Validate
                          </button>
                        </div>
                        <Link
                          className="small text-muted"
                          to="/"
                          style={{ textDecoration: "None" }}
                        >
                          Sign In
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
