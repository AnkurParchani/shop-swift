// Global request for axios (baseURL)
import axios from "axios";

// Getting the auth cookie
let token;
if (typeof document !== "undefined") {
  token = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("token"))
    ?.split("=")[1];
}

// Appending the cookie in every request
const newRequest = axios.create({
  withCredentials: true,
  baseURL: "https://shop-swift-r0ci.onrender.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token || ""}`,
  },
});

export default newRequest;
