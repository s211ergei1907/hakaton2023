import { Header } from "./components/Header/Header";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Disciplne } from "./pages/Discipline/Disciplne";
import { Tests } from "./pages/Test/Tests";
import { useEffect, useState } from "react";
import axios from "./axios";
import NewDiscipline from "./components/NewDiscipline/NewDiscipline";
function App() {
  // const fetchDiscipline = async () => {
  //   const { data } = await axios.get("disciplines");
  //   setDiscipline(data);
  // };
  //
  // const [discipline, setDiscipline] = useState([]);
  //
  // useEffect(() => {
  //   fetchDiscipline();
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="discipline/" element={<Disciplne />} />
            <Route path="new_discipline/:id" element={<NewDiscipline />} />
            <Route path="test" element={<Tests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
