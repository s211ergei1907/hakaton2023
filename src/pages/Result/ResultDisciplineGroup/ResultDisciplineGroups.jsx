import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../axios';
import styles from '../../../components/Card/Card.module.scss';

function ResultDisciplineGroups(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [resultDiscipline, setResultDiscipline] = useState([{}]);
  const fetchResultDiscipline = async () => {
    try {
      const { data } = await axiosInstance.get(`results/${params.disciplineName}/groups`);
      setResultDiscipline(data);
      console.log(params);
    } catch (error) {
      console.error('Error fetching result disciplines:', error);
    }
  };

  useEffect(() => {
    fetchResultDiscipline();
  }, []);

  return (
    <>
      <h1>Выберите группу</h1>
      <br />
      <br />
      <div className={styles.discipline_wrap}>
        <div className={styles.discipline}>
          {resultDiscipline.map(({ name, id }, index) => (
            <div key={id} className={styles.card_wrap}>
              <div
                onClick={() => {
                  navigate(`/results/${params.disciplineName}/groups/${name}`);
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
export default ResultDisciplineGroups;
