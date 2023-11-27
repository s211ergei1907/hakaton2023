import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../../axios';
import styles from './StatisticsResults.module.scss';
import { logDOM } from '@testing-library/react';

function StatisticsResults(props) {
  const { disciplineName, groupName } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState([{}]);
  const fetchResultStatistic = async () => {
    try {
      console.log('params.groupName', groupName);
      const { data } = await axiosInstance.get(`results/${disciplineName}/groups/${groupName}`);
      setResult(data);
      console.log('data', data);
      console.log(result);
    } catch (error) {
      console.error('Error fetching result disciplines:', error);
      console.log('Ошибка');
    }
  };

  useEffect(() => {
    fetchResultStatistic();
  }, []);

  return result.map(result => (
    <div className={styles.userProfile}>
      <div className="{style.userName}">
        <h4>
          {result.surname} {result.name} {result.fatherName}
        </h4>
      </div>
      <div className="">
        <h4 style={{ color: 'green' }}>{result.testName}</h4>
      </div>
      <div className={styles.testInfo}>
        <p className={styles.percentageCorrect}>Правильных ответов {result.percentageCorrect}%</p>
      </div>
    </div>
  ));
}

export default StatisticsResults;
