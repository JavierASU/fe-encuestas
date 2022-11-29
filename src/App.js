import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Encuestas from "./components/Encuestas";
import Navbar from "./components/Navbar";
import NuevaEncuesta from "./components/NuevaEncuesta";
import Login from "./pages/Login";

import { Container } from "@mui/material";

export default function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/encuesta" element={<Encuestas />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
