import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./slices/cardsSlice.js";

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});
