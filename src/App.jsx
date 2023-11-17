import { Header } from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Disciplne } from "./pages/Discipline/Disciplne";
import { Tests } from "./pages/Test/Tests";
import { Group } from "./pages/Group/Group";
import NewDiscipline from "./components/NewDiscipline/NewDiscipline";
import { Update } from "./components/Update/Update";

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="discipline/" element={<Disciplne />} />
              <Route path="new_discipline/:id" element={<NewDiscipline />} />
              <Route path="tests/:disciplineName" element={<Tests />} />
              <Route path="groups" element={<Group />} />
              <Route path="update/:name/:id" element={<Update />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
