import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin } from "../actions/authActions";

const initialState = {
  loading: false,
  _id: "",
  email: "",
  token: "",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loading = false;
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.error = null;
    },

    logout: state => {
      state.loading = false;
      state._id = "";
      state.email = "";
      state.token = "";
      state.error = null;
      localStorage.removeItem("id-token");
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAdmin.pending, state => {
      state.loading = true;
    });
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(loginAdmin.rejected, (state, action) => {
      state.loading = false;
      state._id = "";
      state.email = "";
      state.token = "";
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
