import axios from "axios";
const axiosGlobal = axios.create({
  baseURL: "https://reqres.in/",
});

axiosGlobal.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axiosGlobal;
