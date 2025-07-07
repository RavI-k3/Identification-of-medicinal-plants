import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Predict from "./pages/predict";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SampleImages from "./pages/SampleImages";
import Plants from './Plants';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sample-images" element={<SampleImages />} />
        <Route path="/predict" element={<Predict/>} />
      </Routes>
    </Router>
  );
}

export default App;
