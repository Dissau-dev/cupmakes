import { createAction, createSlice } from "@reduxjs/toolkit";
import { AuthToken, User } from "../../services/Interfaces";
import { authApi } from "../api/authApi";
import { RootState } from "../root";

interface InitialState {
  sessionTokens: User | null | undefined;
  isAuth: boolean

}

const initialState: InitialState = {
  sessionTokens: null,
  isAuth: false
};

export const closeSession = createAction("closeSession");
export const refreshSession = createAction<AuthToken>("refreshSession");

const slice = createSlice({
  name: "system",
  initialState: initialState,
  reducers: {
    setSessionTokens: (state, { payload }) => {
      state.sessionTokens = payload;
    
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(closeSession, () => initialState)
     
     .addMatcher(
     authApi.endpoints.getUserByEmail.matchFulfilled,
        (state, { payload }: any) => {
          if(payload.lenght === 0) {
            state.sessionTokens = null;
            state.isAuth = false
          }
         else{
          state.sessionTokens = payload;
          state.isAuth = true
          console.log('payload'+ payload)
         }
       }
    );
  },
});

export const { setSessionTokens } = slice.actions;


export default slice.reducer;
