import { createSlice } from "@reduxjs/toolkit";

import { User } from "../../services/Interfaces";
import { authApi } from "../api/authApi";
import { RootState } from "../root";
import { closeSession, refreshSession } from "./systemSlice";



interface InitialState {
  user: User | null;
  isAuth: boolean;

}

const initialState: InitialState = {
  user: null,
  isAuth: false,
  
};

const slice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
  
      closeTokens: (state, { payload }) => {
        state.user = null;
        state.isAuth = false;
       // console.log(state.sessionTokens);
      },
      setUser: (state, { payload }:any) => {
        state.user = payload;
       // state.isAuth = false;
       // console.log(state.sessionTokens);
      },
      setAuth: (state, { payload }:any) => {
        state.isAuth = payload;
       // state.isAuth = false;
       // console.log(state.sessionTokens);
      },
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(closeSession, () => initialState)
      .addCase(refreshSession, (state) => {
      
        
        state.isAuth = true;
      })
      .addMatcher(
        authApi.endpoints.getMyUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
          
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.isAuth = payload;
        }
      )
  },
});

export default slice.reducer;
export const selectUser= (state: RootState) => state.session.user;
export const { closeTokens,setUser, setAuth } = slice.actions;

