// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper to safely parse localStorage
const safeJSONParse = (item) => {
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

// Initialize state from localStorage
const initialState = {
  user: safeJSONParse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    // Optional: refresh user from localStorage (useful on page reload)
    loadUserFromStorage: (state) => {
      state.user = safeJSONParse(localStorage.getItem("user")) || null;
      state.token = localStorage.getItem("token") || null;
    },
  },
});

export const { loginSuccess, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
