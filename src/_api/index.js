import axios, { Axios } from "axios"

//const url = "https://akmal-bc.karyakreasi.id/api";
const url = "http://localhost:8000";


export const API = axios.create({
  baseURL: `${url}/api`
  
})

export const bookImageStorage = `${url}/storage`;