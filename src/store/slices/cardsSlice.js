import { createSlice } from "@reduxjs/toolkit";

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    items: [], // массив карточек
    filterActive: false, // состояние фильтра
  },
  reducers: {
    // Добавить карточки в store
    setCards: (state, action) => {
      state.items = action.payload;
    },
    // Переключить лайк
    toggleLike: (state, action) => {
      const card = state.items.find((card) => card.id === action.payload);
      if (card) {
        card.isLiked = !card.isLiked;
      }
    },
    // Удалить карточку
    deleteCard: (state, action) => {
      state.items = state.items.filter((card) => card.id !== action.payload);
    },
    // Переключить фильтр
    toggleFilter: (state) => {
      state.filterActive = !state.filterActive;
    },
  },
});

// Экспортируем actions
export const { setCards, toggleLike, deleteCard, toggleFilter } =
  cardsSlice.actions;

// Экспортируем reducer
export default cardsSlice.reducer;
