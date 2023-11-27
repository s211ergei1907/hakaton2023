import React, { useEffect, useState } from 'react';
import { findAllByDisplayValue } from '@testing-library/react';
import styles from './Group.module.scss';
import { axiosInstance } from '../../axios';
import { useNavigate } from 'react-router-dom';
import redact from '../../assets/img/redact.png';
export const Group = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const title_name = 'groups';

  const fetchGroup = async () => {
    const { data } = await axiosInstance.get('/groups');
    setGroups(data);
    console.log(groups);
  };

  const groupDelete = async id => {
    try {
      await axiosInstance.delete(`groups/${id}`);
      await fetchGroup();
    } catch (error) {
      console.log('дисциплину не получилось удалить', error);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  return (
    <div className={styles.tests__wrap}>
      <div className={styles.tests}>
        <button
          onClick={() => {
            navigate('/new_group');
          }}
          type="submit"
          style={{ marginBottom: '30px' }}
        >
          Создать новую группу
        </button>
        <div className={styles.card_wrap}>
          {groups.map((num, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/groups/${num.name}`);
              }}
              className={styles.card}
              style={{ marginBottom: '10px' }}
            >
              <div
                onClick={event => {
                  event.stopPropagation();
                  navigate(`/update/${title_name}/${num.name}/${num.id}`);
                }}
                className={styles.redact_wrap}
              >
                <img src={redact} />
              </div>
              <div
                onClick={event => {
                  event.stopPropagation();
                  groupDelete(num.id);
                }}
                className={styles.closeModal}
              ></div>

              <p>{num.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
