import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './NewTest.module.scss';
import { axiosInstance } from '../../../axios';

//TODO удаление вопросов
function NewTest({ testUrl }) {
  const { disciplineName } = useParams();

  const [question, setQuestion] = useState('');
  const [testName, setTestName] = useState('');
  const [answers, setAnswers] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

  const [finalTest, setFinalTest] = useState({ test: { testName: '', disciplineName } });

  const fetchDiscipline = async () => {
    // let resp = await axiosInstance.get('https://653d2abef52310ee6a99f273.mockapi.io/disciplines1');
    let resp = testUrl && (await axiosInstance.get(testUrl));

    let data = resp?.data?.[0];

    if (data) {
      setFinalTest(data);
      setTestName(data.test.testName);
      setQuestion(data.questions[0].questionText);
      setAnswers(data.answers.filter(({ questionId }) => questionId === data.questions[0]?.id));
    } else {
      setFinalTest(prev => ({ ...prev, test: { ...prev.test, id: String(Math.random()).slice(2) } }));
    }
  };

  useEffect(() => {
    fetchDiscipline();
  }, []);

  //Создать целый вопрос с ответами, записать это в JSON, после чего очистить поля для возможности создания ещё вопроса
  const onClickCreateQuestion = () => {
    const id = isEditMode ? answers[0].questionId : String(Math.random()).slice(2);

    const data = {
      test: { testName, disciplineName },
      question: { questionText: question, id },
      answers: answers.map(el => ({ ...el, questionId: id }))
    };

    if (isEditMode) {
      setFinalTest(prev => ({
        test: { ...prev.test, testName },
        questions: [...(prev.questions ?? []).map(el => (el.id === id ? { ...data.question } : el))],
        answers: [
          ...(prev.answers ?? []).map(el =>
            el.questionId === id ? { ...data.answers.find(({ id }) => id === el.id) } : el
          )
        ]
      }));
    } else {
      setFinalTest(prev => ({
        test: { ...prev.test, testName },
        questions: [...(prev.questions ?? []), { ...data.question }],
        answers: [...(prev.answers ?? []), ...data.answers]
      }));

      setCurrentQuestionNumber(prev => prev + 1);
      setQuestion('');
      setAnswers([]);
    }
  };

  const handleChangeCheckboxAnswers = (id, correct) => {
    setAnswers(prevData => prevData.map(item => (item.id === id ? { ...item, correct } : item)));
  };

  const handleChangeInputAnswers = (id, answer) => {
    setAnswers(prevData => prevData.map(item => (item.id === id ? { ...item, answer } : item)));
  };

  const handleQuestionChange = e => {
    setQuestion(e.target.value);
  };

  const onAddQuestion = () => {
    const store = {
      id: Date.now()
    };

    setAnswers(prev => [...prev, store]);
  };

  const handleRemoveQue = id => {
    setAnswers(answers.filter(item => item.id !== id));
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const onCurrentQuestionChange = newCurrentQuestionNumber => {
    const question = finalTest.questions?.[newCurrentQuestionNumber];
    setCurrentQuestionNumber(newCurrentQuestionNumber);

    if (!question) {
      setQuestion('');
      setAnswers([]);

      return;
    }

    const answers = finalTest.answers.filter(({ questionId }) => questionId === question.id);

    setQuestion(question.questionText);
    setAnswers(answers);
  };

  const onSaveTest = async () => {
    //TODO вставить URL
    await axiosInstance.post('', finalTest);
  };

  const isCorrectAnswerSelected = Boolean(answers.find(({ correct, answer }) => correct && answer));
  const canCreateAnswer = Boolean(testName && question && isCorrectAnswerSelected);

  const isEditMode = finalTest.questions && currentQuestionNumber !== finalTest.questions.length;

  return (
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
            placeholder={'Введите название теста'}
            onChange={event => setTestName(event.target.value)}
            name="name"
            value={testName}
          />

          <div className={styles.que__wrapper}>
            <input
              value={question}
              placeholder="Введите вопрос"
              type="text"
              className={styles.question__title}
              onChange={handleQuestionChange}
            ></input>
            <div className={styles.checkbox__wrapper}>
              {answers.map(que => (
                <label key={que.id}>
                  <input
                    value="option2"
                    type="checkbox"
                    name="true"
                    className={styles.real_check}
                    checked={que.correct}
                    onChange={e => handleChangeCheckboxAnswers(que.id, e.target.checked)}
                  />
                  <span className={styles.fake_check}></span>
                  <input
                    type="text"
                    value={que.answer}
                    onChange={e => handleChangeInputAnswers(que.id, e.target.value)}
                  />
                  <button onClick={() => handleRemoveQue(que.id)}>Удалить</button>
                </label>
              ))}

              <button onClick={onAddQuestion} className={styles.create_que} disabled={!question}>
                Добавить ответ
              </button>

              <button
                type="button"
                onClick={onClickCreateQuestion}
                disabled={!canCreateAnswer}
                style={{ marginTop: 20 }}
              >
                {!isEditMode ? <>Создать вопрос</> : <>Обновить вопрос</>}
              </button>

              {Boolean(currentQuestionNumber) && (
                <button onClick={() => onCurrentQuestionChange(currentQuestionNumber - 1)}>{'<'}</button>
              )}
              {Boolean(finalTest.questions && currentQuestionNumber < finalTest.questions?.length) && (
                <button onClick={() => onCurrentQuestionChange(currentQuestionNumber + 1)}>{'>'}</button>
              )}
            </div>
          </div>
        </form>
      </div>
      <div>
        <h1>Список вопросов</h1>
        {finalTest.questions?.map(({ questionText, id }) => (
          <div key={id}>
            <h2>{questionText}</h2>
            <ol>
              {finalTest.answers
                .filter(({ questionId }) => questionId === id)
                .map(({ answer, correct, id }) => (
                  <li style={{ color: correct ? 'green' : 'gray' }} key={id}>
                    {answer}
                  </li>
                ))}
            </ol>
          </div>
        ))}
      </div>

      <button onClick={onSaveTest} disabled={!finalTest.questions?.length || finalTest.questions?.length < 1}>
        Сохранить
      </button>
    </div>
  );
}

export default NewTest;
