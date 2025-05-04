import {BrowserRouter, Routes, Route} from "react-router-dom";
import Backtest from "./pages/Backtest.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Backtest />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
