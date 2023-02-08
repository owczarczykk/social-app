import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "pages/home";
import Login from "pages/home";
import Profile from "pages/home";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={Login} />
          <Route path="/home" element={Login} />
          <Route path="/profile/:userID" element={Login} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
