import axios from "axios";
import { Environment } from "../Environment/Environment";

export const JobGetService = () => {
  return axios({
    method: "GET",
    url: Environment + "Jobs",
  });
};

export const JobPostService = (request) => {
  return axios({
    method: "POST",
    url: Environment + "Jobs",
    data: request,
  });
};

export const JobDeleteService = (request) => {
  return axios({
    method: "DELETE",
    url: Environment + "Jobs/" + request,
  });
};

export const ApplicationPostService = (request) => {
  return axios({
    method: "POST",
    url: Environment + "ApplicationDetails",
    data: request,
  });
};

export const AppDetailsService = () => {
  return axios({
    method: "GET",
    url: Environment + "ApplicationDetails",
  });
};

export const RegisterService = (data) => {
  return axios({
    method: "POST",
    url:Environment +"RegDetails",
    data: data,
  });
};
export const GetRegisterService = () => {
  return axios({
    method: "GET",
    url:Environment +"RegDetails",
  });
};