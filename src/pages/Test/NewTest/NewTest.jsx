import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./NewTest.module.scss";
import { axiosInstance } from "../../../axios";

import axios from "axios";

function NewTest({ children }) {
  const [store, setStore] = useState();
  const fetchDiscipline = async () => {
    const { data } = await axios.get(
      "https://653d2abef52310ee6a99f273.mockapi.io/disciplines",
    );
    setStore({ ...data });
    console.log("store: ", store);
  };

  useEffect(() => {
    fetchDiscipline();
  }, []);

  const { disciplineName } = useParams();

  //Создать целый вопрос c ответами, записать это в JSON, после чего очистить поля для возможности создания ещё вопроса
  const onClickCreateQuestionWithAnswers = () => {
    console.log("store", store);
    console.log("isAnswers", isAnswers);
  };

  //Ответы
  const [isAnswers, setIsAnswers] = useState([]);

  const handleChangeCheckboxAnswers = (id, correct) => {
    setIsAnswers((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, correct } : item)),
    );
  };

  const handleChangeInputAnswers = (id, answer) => {
    setIsAnswers((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, answer } : item)),
    );
  };

  // сам Вопрос
  const [isQuestion, setIsQuestion] = useState("");

  const handleQuestionChange = (e) => {
    setIsQuestion(e.target.value);
    store.questions = isQuestion;
  };

  const handleAddQue = () => {
    const store = {
      id: Date.now(),
    };

    setIsAnswers([...isAnswers, store]);
  };

  const handleRemoveQue = (id) => {
    const updatedItems = isAnswers.filter((item) => item.id !== id);
    setIsAnswers(updatedItems);
  };

  const [testName, setTestName] = useState("");
  const [isDisabledInput, setDisabledInput] = useState(false);

  const handleInputNameTest = (event) => {
    setTestName(event.target.value);
  };
  const handleFocus = () => {
    setDisabledInput(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleOnBlurInputTestName = (event) => {
    setDisabledInput(false);
    // store.test.disciplineName = disciplineName;
    // store.test.testName = testName;
    console.log(store);
  };

  return (
    <>
      <div className={styles.newTest__wrap}>
        <div className={styles.newTest}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder={`Название дисциплины: ${disciplineName}`}
              disabled={true}
            />
            <input
              type="text"
              placeholder={"Введите название теста"}
              onChange={handleInputNameTest}
              name="name"
              value={testName}
              onFocus={handleFocus}
              onBlur={handleOnBlurInputTestName}
              autoFocus={isDisabledInput}
            />
            <button type="button" onClick={onClickCreateQuestionWithAnswers}>
              Создать вопрос
            </button>

            <div className={styles.que__wrapper}>
              <input
                placeholder={"Введите вопрос"}
                type="text"
                className={styles.question__title}
                onChange={handleQuestionChange}
              ></input>
              <div className={styles.checkbox__wrapper}>
                {isAnswers.map((que) => (
                  <label key={que.id}>
                    <input
                      value="option2"
                      type="checkbox"
                      name="true"
                      className={styles.real_check}
                      checked={que.correct}
                      onChange={(e) =>
                        handleChangeCheckboxAnswers(que.id, e.target.checked)
                      }
                    />
                    <span className={styles.fake_check}></span>
                    <input
                      type="text"
                      value={que.answer}
                      onChange={(e) =>
                        handleChangeInputAnswers(que.id, e.target.value)
                      }
                    />
                    <button onClick={() => handleRemoveQue(que.id)}>
                      Удалить
                    </button>
                  </label>
                ))}

                <button onClick={handleAddQue} className={styles.create_que}>
                  Добавить вопрос
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewTest;
