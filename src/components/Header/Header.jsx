import React from "react";
import styles from "./Header.module.scss";
import { Outlet, Link } from "react-router-dom";
import tg from "../../assets/img/tg.svg";
import vk from "../../assets/img/vk.svg";
import logo from "../../assets/img/logoSDK.svg";
import SignIn from "../../pages/SignIn/SignIn";

export const Header = () => {
  return (
    <>
      <div className={styles.header_wrap}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <p>Путь к</p>
            <img src={logo} alt="sdk" />
          </div>
          <ul>
            <Link to="/disciplines">
              <li>Дисциплины</li>
            </Link>
            <Link to="/test">
              <li>Результаты</li>
            </Link>
            <Link to="/groups">
              <li>Группы</li>
            </Link>
            <li>Создание преподавателей</li>
            <li>Создание админа</li>
          </ul>
          <div className={styles.header__link}>
            <Link to="/auth">
              <h5>Вход</h5>
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
