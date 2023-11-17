import React, { useEffect, useState } from "react";
import styles from "./Discipline.module.scss";
import { Card } from "../../components/Card/Card";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";

import { Link } from "react-router-dom";
import { Update } from "../../components/Update/Update";
export const Disciplne = () => {
  const [discipline, setDiscipline] = useState([{}]);

  const navigate = useNavigate();

  const fetchDiscipline = async () => {
    const { data } = await axios.get("disciplines");
    setDiscipline(data);
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
            />
          ))}
        </div>
      </div>
    </>
  );
};
