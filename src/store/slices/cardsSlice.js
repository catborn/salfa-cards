import { createSlice } from "@reduxjs/toolkit";
// Функция createSlice созд объект slice, кот содержит имя (name), начальное состояние (initialState) и набор редукторов (reducers)
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

// Экспортируем actions, действия
export const { setCards, toggleLike, deleteCard, toggleFilter } =
  cardsSlice.actions;

// Экспортируем reducer, редукторы
export default cardsSlice.reducer;

// имя среза cards, items - пустой массив - список карточек, filterActive - состояние фильтра
// редукторы определяют: setCards - уст новый массив карточек в состоянии, toggleLike - находит карточку по id и перекл ей свойство isLiked
// deleteCard - удал карточку с указ id из массива, toggleFilter - перекл сост фильтра между true и false
