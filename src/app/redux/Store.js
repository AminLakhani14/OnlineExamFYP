import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slices/notificationSlice";
import navigationReducer from "./slices/navigationSlice";

export const Store = configureStore({
  reducer: {
    notifications: notificationReducer,
    navigations: navigationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "notifications/getNotifications/pending",
          "notifications/getNotifications/fulfilled",
        ],
        ignoredPaths: ["navigations"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});
