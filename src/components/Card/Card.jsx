import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../axios";
import { logDOM } from "@testing-library/react";
import { Tests } from "../../pages/Test/Tests";
import redact from "../../assets/img/redact.png";
import { Update } from "../Update/Update";

export const Card = ({ name, id, discipline, setDiscipline }) => {
  const navigate = useNavigate();
  const title_name = "disciplines";
  const disciplineDelete = (id) => {
    try {
      axiosInstance
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
            navigate(`/update/${title_name}/${name}/${id}`);
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

        <p>{name}</p>
      </div>
    </div>
  );
};
