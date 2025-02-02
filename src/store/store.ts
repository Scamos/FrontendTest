import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Import the auth slice

export const store = configureStore({
  reducer: {
    auth: authReducer, // Register auth slice in Redux store
  },
});

// Define TypeScript types for store dispatch & state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;