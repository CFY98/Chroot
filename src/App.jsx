import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Beans from "./pages/Beans";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { handleScroll } from "./tools/transitions";

function App() {
  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beans" element={<Beans />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
