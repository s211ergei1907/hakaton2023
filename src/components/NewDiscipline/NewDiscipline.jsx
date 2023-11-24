import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./NewDiscipline.module.scss";
import { axiosInstance } from "../../axios";
import { Link } from "react-router-dom";
import { logDOM } from "@testing-library/react";

function NewDiscipline() {
  const [discipline, setDiscipline] = useState({ name: "" });

  const navigate = useNavigate();
  const handleInput = (event) => {
    setDiscipline({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post("disciplines", { ...discipline })
      .then((response) => navigate("/discipline"))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.newDiscipline__wrap}>
      <div className={styles.newDiscipline}>
        <form onSubmit={handleSubmit}>
          <input
            type="discipline"
            placeholder={"Добавьте новую дисциплину"}
            onChange={handleInput}
            name="name"
          />
          {/*<input type="text" onChange={handleInput} name="title" />*/}
          <button>Добавить дисциплину</button>
        </form>
      </div>
    </div>
  );
}

export default NewDiscipline;
