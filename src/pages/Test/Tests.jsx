import React, { useEffect, useState } from 'react';
import { findAllByDisplayValue, logDOM } from '@testing-library/react';
import styles from './Tests.module.scss';
import { axiosInstance } from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';

export const Tests = () => {
  const [tests, setTests] = useState([]);
  const { disciplineName } = useParams();
  const navigate = useNavigate();

  //TODO Редактирование теста

  const fetchTests = async () => {
    const { data } = await axiosInstance.get(`tests/${disciplineName}`);
    setTests(data);
  };

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
            <div key={index}>
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
