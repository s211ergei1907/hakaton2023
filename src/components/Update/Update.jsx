import React, { useContext, useState } from "react";
import styles from "../NewDiscipline/NewDiscipline.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
export function Update() {
  const { name, id } = useParams();
  const [state, setState] = useState({ name: "" });

  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios
        .patch(`disciplines/${id}`, state)
        .then((response) => navigate("/discipline"));
    } catch (error) {
      console.error("Error patching resource:", error.message);
    }
  };

  return (
    <div className={styles.newDiscipline__wrap}>
      <div className={styles.newDiscipline}>
        <form onSubmit={handleSubmit}>
          <input
            type="discipline"
            onChange={handleInput}
            name="name"
            value={state.name}
            defaultValue={name}
          />

          <button>Обновить</button>
        </form>
      </div>
    </div>
  );
}
