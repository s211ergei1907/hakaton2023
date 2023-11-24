import React, { useEffect, useState } from "react";
import { RenderCountForm } from "./RenderCountForm";
const CreateTestCalculationTask = () => {
  const [countInputQuestion, setCountInputQuestion] = useState([]);
  // useEffect(() => {
  //
  // }, [countInputQuestion]);
  const onAddInput = () => {
    setCountInputQuestion([...countInputQuestion, countInputQuestion.length]);
  };
  const onDeleteInput = () => {
    setCountInputQuestion((state) => state.slice(0, state.length - 1));
  };

  return (
    <>
      <button
        onClick={() => {
          onAddInput();
        }}
      >
        Добавить вопрос
      </button>
      <button
        onClick={() => {
          onDeleteInput();
        }}
      >
        Удалить вопрос
      </button>
      <button>Создать тест</button>
      <form action="">
        {countInputQuestion.map((value, index, array) => (
          <RenderCountForm key={index} />
        ))}
      </form>
    </>
  );
};

export default CreateTestCalculationTask;
