import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReq } from "../../Redux/Action/LoginAction";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();

  const [regDetails, setRegDetails] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    cpassword: "",
    mobileNo: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const navigate= useNavigate();

  const validate = () => {
    let formErrors = {};

    if (!regDetails.firstName) {
      formErrors.firstName = "First Name is required";
    }

    if (!regDetails.lastName) {
      formErrors.lastName = "Last Name is required";
    }

    if (!regDetails.userName) {
      formErrors.userName = "User Name is required";
    }

    if (!regDetails.mobileNo || regDetails.mobileNo.length !== 10) {
      formErrors.mobileNo = "A valid 10-digit Mobile Number is required";
    }

    if (!regDetails.password) {
      formErrors.password = "Password is required";
    }

    if (regDetails.password !== regDetails.cpassword) {
      formErrors.cpassword = "Passwords do not match";
    }

    return formErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch(createReq(regDetails));
      // Clear form after successful registration
      setRegDetails({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        cpassword: "",
        mobileNo: "",
      });
      setErrors({});
    }
    navigate("/")   
  };

  return (
    <div className="row d-flex justify-content-center ">
      <div className="card reg-form mt-4 col-5">
        <h2 className="mx-auto text-secondary">Register</h2>
        <form className="d-flex flex-column align-items-center">
          <div className="col-9">
            <label className="mt-2 form-label" htmlFor="firstName">
              First Name<span className="text-danger">*</span> :
            </label>
            <br />
            <input
              className="form-control"
              type="text"
              name="firstName"
              placeholder="Enter your First Name"
              value={regDetails.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <small className="text-danger">{errors.firstName}</small>
            )}
          </div>

          <div className="col-9">
            <label className="mt-2 form-label" htmlFor="lastName">
              Last Name<span className="text-danger">*</span> :
            </label>
            <br />
            <input
              className="form-control"
              type="text"
              name="lastName"
              placeholder="Enter your Last Name"
              value={regDetails.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <small className="text-danger">{errors.lastName}</small>
            )}
          </div>

          <div className="col-9">
            <label className="mt-2 form-label" htmlFor="mobileNo">
              Mobile Number<span className="text-danger">*</span> :
            </label>
            <br />
            <input
              className="form-control"
              type="number"
              name="mobileNo"
              placeholder="Enter your mobile number"
              value={regDetails.mobileNo}
              onChange={handleChange}
            />
            {errors.mobileNo && (
              <small className="text-danger">{errors.mobileNo}</small>
            )}
          </div>

          <div className="col-9">
            <label className="mt-2 form-label" htmlFor="userName">
              User Name<span className="text-danger">*</span> :
            </label>
            <br />
            <input
              className="form-control"
              type="text"
              name="userName"
              placeholder="Enter your Username"
              value={regDetails.userName}
              onChange={handleChange}
            />
            {errors.userName && (
              <small className="text-danger">{errors.userName}</small>
            )}
          </div>

          <div className="col-9">
            <label className="mt-2 form-label" htmlFor="password">
              Password<span className="text-danger">*</span> :
            </label>
            <br />
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={regDetails.password}
              onChange={handleChange}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          <div className="col-9">
            <label className="mt-2 form-label" htmlFor="cpassword">
              Confirm Password<span className="text-danger">*</span> :
            </label>
            <br />
            <input
              className="form-control"
              type="password"
              name="cpassword"
              placeholder="Re-Enter your Password"
              value={regDetails.cpassword}
              onChange={handleChange}
            />
            {errors.cpassword && (
              <small className="text-danger">{errors.cpassword}</small>
            )}
          </div>

          <div className="col-9 d-flex justify-content-center mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary btn-rounded px-5"
            >
              Submit
            </button>
          </div>
          <div>
            <p className="mt-2">
              Already have an account?
              <Link to="/login" className="text-decoration-none"> Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
