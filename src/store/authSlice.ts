import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";

// Define the signup form data type
interface SignupFormValues {
  username: string;
  email: string;
  password: string;
}

// Async thunk for signing up a user
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData: SignupFormValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://django-dev.aakscience.com/signup",
        userData
      );
      return response.data; // Return response on success
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);

// Initial state
const initialState = {
  loading: false,
  success: false,
  error: null as string | null,
};

// Auth slice to handle state changes
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;