import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Интерфейсы для типизации
interface Card {
  id: number;
  imageUrl: string;
  isLiked: boolean;
}

interface CardsState {
  items: Card[];
  filterActive: boolean;
}

// Начальное состояние с типизацией
const initialState: CardsState = {
  items: [], // массив карточек
  filterActive: false, // состояние фильтра
};

// Функция createSlice созд объект slice, кот содержит имя (name), начальное состояние (initialState) и набор редукторов (reducers)
const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    // Добавить карточки в store
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.items = action.payload;
    },
    // Переключить лайк
    toggleLike: (state, action: PayloadAction<number>) => {
      const card = state.items.find((card) => card.id === action.payload);
      if (card) {
        card.isLiked = !card.isLiked;
      }
    },
    // Удалить карточку
    deleteCard: (state, action: PayloadAction<number>) => {
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

// Экспорт типов для использования в других файлахexport type { Card, CardsState };
