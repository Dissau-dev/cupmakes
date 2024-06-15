import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios from "../../services/APIServer";
import { AxiosRequestConfig, AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api_configs } from "../../config/system_config";

type AxiosArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
};

const axiosBaseQuery: BaseQueryFn<AxiosArgs, unknown, unknown> = async ({
  url,
  method,
  data,
  params,
}) => {
  let baseUrl = api_configs.BASE_URL;
  const server = await AsyncStorage.getItem("BASE_SERVER_URL");

  if (server !== null) {
    baseUrl = server;
  }
  try {
    const result = await axios.axiosApiInstance({
      url: `${baseUrl}${url}`,
      method: method || "GET",
      data,
      params,
      // signal: AbortSignal.timeout(5000)
    });
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError as AxiosError;
      
    return {
      error: {
        status: err.response?.status,
        data: (err.response?.data as any).message
      },
    };
  }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  tagTypes: ["User", "Session", "Dispatch", "UNAUTHORIZED", "UNKNOWN_ERROR,Register","Product" , "ORDERS"],
  endpoints: () => ({}),
  keepUnusedDataFor: 30,
});
