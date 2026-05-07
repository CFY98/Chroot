import { Routes, Route } from "react-router-dom"
import { Beans } from "/src/pages/tabs/Beans";

function App() {
    return (
        <>
            <Routes>
                <Route path="/beans" element={<Beans />} />
            </Routes>
        </>
    )
}

export default App

