import React from "react";
import { Button } from "primereact/button";
import { skillOptions } from "./Data";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationPost_Request } from "../Redux/Action/JobApplicationAction";

function ApplicationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  const { loading, error } = useSelector((state) => state.Application);
  const onSubmit = (values) => {
    const payload ={
      ...values, companyId: data.id
    }
    dispatch(  
      ApplicationPost_Request(payload)
    );
    if (loading) {
      toast.promise("Loading");
    } else if (error) {
      toast.error("Job Application Failes");
    } else {
      toast.success("Successfully Job Applied");
      navigate("/");
    }
  };
  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      email: "",
      selectedSkills: [],
      details: "",
    },
    validationSchema: yup.object().shape({
      FirstName: yup
        .string()
        .min(4, "Firstname must have atleast 4 characters")
        .required("This Field is required"),
      LastName: yup
        .string()
        .min(4, "Lastname must have atleast 4 characters")
        .required("This Field is required"),
      email: yup
        .string()
        .email("Invalid Email address")
        .required("*this field is required"),
      selectedSkills: yup.array().min(1, "Select atleast one Skill"),
      details: yup.string().required("This Field is required"),
    }),
    onSubmit,
  });

  const handleSkillChange = (selectedSkills) => {
    formik.setFieldValue("selectedSkills", selectedSkills);
  };
  const handleAboutChange = (value) => {
    formik.setFieldValue("details", value);
  };
  return (
    <>
      <div className="container-fluid p-4">
        <div className="card applicationForm">
          <div className="form-header d-flex align-items-center">
            <img
              src={data?.logo}
              alt="logo"
              style={{ fontSize: "10px", borderRadius: "50%", width: "45px" }}
            />
            <div className="ms-2">
              <h4 className="mb-0 ">
                <img src="" />
                {data?.companyName}
              </h4>
              <div className="mb-1">{data?.jobTitle}</div>
            </div>
          </div>
          <div className="form-field">
            <div className="form">
              <h5 className="mb-1 text-center text-primary">
                Application Form
              </h5>
            </div>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="my-2">
                  <label htmlFor="FirstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.errors.FirstName && formik.touched.FirstName
                        ? "is-invalid"
                        : formik.touched.FirstName && !formik.errors.FirstName
                        ? "is-valid"
                        : ""
                    }`}
                    placeholder="Enter FirstName"
                    id="FirstName"
                    name="FirstName"
                    value={formik.values.FirstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.FirstName && formik.touched.FirstName && (
                    <p className="invalid-feedback">
                      {formik.errors.FirstName}
                    </p>
                  )}
                </div>
                <div className="my-2">
                  <label htmlFor="lname" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.errors.LastName && formik.touched.LastName
                        ? "is-invalid"
                        : formik.touched.LastName && !formik.errors.LastName
                        ? "is-valid"
                        : ""
                    }`}
                    id="lname"
                    placeholder="Enter LastName"
                    name="LastName"
                    value={formik.values.LastName}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.LastName && formik.touched.LastName && (
                    <p className="invalid-feedback">{formik.errors.LastName}</p>
                  )}
                </div>
                <div className="my-2">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.errors.email && formik.touched.email
                        ? "is-invalid"
                        : formik.touched.email && !formik.errors.email
                        ? "is-valid"
                        : ""
                    }`}
                    id="email"
                    placeholder="Enter Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="invalid-feedback">{formik.errors.email}</p>
                  )}
                </div>
                <div className="my-2">
                  <label htmlFor="skills" className="form-label">
                    Skills
                  </label>
                  <Select
                    isMulti
                    name="selectedSkills"
                    options={skillOptions}
                    className={`${
                      formik.errors.selectedSkills &&
                      formik.touched.selectedSkills
                        ? "is-invalid"
                        : formik.touched.selectedSkills &&
                          !formik.errors.selectedSkills
                        ? "is-valid"
                        : ""
                    }`}
                    value={formik.values.selectedSkills}
                    onChange={handleSkillChange}
                    isSearchable
                    placeholder="Select skills"
                  />
                  {formik.errors.selectedSkills &&
                    formik.touched.selectedSkills && (
                      <p className="invalid-feedback">
                        {formik.errors.selectedSkills}
                      </p>
                    )}
                </div>
                <div className="my-2">
                  <label htmlFor="skills" className="form-label">
                    About Me
                  </label>
                  <ReactQuill
                    placeholder="Write about yourself..."
                    theme="snow"
                    className={`${
                      formik.errors.details && formik.touched.details
                        ? "is-invalid"
                        : formik.touched.details && !formik.errors.details
                        ? "is-valid"
                        : ""
                    }`}
                    value={formik.values.details}
                    onChange={handleAboutChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.details && formik.touched.details && (
                    <p className="invalid-feedback">{formik.errors.details}</p>
                  )}
                </div>
                <div className="FormButton">
                  <Button
                    type="submit"
                    label="Apply for Job"
                    className="float-end p-2"
                    style={{ borderRadius: "7px", fontFamily: "inter var" }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicationForm;
