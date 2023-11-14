import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { logDOM } from "@testing-library/react";
import { Tests } from "../../pages/Test/Tests";
import redact from "../../assets/img/redact.png";

export const Card = ({ name, id, discipline, setDiscipline }) => {
  const navigate = useNavigate();

  const disciplineUpdate = async (id, event) => {
    try {
      const res = await axios.patch(`disciplines/${id}`, { id: 1 });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const disciplineDelete = (id) => {
    try {
      axios
        .delete(`disciplines/${id}`)
        .then(
          setDiscipline((prev) =>
            prev.filter((item) => Number(item.id) !== Number(discipline.id)),
          ),
        );
    } catch (error) {
      console.log("дисциплину не получилось удалить", error);
    }
  };
  return (
    <div className={styles.card_wrap}>
      <div
        onClick={() => {
          navigate(`/tests/${name}`);
        }}
        className={styles.card}
      >
        <div
          onClick={(event) => {
            event.stopPropagation();
            disciplineUpdate(id, event);
          }}
          className={styles.redact_wrap}
        >
          <img src={redact} />
        </div>

        <div
          onClick={(event) => {
            event.stopPropagation();
            disciplineDelete(id);
          }}
          className={styles.closeModal}
        ></div>

        <p
          onClick={(event) => {
            event.stopPropagation();
            disciplineUpdate(id, event);
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );
};
