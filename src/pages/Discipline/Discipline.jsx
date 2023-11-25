import React, { useEffect, useState } from "react";
import styles from "./Discipline.module.scss";
import { Card } from "../../components/Card/Card";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../axios";

export const Discipline = () => {
  const [discipline, setDiscipline] = useState([{}]);

  const navigate = useNavigate();

  const fetchDiscipline = async () => {
    const { data } = await axiosInstance.get("disciplines");
    setDiscipline(data);
  };
  const disciplineDelete = async (id) => {
    try {
      await axiosInstance.delete(`disciplines/${id}`);
      await fetchDiscipline();
    } catch (error) {
      console.log("дисциплину не получилось удалить", error);
    }
  };
  useEffect(() => {
    fetchDiscipline();
  }, []);

  return (
    <>
      <div className={styles.discipline_wrap}>
        <button
          onClick={() => navigate(`/new_discipline/${discipline.id}`)}
          type="submit"
        >
          Создать новую дисциплину
        </button>

        <div className={styles.discipline}>
          {discipline.map(({ name, id }, index) => (
            <Card
              fetchDiscipline={fetchDiscipline}
              key={index}
              name={name}
              id={id}
              discipline={discipline}
              setDiscipline={setDiscipline}
              deleteDiscipline={disciplineDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};
