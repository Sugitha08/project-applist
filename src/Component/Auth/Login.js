import React, { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getReq } from "../../Redux/Action/LoginAction";
import { toast } from "react-toastify";

function Login() {
  const { data } = useSelector((state) => state.Register);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReq());
  }, []);

  console.log(data);

  const handleLogin = () => {
    const validate = data.find((data) => data.userName === userName);
    console.log(validate);

    if (validate) {
      if (validate.password === password) {
        toast("login Successfull");
        navigate("/dash");
      }
    }
  };

  return (
    <>
      <div className="bg-home bg-circle-gradiant d-flex align-items-center">
        <div className="bg-overlay bg-overlay-white"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card form-signin p-4 rounded shadow">
                <form>
                  <img
                    src=""
                    alt="image"
                    className="avatar d-block mx-auto mb-4"
                  ></img>
                  <h5 className="mb-3 text-center signin">Sign In</h5>
                  <div className="mb-2">
                    <label htmlFor="username" className="inputlabel">
                      User Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="User Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="password" className="inputlabel">
                      password<span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary mt-3"
                      onClick={handleLogin}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary ms-2 mt-3"
                      onClick={() => navigate("/reg")}
                    >
                      Sign Up
                    </button>
                  </div>
                  {/* <p className="mb-0 text-muted mt-3 text-center tech mx-0">
                    &copy;&nbsp; Ebrain Technologies.
                  </p> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
