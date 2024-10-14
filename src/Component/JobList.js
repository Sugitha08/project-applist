import React, { useEffect, useState } from "react";
import "./JobList.css";
import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Button } from "primereact/button";
import JobModal from "./JobModal";
import { Paginator } from "primereact/paginator";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { JobList_Get_Request } from "../Redux/Action/JobListAction";
import { Tag } from "primereact/tag";
import { useNavigate } from "react-router-dom";
import ApplicationDetails from "./ApplicationDetails";
import { AppDetailsByCI_Get_Request } from "../Redux/Action/JobApplicationAction";
import Appjob from "./AdminPanel/Addjob";

function JobList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [appDetailsModal, setAppDetailsModal] = useState(false);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [searchJob, setSearchJob] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState();
  const [FetchData, setFetchData] = useState();

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
    navigate("/form", { state: data });
  };

  const filteredJob = data?.filter((job) => {
    return (
      job?.companyName?.toLowerCase().includes(searchJob.toLowerCase()) ||
      job?.jobTitle?.toLowerCase().includes(searchJob.toLowerCase()) ||
      job?.skillsRequired?.some((skill) =>
        skill.toLowerCase().includes(searchJob.toLowerCase())
      )
    );
  });

  useEffect(() => {
    dispatch(AppDetailsByCI_Get_Request());
  }, []);
  const { jobDetaildata } = useSelector((state) => state?.Application);

  const isApplied = (companyId) => {
    return jobDetaildata.some(
      (application) => application?.companyId === companyId
    );
  };
  const currentItems = filteredJob.slice(first, first + rows);

  const AppDetailsModal = (data) => {
    setSelectedData(data);
    const AppDetails = jobDetaildata?.find((job) => job?.companyId === data.id);
    setFetchData(AppDetails);
    if (AppDetails) {
      setAppDetailsModal(true);
    }
  };
  const handleAddJob = () => {
    navigate("/addjob");
  };

  return (
    <div className="container-fluid pt-3 px-3">
      <div className="content">
        <h4 className="ms-4 text-primary mb-0 ">JOB APPLICATION SYSTEM</h4>
        <div
          className="row align-items-center my-3"
          style={{ paddingRight: "20px", paddingLeft: "20px" }}
        >
          <div className="col-4 pe-0">
            <button
              type="button"
              className="btn btn-success float-right"
              onClick={handleAddJob}
            >
              Add Job
            </button>
          </div>
          <div className="col-8 ps-0">
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
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((job) => (
              <Card className="job" key={job.id}>
                <div className="row" style={{ justifyContent: "between" }}>
                  <div className="col-8">
                    <div className="d-flex">
                      <h4
                        className="title"
                        role="link"
                        onClick={() => handleJobModalOpen(job)}
                      >
                        {job.jobTitle}
                      </h4>
                      {isApplied(job.id) && (
                        <div onClick={() => AppDetailsModal(job)}>
                          <Tag
                            style={{
                              background: "green",
                              color: "white",
                              cursor: "pointer",
                            }}
                            className="px-1 py-1 mx-2"
                            value="Applied"
                          ></Tag>
                        </div>
                      )}
                    </div>
                    <h6>{job.companyName}</h6>
                  </div>
                  <div className="col-4 align-self-center">
                    <Button
                      label="Apply for Job"
                      className="float-end p-2"
                      style={{ borderRadius: "7px" }}
                      onClick={() => handleFormOpen(job)}
                      disabled={isApplied(job.id)}
                    />
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p>No Data Found</p>
          )}
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
      <ApplicationDetails
        visible={appDetailsModal}
        setVisible={setAppDetailsModal}
        data={FetchData}
        company={selectedData}
      />
    </div>
  );
}

export default JobList;
