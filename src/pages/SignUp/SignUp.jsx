import React, { useState } from 'react';
import { axiosInstance } from '../../axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [fullname, setFullName] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegistration = async () => {
    if (fullname !== '' && password !== '' && email !== '') {
      try {
        const response = await axiosInstance.post('/register', {
          fullname,
          description,
          email,
          password
        });
        console.log('Успешная регистрация', response.data);
        navigate('/auth');
      } catch (error) {
        console.error('Ошибка регистрации', error.response.data);
      }
    } else {
      alert('Введите все поля');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '0 auto',
        alignItems: 'center'
      }}
    >
      <div style={{ margin: '30px 0' }}>
        <h1>Регистрация</h1>
      </div>
      <br />
      <form>
        <label>
          <input
            style={{ width: '500px' }}
            placeholder="ФИО"
            type="text"
            value={fullname}
            onChange={e => setFullName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          <input
            style={{ width: '500px' }}
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          <input
            style={{ width: '500px' }}
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          <br />
          <br />
          <br />
          <textarea
            style={{ width: 517 }}
            id="textAreaInput"
            placeholder={'Напишите о себе'}
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={5} // Задайте желаемое количество строк
            cols={50} // Задайте желаемое количество столбцов
          />
        </label>
        <br />
        <br />
        <button type="button" onClick={handleRegistration}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Registration;
