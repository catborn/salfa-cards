import "./App.css";
import Card from "./components/Card";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCards,
  toggleLike,
  deleteCard,
  toggleFilter,
} from "./store/slices/cardsSlice.js";

function App() {
  const dispatch = useDispatch();
  const { items, filterActive } = useSelector((state) => state.cards);
  // Добавляем лоадер
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDogs = async () => {
      setIsLoading(true);
      try {
        // Получаем список из 20 случайных собак
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
