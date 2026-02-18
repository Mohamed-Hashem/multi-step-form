import { configureStore } from "@reduxjs/toolkit";
import buttonStepsReducer from "../features/steps/stepSlice";

export const store = configureStore({
  reducer: {
    Steps: buttonStepsReducer,
  },
});

export type StoreStates = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
