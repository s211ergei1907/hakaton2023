import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";

export const Card = ({ name, description, id, discipline, setDiscipline }) => {
  const navigate = useNavigate();

  const disciplineDelete = (id) => {
    try {
      console.log(id);
      axios
        .delete(`disciplines/${id}`)
        .then(
          setDiscipline((prev) =>
            prev.filter((item) => Number(item.id) !== Number(discipline.id)),
          ),
        );
    } catch (error) {
      console.log("Ебаный рот, дисциплину не получилось удалить", error);
    }

    // запрос на удаление
    ///tasks/{taskId}
  };
  return (
    <div className={styles.card_wrap}>
      <div
        onClick={() => {
          // вернуть потом, не удалять!!!
          // console.log("Перейти на страницу");
          // navigate(`/discipline/${id}`);
        }}
        className={styles.card}
      >
        <div
          onClick={() => disciplineDelete(id)}
          className={styles.closeModal}
        ></div>

        <p>{name}</p>
      </div>
    </div>
  );
};
