//IMPORTS
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleScroll } from "./tools/transitions";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Beans from "./pages/Beans";
import Blaze from "./pages/Blaze";
import Equipment from "./pages/Equipment";
import Basket from "./pages/Basket";
import Footer from "./components/Footer";

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
        <Route path="/basket" element={<Basket />} />
        <Route path="/blaze" element={<Blaze />} />
      </Routes>
    </div>
      <Footer />
    </>
  );
}

export default App;
