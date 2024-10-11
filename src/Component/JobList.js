import React, { useState } from "react";
import "./JobList.css";
import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Button } from "primereact/button";
import { data } from "./Data";
import JobModal from "./JobModal";
import FormModal from "./FormModal";

function JobList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const handleJobModalOpen = (data) => {
    setSelectedData(data);
    setModalVisible(true);
  };
  const handleFormOpen = (data) => {
    setSelectedData(data);
    setFormOpen(true);
  };
  return (
    <div className="container-fluid p-4">
      <h3 className="text-center text-primary">JOB APPLICATION SYSTEM</h3>
      <div className="joblist mt-2">
        {data &&
          data.map((job) => (
            <Card className="job">
              <div className="row" style={{ justifyContent: "between" }}>
                <div className="col-8">
                  <h4
                    className="title"
                    role="link"
                    onClick={() => handleJobModalOpen(job)}
                  >
                    {job.jobTitle}
                  </h4>
                  <h6>{job.companyName}</h6>
                </div>
                <div className="col-4 align-self-center">
                  <Button
                    label="Apply for Job"
                    className="float-end p-2"
                    style={{ borderRadius: "7px" }}
                    onClick={() => handleFormOpen(job)}
                  />
                </div>
              </div>
            </Card>
          ))}
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
      />
    </div>
  );
}

export default JobList;
