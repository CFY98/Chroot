import { Routes, Route } from "react-router-dom";
import Beans from "/src/pages/tabs/Beans";
import NavBar from "./src/components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/beans" element={<Beans />} />
      </Routes>
    </>
  );
}

export default App;
