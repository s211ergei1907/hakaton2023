import { Header } from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Discipline } from './pages/Discipline/Discipline';
import { Tests } from './pages/Test/Tests';
import { Group } from './pages/Group/Group';
import NewDiscipline from './components/NewDiscipline/NewDiscipline';
import { Update } from './components/Update/Update';
import StudentList from './components/StudentList/StudentList';
import NewTest from './pages/Test/NewTest/NewTest';
import React from 'react';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import NewGroup from './pages/Group/NewGroup/NewGroup';
import ResultDisciplines from './pages/Result/ResultDisciplines';
import ResultDisciplineGroups from './pages/Result/ResultDisciplineGroup/ResultDisciplineGroups';
import StatisticsResults from './pages/Result/ResultDisciplineGroup/StatisticsResults/StatisticsResults';
import CreateAdmin from './pages/ROLE/CreateAdmin';
import RedactUser from './pages/ROLE/RedactUser';
import RedactTest from './pages/Test/RedactTest/RedactTest';

function Sucsesfully() {
  return (
    <>
      <h1>Успешно</h1>
    </>
  );
}

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="registration" element={<SignUp />}></Route>
              <Route path="auth" element={<SignIn />}></Route>
              <Route path="disciplines/" element={<Discipline />} />
              <Route path="new_discipline/:id" element={<NewDiscipline />} />
              <Route path="new_group" element={<NewGroup />} />
              <Route path="tests/:disciplineName" element={<Tests />} />
              <Route path="/:" element={<Tests />} />
              <Route path="groups" element={<Group />} />
              <Route path="groups/:name_group" element={<StudentList />} />
              <Route path="update/:title_name/:name/:id" element={<Update />}></Route>
              //
              <Route path="new_test/:disciplineName" element={<NewTest />}></Route>
              <Route path="test_redact/:disciplineName/:testData" element={<NewTest />}></Route>
              //Result
              <Route path="results/disciplines" element={<ResultDisciplines />}></Route>
              <Route path="results/:disciplineName/groups" element={<ResultDisciplineGroups />}></Route>
              <Route path="results/:disciplineName/groups/:groupName" element={<StatisticsResults />}></Route>
              //ROLE
              <Route path="/superadmin/createadmin" element={<CreateAdmin />}></Route>
              <Route path="create_teacher" element={<RedactUser />}></Route>
              //
              <Route path="sucsessfully" element={<Sucsesfully />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
