// import React, { useEffect, useState } from 'react';
// import NewTest from '../Test/NewTest/NewTest';
// import { axiosInstance } from '../../axios';
//
// function RedactUser() {
//   const [userToTeacher, setUserToTeacher] = useState([]);
//
//   const fetchResultDiscipline = async () => {
//     try {
//       const { data } = await axiosInstance.get(`tests/${disciplineName}/${testName}`);
//       setResult(data);
//       console.log(data);
//     } catch (error) {
//       console.error('Error fetching result disciplines:', error);
//     }
//   };
//
//   useEffect(() => {
//     fetchResultDiscipline();
//   });
//   return (
//     <div>
//       <h1 style={{ color: 'red' }}>Функционал в разработке</h1>
//     </div>
//   );
// }
//
// export default RedactUser;
