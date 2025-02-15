import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import MarkdownToHTML from "./pages/MarkdownToHTML.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <MarkdownToHTML />
    <Footer />
  </StrictMode>
);
