import React, { useEffect, useState } from "react";
import "./JobList.css";
import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Button } from "primereact/button";
import JobModal from "./JobModal";
import FormModal from "./FormModal";
import { Paginator } from "primereact/paginator";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { JobList_Get_Request } from "../Redux/Action/JobListAction";
import { Tag } from "primereact/tag";

function JobList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [submittedJobs, setSubmittedJobs] = useState({});
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [searchJob, setSearchJob] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(JobList_Get_Request());
  }, [dispatch]);

  const data = useSelector((state) => state.jobData.JobData);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const handleJobModalOpen = (data) => {
    setSelectedData(data);
    setModalVisible(true);
  };
  const handleFormOpen = (data) => {
    setSelectedData(data);
    setFormOpen(true);
  };
  const filteredJob = data?.filter(
    (job) =>
      job.companyName.toLowerCase().includes(searchJob.toLowerCase()) ||
      job.jobTitle.toLowerCase().includes(searchJob.toLowerCase()) ||
      job.skillsRequired.some((skill) =>
        skill.toLowerCase().includes(searchJob.toLowerCase())
      )
  );
  const handleJobSubmit = (id) => {
    setSubmittedJobs((prev) => ({
      ...prev,
      [id]: true, // Mark this job as submitted
    }));
    setFormOpen(false);
  };
  const currentItems = filteredJob.slice(first, first + rows);
  return (
    <div className="container-fluid pt-3 px-3">
      <div className="content">
        <div
          className="row align-items-center"
          style={{ paddingRight: "20px", paddingLeft: "20px" }}
        >
          <div className="col-6 pe-0">
            <h4 className="ms-1 text-primary mb-0">JOB APPLICATION SYSTEM</h4>
          </div>
          <div className="col-6 ps-0">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                className="form-control"
                placeholder="Search by title, company name, and skills..."
                value={searchJob}
                onChange={(e) => setSearchJob(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="joblist">
          {currentItems &&
            currentItems.map((job) => (
              <Card className="job" key={job.id}>
                <div className="row" style={{ justifyContent: "between" }}>
                  <div className="col-8">
                    <h4
                      className="title"
                      role="link"
                      onClick={() => handleJobModalOpen(job)}
                    >
                      {job.jobTitle}
                      {submittedJobs[job.id] && (
                        <Tag
                          style={{ background: "green", color: "white" }}
                          className="px-1 py-1 mx-2"
                          value="Applied"
                        ></Tag>
                      )}
                    </h4>
                    <h6>{job.companyName}</h6>
                  </div>
                  <div className="col-4 align-self-center">
                    <Button
                      label="Apply for Job"
                      className="float-end p-2"
                      style={{ borderRadius: "7px" }}
                      onClick={() => handleFormOpen(job)}
                      disabled={submittedJobs[job.id]}
                    />
                  </div>
                </div>
              </Card>
            ))}
          {filteredJob.length > 5 && (
            <div className="page">
              <Paginator
                first={first}
                rows={rows}
                totalRecords={data?.length}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
      <JobModal
        visible={modalVisible}
        setVisible={setModalVisible}
        data={selectedData}
      />
      <FormModal
        visible={formOpen}
        setVisible={setFormOpen}
        data={selectedData}
        onModalSubmit={() => handleJobSubmit(selectedData.id)}
      />
    </div>
  );
}

export default JobList;
