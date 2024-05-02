import React from "react";
import Home from "./views/Home";
import ThoughtForm from "./views/ThoughtForm";
import ThoughtDetails from "./views/ThoughtDetails";
import ThoughtUpdate from "./views/ThoughtUpdate";
import Index from "./views/Index";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/thoughtForm" element={<ThoughtForm/>} />
        <Route path="/thoughtDetails/:id" element={<ThoughtDetails/>} />
        <Route path="/thoughtUpdate/:id" element={<ThoughtUpdate/>} />
        <Route path="/" element={<Index/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;