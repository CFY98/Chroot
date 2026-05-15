//IMPORTS
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleScroll } from "./tools/transitions";
import Header from "./components/sections/Header";
import NavBar from "./components/navigation/NavBar";
import Home from "./routes/Home";
import Terminal from "./routes/Terminal";
import Beans from "./routes/Beans";
import Blaze from "./routes/Blaze";
import Sunshine from "./routes/Sunshine";
import Summit from "./routes/Summit";
import Equipment from "./routes/Equipment";
import Dripper from "./routes/Dripper";
import Filters from "./routes/Filters";
import Grinder from "./routes/Grinder";
import Basket from "./routes/Basket";
import Receipt from "./routes/Receipt";
import Footer from "./components/sections/Footer";

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
          <Route path="/terminal" element={<Terminal />} />
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
