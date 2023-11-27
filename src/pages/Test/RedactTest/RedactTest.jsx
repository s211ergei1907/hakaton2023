import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../axios';
import NewTest from '../NewTest/NewTest';

function RedactTest({ disciplineName, testId }) {
  const [result, setResult] = useState([]);

  const fetchResultDiscipline = async () => {
    try {
      const { data } = await axiosInstance.get(`tests/${disciplineName}/${testId}`);
      setResult(data);
      console.log(data);
      <NewTest testUrl={`tests/${disciplineName}/${testId}`} />;
    } catch (error) {
      console.error('Error fetching result disciplines:', error);
    }
  };

  useEffect(() => {
    fetchResultDiscipline();
  }, []);
  return (
    <div style={{ color: 'red' }}>
      <h1>К 30 числу будет готово(чуть-чуть недоделали), но зато создание теста работает отлично!</h1>
    </div>
  );
}

export default RedactTest;
