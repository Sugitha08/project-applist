import React, { useDebugValue, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { JobList_Delete_Request } from "../../Redux/Action/JobListAction";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const data = useSelector((state) => state.jobData.JobData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = (Id) => {
    dispatch(JobList_Delete_Request(Id));
  };
  return (
    <div>
      <h2 className="text-primary text-center my-3">AdminPanel</h2>
      <div className="joblist w-50 mx-auto" style={{ padding: "10px" }}>
        {data && data.length > 0 ? (
          data.map((job) => (
            <Card className="job" key={job.id}>
              <div className="row" style={{ justifyContent: "between" }}>
                <div className="col-8">
                  <div className="d-flex">
                    <h4 className="title" role="link">
                      {job.jobTitle}
                    </h4>
                  </div>
                  <h6>{job.companyName}</h6>
                </div>
                <div className="col-4 align-self-center float-end">
                  <Button type="button" className="btn btn-warning mx-2">
                    EDIT
                  </Button>

                  <Button
                    type="button"
                    className="btn-danger mx-2"
                    onClick={() => handleDelete(job.id)}
                  >
                    DELETE
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>No Data Found</p>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
