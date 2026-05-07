import { Routes, Route } from "react-router-dom";
import Home from "/src/pages/Home";
import Beans from "/src/pages/Beans";
import NavBar from "./src/components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beans" element={<Beans />} />
      </Routes>
    </>
  );
}

export default App;
