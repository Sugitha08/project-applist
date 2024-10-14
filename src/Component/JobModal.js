import React from "react";
import Modal from "react-bootstrap/Modal";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";

function JobModal({ visible, setVisible, data }) {
  const handleClose = () => {
    setVisible(false);
  };
  const handleFormOpen = () => {};
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
        <div className="jobDis">
          <h5 className="mb-0">About the job</h5>
          <div>
            <h6 className="mb-0">
              Experience Required : {data?.experienceRequired}years
            </h6>
          </div>
          <div>
            <h6 className="mb-2">Skills Required : </h6>
            <div className="">
              {data?.skillsRequired?.map((skill) => (
                <div key={skill.id}>
                <Tag
                  style={{ background: "#f4f4f4", color: "#545454" }}
                  className="px-2 py-1 mx-1 my-1"
                  value={skill}
                ></Tag>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h6>Job Description : </h6>
            <p style={{ textIndent: "24px" }}>{data?.jobDescription}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          label="Apply for Job"
          className="float-end p-2"
          onClick={handleFormOpen}
          style={{ borderRadius: "7px", fontFamily: "inter var" }}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default JobModal;
