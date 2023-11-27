import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../axios';
import styles from './StudentList.module.scss';

// const students = [
//   { id: 1, name: 'Иван', grade: 'A' },
//   { id: 2, name: 'Мария', grade: 'B' },
//   { id: 3, name: 'Александр', grade: 'C' }
// ];

const StudentList = () => {
  const { name_group } = useParams();
  const [students, setStudents] = useState([]);

  const fetchStudent = async () => {
    const { data } = await axiosInstance.get(`/groups/${name_group}`);
    setStudents(data);
    console.log(data);
    console.log(students);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <div className={styles.studentListContainer}>
      <h2>Список студентов группы {name_group}</h2>
      <ul className={styles.studentList}>
        {students.map(({ surname, name, fathername }, index) => (
          <li key={index} className={styles.studentItem}>
            <h4>Студент {index + 1}</h4>
            <p>
              {surname} {name} {fathername}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
