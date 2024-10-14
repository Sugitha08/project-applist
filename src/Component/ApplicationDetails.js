import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "react-quill/dist/quill.snow.css";
import { FaDownload } from "react-icons/fa6";
import html2pdf from "html2pdf.js";
import { Tag } from "primereact/tag";

function ApplicationDetails({ visible, setVisible, data, company }) {
  const [visiblepdf, setVisiblepdf] = useState(false);
  const pdfContentRef = useRef(); // Ref for the component to be rendered into PDF

  const handleClose = () => {
    setVisible(false);
    setVisiblepdf(false)

  };

  // Function to generate the PDF
  const generatePDF = () => {
    setVisiblepdf(true)
    const element = pdfContentRef.current;

    const opt = {
      margin: 1,
      filename: "Application.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(element).set(opt).save();
  };
  return (
    <>
      <Modal show={visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <img
            src={company?.logo}
            alt="logo"
            style={{ fontSize: "10px", borderRadius: "50%", width: "45px" }}
          />
          <div className="ms-2">
            <h4 className="mb-0 ">{company?.companyName}</h4>
            <div>{company?.jobTitle}</div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="form d-flex">
            <h5 className="mb-1">Application Form</h5>
            <div className="ms-auto" role="button" onClick={generatePDF}>
              <FaDownload />
            </div>
          </div>
          <div>
            <div className="details">
              <div className="my-2">
                <label for="FirstName" className="form-label">
                  First Name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                {data?.FirstName}
              </div>
              <div className="my-2">
                <label for="lname" className="form-label">
                  Last Name&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                {data?.LastName}
              </div>
              <div className="my-2">
                <label for="email" className="form-label">
                  Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  :&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                {data?.email}
              </div>
              <div className="my-2">
                <label htmlFor="skills" className="form-label">
                  Skills
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                </label>
                {data?.selectedSkills?.map((skill) => (
                  <Tag
                    key={skill.id}
                    style={{ background: "#f4f4f4", color: "#545454" }}
                    className="px-2 py-1 mx-1 my-1"
                    value={skill.value}
                  ></Tag>
                ))}
              </div>
              <div className="my-2 d-flex">
                <label for="skills" className="form-label">
                  About Me&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  &nbsp;&nbsp;
                </label>
                <span dangerouslySetInnerHTML={{ __html: data?.details }} />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {visiblepdf && (
        <div ref={pdfContentRef}>
          <div className="container">
            <div className="d-flex mb-3 justify-content-center">
              <img
                src={company?.logo}
                alt="logo"
                style={{ fontSize: "10px", borderRadius: "50%", width: "45px" }}
              />
              <div className="ms-2">
                <h4 className="mb-0 ">{company?.companyName}</h4>
                <div>{company?.jobTitle}</div>
              </div>
            </div>
            <div className="form mx-auto">
              <h5 className="mb-3 text-center">Application Form</h5>
              <div className="details mt-3" style={{ marginLeft: "200px" }}>
                <div className="my-2">
                  <label for="FirstName" className="form-label">
                    First Name&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                  {data?.FirstName}
                </div>
                <div className="my-2">
                  <label for="lname" className="form-label">
                    Last Name&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                  {data?.LastName}
                </div>
                <div className="my-2">
                  <label for="email" className="form-label">
                    Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    :&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                  {data?.email}
                </div>
                <div className="my-2 d-flex">
                  <label htmlFor="skills" className="form-label">
                    Skills
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                  </label>
                  <div className="d-flex">
                    {data?.selectedSkills?.map((skill) => (
                      <span
                        style={{ background: "#f4f4f4", color: "#545454" }}
                        className="px-2 py-1 mx-1"
                      >
                        {skill.value}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="my-2  d-flex">
                  <label for="skills" className="form-label">
                    About Me&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;
                  </label>
                  <div dangerouslySetInnerHTML={{ __html: data?.details }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ApplicationDetails;
