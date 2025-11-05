import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, username: null, role: null },
  reducers: {
    login: (state, action) => {
      const { token, username, role } = action.payload;
      state.token = token;
      state.username = username;
      state.role = role;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.role = null;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { login, logout, setRole } = authSlice.actions;

export const logoutUser = (dispatch) => {
  document.cookie = document.cookie.replace(/(?<=^|;)\s*token=[^;]*/, ""); // Clear token
  dispatch(logout());
};

export default authSlice.reducer;
