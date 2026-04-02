import "./App.css";
import ListPage from "./pages/ListPage";

import SearchPage from "./pages/SearchPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/list" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
