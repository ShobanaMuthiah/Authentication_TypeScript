import axios from "axios";

export const api=axios.create({
    baseURL:"https://authentication-typescript.onrender.com",
    withCredentials:true
})