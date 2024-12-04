import React from "react";
import styles from "./Card.module.css";
// Пропсы: id, url картинки, флаг реакции, функции лайк и удалить карточку. Отрисовка компонента
const Card = ({ id, imageUrl, isLiked, onLike, onDelete }) => {
  return (
    <div className={styles.card}>
      <img
        src={imageUrl}
        alt="Dog"
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />
      <div className="card-buttons">
        <button onClick={() => onLike(id)}>{isLiked ? "❤️" : "🖤"}</button>
        <button onClick={() => onDelete(id)}>❌</button>
      </div>
    </div>
  );
};
export default Card;
