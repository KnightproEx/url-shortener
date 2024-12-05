import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api/v1",
});

// TODO: Refresh token
// apiClient.interceptors.request.use(async (req) => {
//   return req;
// });

apiClient.interceptors.response.use(
  (response) => response,
  (e) => Promise.reject(e.response.data),
);

export default apiClient;
