import { Header } from "./components/Header/Header";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Disciplne } from "./pages/Discipline/Disciplne";
import { Tests } from "./pages/Test/Tests";
import { Group } from "./pages/Group/Group";

import { useEffect, useState } from "react";
import axios from "./axios";
import NewDiscipline from "./components/NewDiscipline/NewDiscipline";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="discipline/" element={<Disciplne />} />
            <Route path="new_discipline/:id" element={<NewDiscipline />} />
            <Route path="tests/:disciplineName" element={<Tests />} />
            <Route path="groups" element={<Group />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
