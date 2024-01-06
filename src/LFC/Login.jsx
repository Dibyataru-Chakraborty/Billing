import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Utils/Firebase/Firebase_config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function Login() {
  const navigate = useNavigate();

  const [Validation, setValidation] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
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

  const [PasswordType, setPasswordType] = useState({
    type: "password",
    passowrd: true,
  });
  const showPassword = () => {
    setPasswordType({
      type: "text",
      passowrd: false,
    });
  };
  const hidePassword = () => {
    setPasswordType({
      type: "password",
      passowrd: true,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        Email,
        Password
      );
      const currentUser = userCredential.user;

      const Signup = {
        email: currentUser.email,
        uid: currentUser.uid,
        lastSignInTime: currentUser.metadata.lastSignInTime,
        creationTime: currentUser.metadata.creationTime,
        refreshToken: currentUser.refreshToken,
        expirationTime: currentUser.toJSON().stsTokenManager.expirationTime,
        accessToken: currentUser.toJSON().stsTokenManager.accessToken,
      };

      sessionStorage.setItem("user", JSON.stringify(Signup));

      message.success("Successfully Login", 1.5);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      const errorMessage = error.message.includes(AuthErrorCodes.USER_DELETED)
        ? "User not found"
        : error.message.includes(AuthErrorCodes.INVALID_PASSWORD)
        ? "Wrong Password"
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
            <div
              className="col"
              style={{ width: "fit-content", flex: "0 0 auto" }}
            >
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
                        <span className="h1 fw-bold mb-0">FORBIDDEN 403</span>
                      </div>
                      <form className={Validation} onSubmit={login}>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: 1 }}
                        >
                          Sign into your account
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
                          {PasswordType.passowrd ? (
                            <FontAwesomeIcon
                              icon={faEye}
                              onClick={showPassword}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faEyeSlash}
                              onClick={hidePassword}
                            />
                          )}
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
