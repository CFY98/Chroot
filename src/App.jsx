//IMPORTS
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Beans from "./pages/Beans";
import Equipment from "./pages/Equipment";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { handleScroll } from "./tools/transitions";

function App() {
  const [tuiMode, setTuiMode] = useState(false);
  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <>
      <div className="top-container fadein">
        <Header tuiMode={tuiMode} setTuiMode={setTuiMode}/>
        <NavBar tuiMode={tuiMode}/>
      </div>
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beans" element={<Beans />} />
        <Route path="/equipment" element={<Equipment />} />
      </Routes>
    </div>
      <Footer />
    </>
  );
}

export default App;
