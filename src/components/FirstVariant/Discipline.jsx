import React, { useState } from "react";
import { RenderCountForm } from "./RenderCountForm";
const Discipline = () => {
  const [countInputQuestion, setCountInputQuestion] = useState([1, 2, 3]);

  const onAddInput = () => {
    setCountInputQuestion([...countInputQuestion, countInputQuestion.length]);
  };
  const onDeleteInput = () => {
    setCountInputQuestion((state) => state.slice(0, state.length - 1));
  };

  return (
    <>
      <p>
        Название дисциплины: Укажу в зависимости какую дисциплину выбрал человек
      </p>

      <button
        onClick={() => {
          onAddInput();
          console.log(countInputQuestion);
        }}
      >
        Добавить вопрос
      </button>
      <button
        onClick={() => {
          onDeleteInput();
          console.log(countInputQuestion);
        }}
      >
        Удалить вопрос
      </button>
      <button>Создать тест</button>
      <form action="">
        {countInputQuestion.map(() => (
          <RenderCountForm />
        ))}
      </form>
    </>
  );
};

export default Discipline;
