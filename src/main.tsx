import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import './styles/global.scss'
import MainPage from "./pages/MainPage/MainPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainPage />
  </StrictMode>,
)
