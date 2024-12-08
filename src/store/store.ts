import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./slices/cardsSlice"; //импорт редуктора
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"; //типизированные хуки
// создание хранилища функцией CongigureStore
export const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});
// состояние приложения хранится в объекте CongigureStore с ключом cards
// управление состоянием через редуктор cardReducer

// Типы для TypeScript
// RootState - тип всего состояния приложения, получаемый из store
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch - тип для dispatch функции
export type AppDispatch = typeof store.dispatch;

// Добавляем типизированные хуки

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
