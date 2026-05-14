//IMPORTS
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleScroll } from "./tools/transitions";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Beans from "./pages/Beans";
import Blaze from "./pages/Blaze";
import Sunshine from "./pages/Sunshine";
import Summit from "./pages/Summit";
import Equipment from "./pages/Equipment";
import Dripper from "./pages/Dripper";
import Filters from "./pages/Filters";
import Grinder from "./pages/Grinder";
import Basket from "./pages/Basket";
import Receipt from "./pages/Receipt";
import Footer from "./components/Footer";

function App() {
  const [tuiMode, setTuiMode] = useState(false);
  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <>
      <div className="top-container fadein">
        <Header tuiMode={tuiMode} setTuiMode={setTuiMode} />
        <NavBar tuiMode={tuiMode} />
      </div>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/beans" element={<Beans />} />
          <Route path="/blaze" element={<Blaze />} />
          <Route path="/sunshine" element={<Sunshine />} />
          <Route path="/summit" element={<Summit />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/dripper" element={<Dripper />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/grinder" element={<Grinder />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/receipt" element={<Receipt tuiMode={tuiMode} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
