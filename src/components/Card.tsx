import React from "react";
import styles from "./Card.module.css";

// Интерфейс для пропсов компонента Card
interface CardProps {
  id: number;
  imageUrl: string;
  isLiked: boolean;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
}

// Пропсы: id, url картинки, флаг реакции, функции лайк и удалить карточку. Отрисовка компонента
const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  isLiked,
  onLike,
  onDelete,
}) => {
  return (
    <div className={styles.card}>
      <img
        src={imageUrl}
        alt="Dog"
        // style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />
      <div className="card-buttons">
        <button onClick={() => onLike(id)}>{isLiked ? "❤️" : "🖤"}</button>
        <button onClick={() => onDelete(id)}>❌</button>
      </div>
    </div>
  );
};
export default Card;
