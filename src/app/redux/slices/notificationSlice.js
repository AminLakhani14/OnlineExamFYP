import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios.js";

const mapNotification = (n) => ({
  id: n.id,
  heading: n.title,
  title: n.message,
  subtitle: n.type,
  timestamp: n.createdAt,
  path: n.link || "dashboard/default",
  icon: {
    name: n.type === "ExamResult" ? "assignment" : "notifications",
    color: n.type === "ExamResult" ? "primary" : "secondary",
  },
});

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async () => {
    const response = await axios.get("/api/Notifications");
    return response.data.map(mapNotification);
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (id) => {
    await axios.post(`/api/Notifications/${id}/read`);
    return id;
  }
);

export const deleteAllNotifications = createAsyncThunk(
  "notifications/deleteAllNotifications",
  async () => {
    await axios.post("/api/Notifications/read-all");
    return [];
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.fulfilled, (state, action) => action.payload)
      .addCase(deleteNotification.fulfilled, (state, action) => {
        return state.filter((n) => n.id !== action.payload);
      })
      .addCase(deleteAllNotifications.fulfilled, () => []);
  },
});

export default notificationSlice.reducer;
