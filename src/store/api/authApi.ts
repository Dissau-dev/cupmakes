//import crashlytics from "@react-native-firebase/crashlytics";
import { api } from "./api";

import {
  AuthToken,User,
} from "../../services/Interfaces";
//import crashlytics from "@react-native-firebase/crashlytics";
import {
  LoginArgs,  
} from "../intefaces";
import { useAppDispatch, useAppSelector } from '../hooks';
import { setAuth, setUser } from "../slices/sessionSlice";

interface LoadInitialData {
  User : User 
}




export const authApi = api.injectEndpoints({
  endpoints(build) {

    return {
      getUserByEmail: build.query({
        //@ts-ignore
        query: (email) => ({
          url: `/customers?email=${email}`,
          method: 'GET'
        }),
        transformResponse: (response: any) => {
        
          if (response.length === 0) {
            console.log('Usuario no encontrado');
            return [];
          } else {
            console.log(`ID de usuario: ${response[0].id}`);
           
            return response;
          }
        },
      }),

  
   
   
      getMyUser: build.query<User,void>({
        query: () => ({
          url: `/user/myuser`,
          method: "GET",
        }),
        providesTags: ["User"],
      }),
 
      refreshToken: build.mutation({
        query: (token) => ({
          url: `/user/refreshToken`,
          data: { refresh_token: token },
          method: "POST",
        
        }),
        
        invalidatesTags: ["Session"],
        
      }),
      loadInitialData: build.query<LoadInitialData, void>({
        //@ts-ignore
        async queryFn(arg, api, extraOptions, baseQuery) {
          return await Promise.all([
            baseQuery({
              url: `/user/myuser`,
              method: "GET",
            }),
          ])
            .then((res) => {
              return {
                data: {
                  user: res[0]?.data as User,
                },
              };
            })
            .catch((err) => ({ error: err }));
          
        },
        providesTags: ["Session"],
      }),
     
    /*   uploadImage: build.mutation<Array<Image>, any>({
        query: (data) => ({
          url: `/file/user`,
          data: data,
          method: "POST",
        }),
        invalidatesTags: ["User"],
      }),*/
    
    };
  },
  overrideExisting: true,
});

export const {
  
  useGetMyUserQuery,
  

  useRefreshTokenMutation,
 
 useLazyLoadInitialDataQuery,

 useGetUserByEmailQuery
 // useUploadImageMutation
} = authApi;
