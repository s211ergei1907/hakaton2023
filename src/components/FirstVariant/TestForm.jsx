import React, { useState } from "react";

const TestForm = () => {
  const testData = {
    test: {
      testName: "Sample Test",
      disciplineName: "opa opa opa-pa-pa",
    },
    questions: [
      {
        questionText: "What is the capital of France?",
      },
      {
        questionText: "Who discovered gravity?",
      },
    ],
    answers: [
      {
        question: {
          questionText: "What is the capital of France?",
        },
        answer: "Paris",
        correct: true,
      },
      {
        question: {
          questionText: "What is the capital of France?",
        },
        answer: "Russia",
        correct: false,
      },
      {
        question: {
          questionText: "Who discovered gravity?",
        },
        answer: "Isaac Newton",
        correct: true,
      },
    ],
  };

  const [formData, setFormData] = useState({});

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
  };

  return (
    <div>
      {testData.answers.map((value, index, array) => {
        value.correct === true
          ? console.log(value.answer)
          : console.log("Нет правильного ответа");
      })}

      <br />
      <br />
      <h1>Test Form - {testData.test.testName}</h1>
      <h1>Discipline - {testData.test.disciplineName}</h1>

      <form>
        {testData.questions.map((question, index) => (
          <div key={index}>
            <label>{question.questionText}</label>
            <input
              type="text"
              name={`answer${index}`}
              value={formData[`answer${index}`] || ""}
              onChange={(event) => handleChange(event, index)}
              required
            />
          </div>
        ))}

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TestForm;
