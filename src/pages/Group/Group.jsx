import React, { useEffect, useState } from "react";
import { findAllByDisplayValue } from "@testing-library/react";
import styles from "./Group.module.scss";
import { axiosInstance } from "../../axios";
import { useNavigate } from "react-router-dom";
import redact from "../../assets/img/redact.png";
export const Group = () => {
  const [groups, setGroups] = useState([]);
  const [stateGroup, setStateGroup] = useState({ name: "" });
  const navigate = useNavigate();

  const title_name = "groups";

  const fetchGroup = async () => {
    const { data } = await axiosInstance.get("/groups");
    setGroups(data);
  };

  const groupDelete = (id) => {
    try {
      axiosInstance
        .delete(`groups/${id}`)
        .then(
          setGroups((prev) =>
            prev.filter((item) => Number(item.id) !== Number(groups.id)),
          ),
        );
    } catch (error) {
      console.log("дисциплину не получилось удалить", error);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, [groups]);

  return (
    <div className={styles.tests__wrap}>
      <div className={styles.tests}>
        <button
          onClick={() => {
            navigate("/new_group");
          }}
          type="submit"
          style={{ marginBottom: "30px" }}
        >
          Создать новую группу
        </button>
        <div className={styles.card_wrap}>
          {groups.map((num, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/groups/${num.name}`);
              }}
              className={styles.card}
              style={{ marginBottom: "10px" }}
            >
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/update/${title_name}/${num.name}/${num.id}`);
                }}
                className={styles.redact_wrap}
              >
                <img src={redact} />
              </div>
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  groupDelete(num.id);
                }}
                className={styles.closeModal}
              ></div>

              <p>{num.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
