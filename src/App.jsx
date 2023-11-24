import { Header } from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Disciplne } from './pages/Discipline/Disciplne';
import { Tests } from './pages/Test/Tests';
import { Group } from './pages/Group/Group';
import NewDiscipline from './components/NewDiscipline/NewDiscipline';
import { Update } from './components/Update/Update';
import CreateTestCalculationTask from './components/FirstVariant/CreateTestCalculationTask';
import DynamicForm from './components/FirstVariant/DynamicForm';
import TestForm from './components/FirstVariant/TestForm';
import NewTest from './pages/Test/NewTest/NewTest';
import React from 'react';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import NewGroup from './pages/Group/NewGroup/NewGroup';

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="registration" element={<SignUp />}></Route>
              <Route path="auth" element={<SignIn />}></Route>
              <Route path="disciplines/" element={<Disciplne />} />
              <Route path="new_discipline/:id" element={<NewDiscipline />} />
              <Route path="new_group" element={<NewGroup />} />

              <Route path="tests/:disciplineName" element={<Tests />} />
              <Route path="/:" element={<Tests />} />
              <Route path="groups" element={<Group />} />
              <Route path="tests/calculation_test" element={<CreateTestCalculationTask />} />
              <Route path="update/:title_name/:name/:id" element={<Update />}></Route>

              <Route path="dynamic" element={<DynamicForm />}></Route>
              <Route path="formtest" element={<TestForm />}></Route>
              <Route path="new_test/:disciplineName" element={<NewTest />}></Route>

              <Route path="test" element={<NewTest />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
