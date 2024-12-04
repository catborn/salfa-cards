import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./slices/cardsSlice.js"; //импорт редуктора
// создание хранилища функцией CongigureStore
export const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});
// состояние приложения хранится в объекте CongigureStore с ключом cards
// управление состоянием через редуктор cardReducer
