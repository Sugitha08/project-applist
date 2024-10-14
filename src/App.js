import "./App.css";
import JobList from "./Component/JobList";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplicationForm from "./Component/ApplicationForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPanel from "./Component/AdminPanel/AdminPanel";
import Appjob from "./Component/AdminPanel/Addjob";
import Register from "./Component/Auth/Register";
import Login from "./Component/Auth/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/dash" element={<JobList />} />
          <Route path="/form" element={<ApplicationForm />} />
          <Route path="/addjob" element={<Appjob />} />
          <Route path="/panel" element={<AdminPanel />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
