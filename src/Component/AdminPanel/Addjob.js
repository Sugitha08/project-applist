import React from "react";
import { Button } from "primereact/button";
import { skillOptions } from "../Data";
import Select from "react-select";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { JobList_post_Request } from "../../Redux/Action/JobListAction";

function Appjob({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(JobList_post_Request(values));
    toast.success("Successfully Job Created");
    navigate("/panel");
  };
  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      companyName: "",
      experienceRequired: "",
      skillsRequired: [],
      jobDescription: "",
    },
    validationSchema: yup.object().shape({
      jobTitle: yup
        .string()
        .min(4, "jobTitle must have atleast 4 characters")
        .required("This Field is required"),
      companyName: yup
        .string()
        .min(4, "companyName must have atleast 4 characters")
        .required("This Field is required"),
      experienceRequired: yup.string().required("*this field is required"),
      skillsRequired: yup.array().min(1, "Select atleast one Skill"),
      jobDescription: yup.string().required("This Field is required"),
    }),
    onSubmit,
  });

  const handleSkillChange = (skillsRequired) => {
    formik.setFieldValue("skillsRequired", skillsRequired);
  };
  return (
    <>
      <div className="container-fluid p-5">
        <div className="card applicationForm">
          <div className="form-field">
            <div className="form d-flex">
              <h5 className="mb-1 text-center text-primary">ADD A JOB</h5>
              <button
                type="button"
                className="btn btn-primary ms-auto"
                onClick={() => navigate("/panel")}
              >
                Jobs
              </button>
            </div>

            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="my-2">
                  <label htmlFor="jobTitle" className="form-label">
                    Job Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.errors.jobTitle && formik.touched.jobTitle
                        ? "is-invalid"
                        : formik.touched.jobTitle && !formik.errors.jobTitle
                        ? "is-valid"
                        : ""
                    }`}
                    placeholder="Enter jobTitle"
                    id="jobTitle"
                    name="jobTitle"
                    value={formik.values.jobTitle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.jobTitle && formik.touched.jobTitle && (
                    <p className="invalid-feedback">{formik.errors.jobTitle}</p>
                  )}
                </div>
                <div className="my-2">
                  <label htmlFor="companyName" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.errors.companyName && formik.touched.companyName
                        ? "is-invalid"
                        : formik.touched.companyName &&
                          !formik.errors.companyName
                        ? "is-valid"
                        : ""
                    }`}
                    id="companyName"
                    placeholder="Enter companyName"
                    name="companyName"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.companyName && formik.touched.companyName && (
                    <p className="invalid-feedback">
                      {formik.errors.companyName}
                    </p>
                  )}
                </div>
                <div className="my-2">
                  <label htmlFor="experienceRequired" className="form-label">
                    Experience Required
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.errors.experienceRequired &&
                      formik.touched.experienceRequired
                        ? "is-invalid"
                        : formik.touched.experienceRequired &&
                          !formik.errors.experienceRequired
                        ? "is-valid"
                        : ""
                    }`}
                    id="experienceRequired"
                    placeholder="Enter experienceRequired"
                    name="experienceRequired"
                    value={formik.values.experienceRequired}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.experienceRequired &&
                    formik.touched.experienceRequired && (
                      <p className="invalid-feedback">
                        {formik.errors.experienceRequired}
                      </p>
                    )}
                </div>
                <div className="my-2">
                  <label htmlFor="skills" className="form-label">
                    Skills Required
                  </label>
                  <Select
                    isMulti
                    name="skillsRequired"
                    options={skillOptions}
                    className={`${
                      formik.errors.skillsRequired &&
                      formik.touched.skillsRequired
                        ? "is-invalid"
                        : formik.touched.skillsRequired &&
                          !formik.errors.skillsRequired
                        ? "is-valid"
                        : ""
                    }`}
                    value={formik.values.skillsRequired}
                    onChange={handleSkillChange}
                    isSearchable
                    placeholder="Select skills"
                  />
                  {formik.errors.skillsRequired &&
                    formik.touched.skillsRequired && (
                      <p className="invalid-feedback">
                        {formik.errors.skillsRequired}
                      </p>
                    )}
                </div>
                <div className="my-2">
                  <label htmlFor="jobDescription" className="form-label">
                    Job Discription
                  </label>
                  <textarea
                    id="jobDescription"
                    name="jobDescription"
                    class="form-control"
                    rows="3"
                    placeholder="job Description"
                    value={formik.values.jobDescription}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.jobDescription &&
                    formik.touched.jobDescription && (
                      <p className="invalid-feedback">
                        {formik.errors.jobDescription}
                      </p>
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

export default Appjob;
