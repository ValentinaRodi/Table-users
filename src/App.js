import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
  </div>
  );
}

export default App;
