import axios from "axios";
// import { Cookies } from "react-cookie";

const adminUrl = "https://dummyjson.com/";
export const baseURL = adminUrl;
// const cookie = new Cookies();
const axiosInstance = axios
.create({
  baseURL,
});



// axiosInstance.interceptors.request.use(
//   function (config:any) {
//     const token = cookie.get("token");
//     console.log(token, "token"); // Debugging log
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers["x-access-token"] = token;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }

// );
// // export const product_pic = (media:File) => {
// //   return `http://webskitters-student.onrender.com/uploads/${media}`;
// // };
export default axiosInstance;