import React from 'react';
import styles from './Header.module.scss';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import tg from '../../assets/img/tg.svg';
import vk from '../../assets/img/vk.svg';
import logo from '../../assets/img/logoSDK.svg';
import SignIn from '../../pages/SignIn/SignIn';
import { axiosInstance } from '../../axios';
import axios from 'axios';

export const Header = () => {
  const navigate = useNavigate();
  const onClickLogOut = () => {
    axiosInstance
      .post('/log_out', {})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was a problem:', error);
      });
  };

  return (
    <>
      <div className={styles.header_wrap}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={logo} alt="sdk" />
          </div>
          <ul>
            <Link to="/disciplines">
              <li>Дисциплины</li>
            </Link>
            <Link to="/results/disciplines">
              <li>Результаты</li>
            </Link>
            <Link to="/groups">
              <li>Группы</li>
            </Link>
            <Link to="/create_teacher">
              <li>Создание преподавателей</li>
            </Link>
            <Link to="/superadmin/createadmin">
              <li>Создание админа</li>
            </Link>
          </ul>
          <div className={styles.header__link}>
            <Link to="/auth">
              <h5>Вход</h5>
            </Link>
            <h5 onClick={() => onClickLogOut()}>Выход</h5>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
