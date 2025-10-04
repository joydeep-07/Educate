// src/redux/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Safely parse JSON from localStorage
const safeJSONParse = (item) => {
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

// Initial state: load admin from localStorage if available
const initialState = {
  admin: safeJSONParse(localStorage.getItem("admin")),
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      // Clear any regular user session
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Save admin to state and localStorage
      state.admin = action.payload;
      localStorage.setItem("admin", JSON.stringify(action.payload));

      toast.success("Admin login successful");
    },
    logoutAdmin: (state) => {
      // Clear admin state and localStorage
      state.admin = null;
      localStorage.removeItem("admin");

      toast.success("Admin logout successful");
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
