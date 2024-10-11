import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "primereact/button";
import { skillOptions } from "./Data";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as yup from "yup";

function FormModal({ visible, setVisible, data }) {
  const handleClose = () => {
    setVisible(false);
  };
  const onSubmit = () => {
    console.log("submit");
    formik.handleReset();
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
      //   selectedSkills: yup.array().min(1, "Select atleast one Skill"),
      //   details: yup.string().required("This Field is required"),
    }),
    onSubmit,
  });
  console.log(formik);

  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
  };
  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
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
          <div>{data?.jobTitle}</div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="form">
          <h5 className="mb-1">Application Form</h5>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="my-2">
              <label for="FirstName" className="form-label">
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
                <p className="invalid-feedback">{formik.errors.FirstName}</p>
              )}
            </div>
            <div className="my-2">
              <label for="lname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lname"
                placeholder="Enter LastName"
                name="LastName"
                value={formik.values.LastName}
                onChange={formik.handleChange}
              />
            </div>
            <div className="my-2">
              <label for="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className="my-2">
              <label for="skills" className="form-label">
                Skills
              </label>
              <Select
                isMulti
                name="skills"
                options={skillOptions}
                value={selectedSkills}
                onChange={handleChange}
                isSearchable
                placeholder="Select skills"
              />
            </div>
            <div className="my-2">
              <label for="skills" className="form-label">
                About Me
              </label>
              <ReactQuill
                placeholder="Write about yourself..."
                theme="snow"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
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
      </Modal.Body>
    </Modal>
  );
}

export default FormModal;
