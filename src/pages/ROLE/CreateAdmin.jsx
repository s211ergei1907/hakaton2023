import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../axios';
import styles from './CreateAdmin.module.scss';
const CreateAdmin = () => {
  const [email, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState([]);

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

  const fetchAllAdmin = async () => {
    const { data } = await axiosInstance.get('/admin');
    setAdmin(data);
  };

  useEffect(() => {
    fetchAllAdmin();
  }, []);

  const handleDeleteUser = async id => {
    try {
      await axiosInstance.delete(`admin/${id}`);
      await fetchAllAdmin();
    } catch (error) {
      console.log('не получилось удалить', error);
    }
    // setAdmin(admin.filter(user => user.id !== id));
    // fetchAllAdmin();
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

      <table className={styles.user_table}>
        {admin.length > 0 && (
          <thead>
            <tr>
              <th>Email</th>
              <th>Роль</th>
              <th>Действия</th>
            </tr>
          </thead>
        )}
        <tbody>
          {admin.map((user, index) => (
            <tr key={index}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateAdmin;
