import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Lista from "./pages/Lista";
import "./index.css"; // Importando o CSS global
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="pt-24 sm:pt-28 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/lista" element={<Lista />} />
        </Routes>
      </main>
      <footer className="bg-transparent text-white text-center py-4 mt-8">
        <div>© {new Date().getFullYear()} Todos os direitos reservados.</div>
        <div>Feito por Giovane, Matheus Iuri, Alexandre Mota e Higor Assmé</div>
        <div>Trabalho final da disciplina de Front End - ADSIS3S - Unicesumar Ponta Grossa - PR</div>
        <div>Prof. Emili Everz Golombieski</div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
