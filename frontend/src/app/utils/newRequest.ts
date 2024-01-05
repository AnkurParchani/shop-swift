// Global request for axios (baseURL)
import axios from "axios";

const newRequest = axios.create({
  withCredentials: true,
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default newRequest;
