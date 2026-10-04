import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    // users: usersReducer,
    // lostFounds: lostFoundsReducer,
  },
});

export default store;
