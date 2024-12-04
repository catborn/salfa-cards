import "./App.css"; //стили
import Card from "./components/Card"; // компонент

import { useEffect, useState } from "react";  //хуки реакт
import { useDispatch, useSelector } from "react-redux"; //хуки redax
import {
  setCards,
  toggleLike,
  deleteCard,
  toggleFilter,
} from "./store/slices/cardsSlice.js"; //импорт действия управления состоянием карточек

function App() {
  const dispatch = useDispatch(); // функция отправки действий в Redux Store
  const { items, filterActive } = useSelector((state) => state.cards); // извлечение значений из стора useSelector'ом
  // Добавляем лоадер
  const [isLoading, setIsLoading] = useState(true); //статус загрузки данных

  useEffect(() => {
    const fetchDogs = async () => {
      setIsLoading(true);
      try {
        // Получаем список случайных собак
        const response = await fetch(
          "https://dog.ceo/api/breeds/image/random/21"
        );
        const data = await response.json();

        // Преобразуем массив URL в массив объектов с нужными свойствами
        const dogsWithMetadata = data.message.map((url, index) => ({
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
    ? items.filter((card) => card.isLiked)
    : items;

  return (
    <div className="App">
      <button
        className="filter-button"
        onClick={() => dispatch(toggleFilter())}
      >
        {filterActive ? "Show All" : "Show Liked"}
      </button>
      {/* Добавляем загрузку */}
      {isLoading ? (
        <div className="loader">Loading dogs...</div>
      ) : (
        <div className="cards-grid">
          {displayedCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              imageUrl={card.imageUrl}
              isLiked={card.isLiked}
              onLike={(id) => dispatch(toggleLike(id))}
              onDelete={(id) => dispatch(deleteCard(id))}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
