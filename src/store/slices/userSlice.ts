import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api_configs } from '../../config/system_config';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { RootState } from '../root';
import { User } from '../../services/Interfaces';


interface InitialState {
    user: User | null | undefined;
    isAuth: boolean
  
  }
  
  const initialState: InitialState = {
    user: null,
    isAuth: false
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
        text2: `Usuario no encontrado`,
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
  },
  extraReducers: (builder) => {
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
    });
    builder.addCase(fetchUserByEmail.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

export const { setSessionTokens } = userSlice.actions;
export const selectUser= (state: RootState) => state.user.user;
export const selectAuth= (state: RootState) => state.user.isAuth;

export default userSlice.reducer;
