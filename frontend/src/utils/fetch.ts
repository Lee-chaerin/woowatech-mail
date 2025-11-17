import axios, { AxiosError } from "axios";

const apiUrl = "http://localhost:3000/api";

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if(error.response) {
      console.error(error.response)
    } else if(error.request) {
      console.error("서버에 응답받지 못함");
    } else {
      console.error(error.message);
    }

    return Promise.reject(error);
  }
);

export const requestAPI = () => {
  const request = (method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH") => {
    return(url: string, bodyJson?: any) => {
      const requestConfig = {
        url,
        method: method,
        data: bodyJson,
      }

      return axiosInstance(requestConfig)
      .then((response) => response.data);
    }
  }

  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
    patch: request("PATCH"),
  };
};
