import React from "react";
import Joke from "./Pages/Joke/Joke.jsx";
import Liked from "./Pages/Liked/Liked.jsx";
import Saved from "./Pages/Saved/Saved.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Joke />} />
      <Route path="/liked" element={<Liked />} />
      <Route path="/saved" element={<Saved />} />
    </Routes>
  );
}

export default App;
