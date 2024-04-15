import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:6001",
    withCredentials: true
})

export default instance