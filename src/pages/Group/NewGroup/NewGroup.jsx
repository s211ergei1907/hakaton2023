import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NewGroup.module.scss';
import { axiosInstance } from '../../../axios';
import img from '../../../assets/icons/delete.svg';

function NewGroup() {
  const [group, setGroup] = useState({ name: '' });
  const [disciplines, setDisciplines] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState();
  const [arraySelectedDisciplines, setArraySelectedDisciplines] = useState([]);

  const navigate = useNavigate();
  const handleInput = event => {
    setGroup({ [event.target.name]: event.target.value });
  };

  const handleGroupChange = event => {
    if (event.target.value) {
      setSelectedDiscipline(event.target.value);
    }
  };

  const fetchGroup = async () => {
    const { data } = await axiosInstance.get('/disciplines');

    //Преобразование id в строку для того, чтобы потом не преобразовывать
    setDisciplines(data.map(item => ({ ...item, id: String(item.id) })));
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  useEffect(() => {
    if (!selectedDiscipline || arraySelectedDisciplines.includes(selectedDiscipline)) {
      return;
    }

    setArraySelectedDisciplines(prevState => [...prevState, selectedDiscipline]);
  }, [selectedDiscipline]);

  const handleSubmit = e => {
    e.preventDefault();

    const body = {
      group,
      disciplines: arraySelectedDisciplines.map(id => ({ id }))
    };

    axiosInstance
      .post('groups', body)
      .then(() => navigate('/groups'))
      .catch(err => console.log(err));
  };

  return (
    <div className={styles.newDiscipline__wrap}>
      <div className={styles.newDiscipline}>
        <form onSubmit={handleSubmit}>
          <input type="discipline" placeholder={'Добавьте новую группу'} onChange={handleInput} name="name" />

          <button disabled={!(group.name.trim() && selectedDiscipline)}>Добавить группу</button>
        </form>
      </div>
      <div className={styles.add_group}>
        <div className={styles.text_info}>
          <h3>Выберите дисциплины, которые должны добавляться к группе</h3>
          <p>Для того чтобы выбрать группу, найдите её в этом списке, а затем кликните на нее.</p>
          <p>Добавленные дисциплины вы увидите внизу</p>
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
          value={selectedDiscipline}
          defaultValue={'default'}
          onChange={handleGroupChange}
        >
          <option disabled value="default">
            Выберите группу
          </option>
          {disciplines.map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.show_group}>
        <h1>Выбранные группы</h1>
        {disciplines
          .filter(({ id }) => arraySelectedDisciplines.includes(id))
          .map(({ name, id }) => (
            <div key={name} style={{ display: 'flex' }}>
              <h3> {name}</h3>
              <div
                style={{ backgroundColor: '#ef5350', maxWidth: 26 }}
                onClick={() =>
                  setArraySelectedDisciplines(prev => [...prev].filter(currentId => currentId !== id))
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

export default NewGroup;

//
