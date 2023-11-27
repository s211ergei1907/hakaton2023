import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../axios';
import styles from '../../components/Card/Card.module.scss';

function ResultDisciplines(props) {
  const navigate = useNavigate();
  const [resultDiscipline, setResultDiscipline] = useState([{}]);
  const fetchResultDiscipline = async () => {
    const { data } = await axiosInstance.get('results/disciplines');
    setResultDiscipline(data);
  };

  useEffect(() => {
    fetchResultDiscipline();
  }, []);

  return (
    <>
      <h1>Выберите дисциплину по которой хотите посмотреть результаты</h1>
      <br />
      <br />
      <div className={styles.discipline_wrap}>
        <div className={styles.discipline}>
          {resultDiscipline.map(({ name, id }, index) => (
            <div className={styles.card_wrap}>
              <div
                onClick={() => {
                  navigate(`/results/${name}/groups`);
                }}
                className={styles.card}
              >
                <p>{name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default ResultDisciplines;
