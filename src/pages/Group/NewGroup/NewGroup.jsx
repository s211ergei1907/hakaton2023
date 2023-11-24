import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./NewGroup.module.scss";
import { axiosInstance } from "../../../axios";

function NewGroup() {
  const [group, setGroup] = useState({ name: "" });

  const navigate = useNavigate();
  const handleInput = (event) => {
    setGroup({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post("groups", { ...group })
      .then((response) => navigate("/groups"))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.newgroup__wrap}>
      <div className={styles.newgroup}>
        <form onSubmit={handleSubmit}>
          <input
            style={{ width: "500px", marginRight: "30px" }}
            type="group"
            placeholder={"Добавьте новую группу"}
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

export default NewGroup;
