import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NewDiscipline.module.scss';
import { axiosInstance } from '../../axios';
import img from '../../assets/icons/delete.svg';

function NewDiscipline() {
  const [discipline, setDiscipline] = useState({ name: '' });
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [arraySelectedGroups, setArraySelectedGroups] = useState([]);

  const navigate = useNavigate();
  const handleInput = event => {
    setDiscipline({ [event.target.name]: event.target.value });
  };

  //TODO disabled на кнопку отправить

  const handleGroupChange = event => {
    if (event.target.value) {
      setSelectedGroup(event.target.value);
    }
  };

  const fetchGroup = async () => {
    const { data } = await axiosInstance.get('/groups');

    //Преобразование id в строку
    setGroups(data.map(item => ({ ...item, id: String(item.id) })));
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  useEffect(() => {
    if (!selectedGroup || arraySelectedGroups.includes(selectedGroup)) {
      return;
    }

    setArraySelectedGroups(prevState => [...prevState, selectedGroup]);
  }, [selectedGroup]);

  const handleSubmit = e => {
    e.preventDefault();

    const body = {
      discipline,
      groups: arraySelectedGroups.map(id => ({ id }))
    };

    axiosInstance
      .post('disciplines', body)
      .then(() => navigate('/disciplines'))
      .catch(err => console.log(err));
  };

  return (
    <div className={styles.newDiscipline__wrap}>
      <div className={styles.newDiscipline}>
        <form onSubmit={handleSubmit}>
          <input
            type="discipline"
            placeholder={'Добавьте новую дисциплину'}
            onChange={handleInput}
            name="name"
          />

          <button disabled={!discipline.name.trim()}>Добавить дисциплину</button>
        </form>
      </div>
      <div className={styles.add_group}>
        <div className={styles.text_info}>
          <h3>Выберите группы, которые должны добавляться к дисциплине</h3>
          <p>Для того чтобы выбрать группу, найдите её в этом списке, а затем кликните на нее.</p>
          <p>Добавленные группу вы увидите внизу</p>
        </div>
        <select
          style={{
            maxWidth: '450px',
            height: '30px',
            display: 'grid',
            gridGap: '10px',
            paddingRight: 100,
            fontSize: '16px'
          }}
          name="group"
          value={selectedGroup}
          defaultValue={'default'}
          onChange={handleGroupChange}
        >
          <option disabled value="default">
            Выберите группу
          </option>
          {groups.map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.show_group}>
        {groups
          .filter(({ id }) => arraySelectedGroups.includes(id))
          .map(({ name, id }) => (
            <div key={name} style={{ display: 'flex' }}>
              <h1> {name}</h1>
              <div
                style={{ backgroundColor: '#ef5350', maxWidth: 26 }}
                onClick={() =>
                  setArraySelectedGroups(prev => [...prev].filter(currentId => currentId !== id))
                }
              >
                <img src={img} alt="" style={{ height: 25, width: 25 }} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default NewDiscipline;

//
