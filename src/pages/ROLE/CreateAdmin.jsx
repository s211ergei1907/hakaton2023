import React, { useState } from 'react';
import { axiosInstance } from '../../axios';

const CreateAdmin = () => {
  const [email, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(['']);

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/superadmin/createadmin', {
        email,
        password
      });

      console.log('Админ добавлен', response.data);
    } catch (error) {
      console.error('Админ не добавлен', error.response.data);
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
        <h1>Создать админа</h1>
      </div>
      <div>
        <form>
          <label>
            <input
              style={{ width: '500px' }}
              placeholder="Введите email"
              type="text"
              value={email}
              onChange={e => setLogin(e.target.value)}
              autoComplete="current-login"
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
            Создать
          </button>
          <br /> <br />
        </form>
      </div>

      <h1 style={{ marginBottom: 10 }}>Существующие админы на сайте: </h1>

      {admin.map(item => (
        <h1 style={{ color: 'red' }} key={item}>
          {item}
        </h1>
      ))}
    </div>
  );
};

export default CreateAdmin;
