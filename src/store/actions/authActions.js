import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAdmin = createAsyncThunk(
  "auth/login",
  async ({ adminEmail, adminPassword }) => {
    const response = await axios.post(`${process.env.HTTPS_ENDPOINT}/login`, {
      email: adminEmail,
      password: adminPassword,
    });

    const { _id, email, token } = response.data;

    localStorage.setItem(
      process.env.LOCAL_STORAGE_KEYS,
      JSON.stringify({
        _id,
        email,
      }),
    );

    localStorage.setItem("id-token", token);

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    return response.data;
  },
);
