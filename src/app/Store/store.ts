import { configureStore } from "@reduxjs/toolkit";
import { oguzform } from "../Apis/api";

export const store = configureStore({
  reducer: {
    [oguzform.reducerPath]: oguzform.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(oguzform.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
