// src/redux/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const safeJSONParse = (item) => {
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

const initialState = {
  admin: safeJSONParse(localStorage.getItem("admin")),
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      // Clear any user session
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      state.admin = action.payload;
      localStorage.setItem("admin", JSON.stringify(action.payload));

      toast.success("Admin login successful");
    },
    logoutAdmin: (state) => {
      state.admin = null;
      localStorage.removeItem("admin");
      toast.success("Admin logout successful");
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
