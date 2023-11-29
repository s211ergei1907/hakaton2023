import React, { useEffect, useState } from 'react';
import { findAllByDisplayValue, logDOM } from '@testing-library/react';
import styles from './Tests.module.scss';
import { axiosInstance } from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import NewTest from './NewTest/NewTest';

export const Tests = () => {
  const [tests, setTests] = useState([]);
  const [oneTests, setOneTests] = useState([]);
  const { disciplineName } = useParams();
  const navigate = useNavigate();

  //TODO Редактирование теста

  const fetchTests = async () => {
    const { data } = await axiosInstance.get(`tests/${disciplineName}`);
    setTests(data);
  };
  const onClickTest = async (testName, testId) => {
    const { data } = await axiosInstance.get(`tests/${disciplineName}/${testId}`);
    setOneTests(data);

    // console.log('ONE_TEST', data);

    navigate(`/test_redact/${disciplineName}/${testName}-${testId}`);
    // <NewTest testUrl={`tests/${disciplineName}/Math%20Test%201`} />;
  };

  useEffect(() => {
    // fetchOneTest();
  }, []);

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <div className={styles.tests__wrap}>
      <button
        onClick={() => navigate(`/new_test/${disciplineName}`)}
        type="submit"
        style={{ marginBottom: '30px' }}
      >
        Создать тест
      </button>
      <div className={styles.tests}>
        <div className={styles.card_wrap}>
          {tests.map(({ testName, id }, index) => (
            <div onClick={() => onClickTest(testName, id)} key={index}>
              <div className={styles.card}>
                <p>{testName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
