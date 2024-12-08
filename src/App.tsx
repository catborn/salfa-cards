import "./App.css"; //стили
import Card from "./components/Card"; // компонент

import { useEffect, useState } from "react"; //хуки реакт
// import { useDispatch, useSelector } from "react-redux"; //хуки redax
import {
  setCards,
  toggleLike,
  deleteCard,
  toggleFilter,
} from "./store/slices/cardsSlice"; //импорт действия управления состоянием карточек
import { useAppDispatch, useAppSelector, RootState } from "./store/store"; // типы для Redux store

// Интерфейс для карточки собаки
interface DogCard {
  id: number;
  imageUrl: string;
  isLiked: boolean;
}

function App() {
  const dispatch = useAppDispatch(); // типизированная функция отправки действий в Redux Store
  const { items, filterActive } = useAppSelector(
    (state: RootState) => state.cards
  ); // типизированное извлечение значений из стора
  // Добавляем лоадер
  const [isLoading, setIsLoading] = useState<boolean>(true); //типизированный статус загрузки данных

  useEffect(() => {
    const fetchDogs = async () => {
      setIsLoading(true);
      try {
        // Получаем список случайных собак
        const response = await fetch(
          "https://dog.ceo/api/breeds/image/random/21"
        );
        const data: { message: string[] } = await response.json(); // типизация ответа API

        // Преобразуем массив URL в массив объектов с нужными свойствами
        const dogsWithMetadata: DogCard[] = data.message.map((url, index) => ({
          id: index,
          imageUrl: url,
          isLiked: false,
        }));

        dispatch(setCards(dogsWithMetadata));
      } catch (error) {
        console.error("Error fetching dogs:", error);
      } finally {
        //Loading false после загрузки
        setIsLoading(false);
      }
    };

    fetchDogs();
  }, [dispatch]);

  // Фильтр
  const displayedCards = filterActive
    ? items.filter((card: DogCard) => card.isLiked)
    : items;

  return (
    <div className="App">
      <button
        className="filter-button"
        onClick={() => dispatch(toggleFilter())}
      >
        {filterActive ? "Show All" : "Show Liked"}
      </button>
      {/* Визуализируем загрузку */}
      {isLoading ? (
        <div className="loader">Loading dogs...</div>
      ) : (
        <div className="cards-grid">
          {displayedCards.map((card: DogCard) => (
            <Card
              key={card.id}
              id={card.id}
              imageUrl={card.imageUrl}
              isLiked={card.isLiked}
              onLike={(id: number) => dispatch(toggleLike(id))} //типизированная отправка действий в стор
              onDelete={(id: number) => dispatch(deleteCard(id))} //типизированная отправка действий в стор
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default App;
