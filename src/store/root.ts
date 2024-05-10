import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";


import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";


import { api } from "./api/api";

import { configReducer } from "./slices/configSlice";
import cartSlice from "./slices/cartSlice";
import sessionSlice from "./slices/sessionSlice";
import systemSlice from "./slices/systemSlice";
import userSlice from "./slices/userSlice";



const persistConfig = {
  key: "root",
  storage: AsyncStorage,

  whitelist: ["config","cart",  "system"],
};

const rootReducer = combineReducers({
  config: configReducer,
   cart: cartSlice,
   system: systemSlice,
   user: userSlice,
  [api.reducerPath]: api.reducer,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([api.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
