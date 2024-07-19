import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api_configs } from '../../config/system_config';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { RootState } from '../root';
import { User } from '../../services/Interfaces';
import { authApi } from '../api/authApi';


interface InitialState {
    user: User | null | undefined;
    isAuth: boolean
    status: "fullfiled" | "loading" | "rejected" | "idle"
  }
  
  const initialState: InitialState = {
    user: null,
    isAuth: false,
    status: "idle"
  };
  


let baseUrl = api_configs.BASE_URL;
const consumerKey = "ck_fd5c542c02aa26ba0073ab69b91b78585e72ca05";
const consumerSecret = "cs_48662918ad66d95f32f6e2ae55417a63c44fdbd6";

const base64 = require("base-64");
export const fetchUserByEmail = createAsyncThunk(
  'user/fetchByEmail',
  async (email) => {
    const response = await axios.get(`${baseUrl}/customers?email=${email}`,{

        headers:  {Authorization:   "Basic " + base64.encode(consumerKey + ":" + consumerSecret)}
    });

    if (response.data.length === 0) {
    // throw new Error('Error, usuario no encontrado');
     return (
     Toast.show({
        type: "error",
        text1: "Error",
        text2: `User not found`,
      })
    )
    }
    return response.data[0]
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSessionTokens: (state, action) => {
      state.isAuth = true;
    },
    regisyterUser: (state, action) => {
      state.isAuth = true;
      state.user = action.payload
    },
    updateUser: (state, action) => {
      const newUser = action.payload;
      const {  first_name,
        last_name,
        email} = newUser;
      state.user.first_name = first_name;
      state.user.last_name = last_name;
      state.user.email = email;
      state.isAuth = true;
    },
    logOut: (state) => {
      state.isAuth = false;
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserByEmail.pending, (state, action) => {
    state.status = "loading"
    })
    builder.addCase(fetchUserByEmail.fulfilled, (state, action) => {
        console.log('este es el payload :' +action.payload)
        if(action.payload.lenght === 0) {
            state.user = null;
            state.isAuth = false
          }
         else{
          state.user = action.payload;
          state.isAuth = true
          console.log('payload'+ action.payload)
         }
         state.status = "fullfiled";
    });
    builder.addCase(fetchUserByEmail.rejected, (state, action) => {
      console.error(action.error.message);
      state.status = "rejected";
    })
 
  },
});

export const { setSessionTokens ,updateUser, regisyterUser, logOut} = userSlice.actions;
export const selectUser= (state: RootState) => state.user.user;
export const selectAuth= (state: RootState) => state.user.isAuth;
export const selectStatus= (state: RootState) => state.user.status;
export default userSlice.reducer;
