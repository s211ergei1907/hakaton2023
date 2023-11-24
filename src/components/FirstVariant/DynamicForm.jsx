import React, { useState } from "react";
import { logDOM } from "@testing-library/react";

const DynamicForm = () => {
  // Состояние для хранения данных формы
  const [formData, setFormData] = useState({
    fields: [{ name: "", value: "" }],
  });

  // Обработчик изменения значения поля ввода
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newFields = [...formData.fields];
    newFields[index] = { ...newFields[index], [name]: value };
    setFormData({ fields: newFields });
  };

  // Обработчик добавления нового поля
  const handleAddField = () => {
    setFormData({ fields: [...formData.fields, { name: "", value: "" }] });
  };

  // Обработчик удаления поля
  const handleRemoveField = (index) => {
    const newFields = [...formData.fields];
    newFields.splice(index, 1);
    setFormData({ fields: newFields });
  };

  // Обработчик отправки формы (ваша логика обработки данных)
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("...formData.fields:", ...formData.fields);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ marginBottom: "10px" }}>
        Название теста:
        <input type="text" />
      </label>
      <br />
      <label style={{ marginBottom: "10px" }}>
        Название дисциплины:
        <input type="text" />
      </label>{" "}
      <br />
      {formData.fields.map((field, index) => (
        <div key={index}>
          <label>
            Вопрос:
            <input
              type="text"
              name="name"
              value={field.name}
              onChange={(e) => handleInputChange(index, e)}
            />
          </label>
          <label>
            Ответ:
            <input
              type="text"
              name="value"
              value={field.value}
              onChange={(e) => handleInputChange(index, e)}
            />
          </label>
          <button type="button" onClick={() => handleRemoveField(index)}>
            Удалить вопрос
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddField}>
        Добавить вопрос
      </button>
      <button type="submit">Создать тест</button>
    </form>
  );
};

export default DynamicForm;
