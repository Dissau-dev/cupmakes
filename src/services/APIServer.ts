import axios, { AxiosResponse } from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { AuthToken } from "./Interfaces";
import { api_configs } from "../config/system_config";
import { closeSession, setSessionTokens } from "../store/slices/systemSlice";

const consumerKey = "ck_fd5c542c02aa26ba0073ab69b91b78585e72ca05";
const consumerSecret = "cs_48662918ad66d95f32f6e2ae55417a63c44fdbd6";

const base64 = require("base-64");

const axiosApiInstance = axios.create();

let store: any;
export const injectStore = (_store: any) => {
  store = _store;
};

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config: any) => {
    config.headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

   
    let base_url = api_configs.BASE_URL;



    const rute =
      config.url?.split(`${base_url}`)[1] ?? "";


  
      config.headers = {
        ...config.headers,
        Authorization:   "Basic " + base64.encode(consumerKey + ":" + consumerSecret),
      };
      
   

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const server = await AsyncStorage.getItem("BASE_SERVER_URL");
    let base_url = api_configs.BASE_URL;

    if (server !== null) {
      base_url = server;
    }
    const originalRequest = error.config;
  
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
     console.log('error 401 od api server')
    
     
      
    }
    return Promise.reject(error);
  }
);

 const get = async (path: string): Promise<AxiosResponse<object>> => {
  const server = await AsyncStorage.getItem("BASE_SERVER_URL");
   let base_url = api_configs.BASE_URL;

   if (server !== null) {
     base_url = server;
   }

  const request = {
    url: `${base_url}${path}`,
    method: "GET",
  };

  return axiosApiInstance.get(request.url);
 };

 const post = async (
  path: string,
   body: object
 ): Promise<AxiosResponse<object>> => {
   const server = await AsyncStorage.getItem("BASE_SERVER_URL");
let base_url = api_configs.BASE_URL;

  if (server !== null) {
    base_url = server;
  }

   const request = {
     url: `${base_url}${path}`,
    method: "POST",
  };

  return axiosApiInstance.post(request.url, body);
};

 const put = async (
  path: string,
  body: object
): Promise<AxiosResponse<object>> => {
  const server = await AsyncStorage.getItem("BASE_SERVER_URL");
  let base_url = api_configs.BASE_URL;

   if (server !== null) {
     base_url = server;
  }

  const request = {
    url: `${base_url}${path}`,
     method: "PUT",
   };

   return axiosApiInstance.put(request.url, body);
 };

const patch = async (
  path: string,
   body: object
 ): Promise<AxiosResponse<object>> => {
   const server = await AsyncStorage.getItem("BASE_SERVER_URL");
   let base_url = api_configs.BASE_URL;

  if (server !== null) {
    base_url = server;
  }

  const request = {
    url: `${base_url}${path}`,
    method: "PATCH",
  };

  return axiosApiInstance.patch(request.url, body);
 };

 const deleteAPI = async (
   path: string,
   body?: object
 ): Promise<AxiosResponse<object>> => {
   const server = await AsyncStorage.getItem("BASE_SERVER_URL");
   let base_url = api_configs.BASE_URL;

  if (server !== null) {
     base_url = server;
   }

  const request = {
    url: `${base_url}${path}`,
    method: "DELETE",
  };

 return axiosApiInstance.delete(request.url, { data: body });
 };

export default {
   get,
   post,
   put,
   patch,
   deleteAPI,
  axiosApiInstance,
};
