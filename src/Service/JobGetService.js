import axios from "axios";
import { Environment } from "../Environment/Environment";

export const JobGetService = () => {
  return axios({
    method: "GET",
    url: Environment,
  });
};
