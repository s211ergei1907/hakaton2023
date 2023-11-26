import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../axios';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/login', {
        username,
        password
      });

      console.log('Успешная авторизация', response.data);
    } catch (error) {
      console.error('Ошибка авторизации', error.response.data);
    }
  };

  return (
    <div>
      <h2>Авторизация</h2>
      <br />
      <form>
        <label>
          <input
            style={{ width: '500px' }}
            placeholder="Введите имя пользователя"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="current-username"
          />
        </label>
        <br />
        <br />
        <label>
          <input
            style={{ width: '500px' }}
            placeholder="Введите пароль"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        <br />
        <br />
        <button type="button" onClick={handleLogin}>
          Войти
        </button>
        <br /> <br />
        <Link to="/registration">
          <h4 style={{ color: 'blue' }}>У меня нет аккаунта. Зарегистрироваться</h4>
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
