import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/states/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // users: usersReducer,
    // lostFounds: lostFoundsReducer,
  },
});

export default store;
