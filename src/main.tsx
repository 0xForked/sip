import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "@/pages/home"
import Site from "@/pages/site.tsx"
import MainLayout from "@/layouts/main.tsx";
import User from "@/pages/user.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={
                  <MainLayout>
                      <Home/>
                  </MainLayout>
              } />
              <Route path="/sites" element={
                  <MainLayout>
                      <Site/>
                  </MainLayout>
              } />
              <Route path="/users" element={
                  <MainLayout>
                      <User/>
                  </MainLayout>
              } />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
