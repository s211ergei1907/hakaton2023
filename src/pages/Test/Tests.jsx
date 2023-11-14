import React, { useEffect, useState } from "react";
import { findAllByDisplayValue, logDOM } from "@testing-library/react";
import styles from "./Tests.module.scss";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import redact from "../../assets/img/redact.png";

export const Tests = () => {
  const [tests, setTests] = useState([]);
  const { disciplineName } = useParams();

  const fetchTests = async () => {
    const { data } = await axios.get(`tests/${disciplineName}`);
    setTests(data);
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <div className={styles.tests__wrap}>
      <button type="submit" style={{ marginBottom: "30px" }}>
        Создать тест
      </button>
      <div className={styles.tests}>
        <div className={styles.card_wrap}>
          {tests.map(({ testName, id }, index) => (
            <>
              <div
                // onClick={() => {
                //     navigate(`/discipline/${id}`);
                // }}
                className={styles.card}
              >
                <img
                  src={redact}
                  className={styles.redact}
                  alt="редактировать"
                />
                <div
                  onClick={(event) => {
                    // event.stopPropagation();
                    // disciplineDelete(id);
                  }}
                  className={styles.closeModal}
                ></div>

                <p>{testName}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
