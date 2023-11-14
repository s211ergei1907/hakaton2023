import React, { useState } from "react";
import { findAllByDisplayValue } from "@testing-library/react";
import styles from "./Group.module.scss";
export const Group = () => {
  const [groups, setGroups] = useState([1, 2, 3]);

  return (
    <div className={styles.tests__wrap}>
      <div className={styles.tests}>
        <button type="submit" style={{ marginBottom: "30px" }}>
          Создать новую группу
        </button>
        <div className={styles.card_wrap}>
          {groups.map((num, index) => (
            <div
              key={index}
              // onClick={() => {
              //     navigate(`/discipline/${id}`);
              // }}
              className={styles.card}
            >
              <div
                onClick={(event) => {
                  // event.stopPropagation();
                  // disciplineDelete(id);
                }}
                className={styles.closeModal}
              ></div>

              <p>{num}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
