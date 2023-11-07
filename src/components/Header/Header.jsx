import React from "react";
import styles from "./Header.module.scss";
import { Outlet, Link } from "react-router-dom";
import tg from "../../assets/img/tg.svg";
import vk from "../../assets/img/vk.svg";
import logo from "../../assets/img/logoSDK.svg";

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
            <Link to="/discipline">
              <li>Дисциплины</li>
            </Link>
            <Link to="/test">
              <li>тесты</li>
            </Link>
            <li>Создание тестов</li>
            <li>О нас</li>
          </ul>
          <div className={styles.header__link}>
            <img style={{ marginRight: "13px" }} src={tg} alt="tg" />
            <img src={vk} alt="" />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
