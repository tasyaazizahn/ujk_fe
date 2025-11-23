import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataSiswa from "./pages/DataSiswa";
import './App.css'

function App() {
  return (
      <React.StrictMode>
      <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<DataSiswa/>}/>
        </Routes>
      </div>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default App
