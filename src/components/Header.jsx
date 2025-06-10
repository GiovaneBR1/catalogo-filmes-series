import { Link } from "react-router-dom";
import '../index.css'; // Importando o CSS global

function Header() {
  return (
    <header className="bg-black/0 backdrop-blur-md text-white py-4 shadow-md fixed w-full z-50">
      <div className="max-w-8xl mx-auto px-6 flex justify-between items-center">
        <h1 className="text-x1 lg:text-2xl font-bold flex items-center gap-2 text-yellow-700">
          <span role="img" aria-label="filme">🎬</span>
          Catálogo de Filmes e Séries
        </h1>
        <nav className="space-x-6 text-sm sm:text-base">
          <Link to="/" className="text-white hover:text-yellow-400 text-sm bg-blue-900  text-white-100 font-semibold px-2 py-1 rounded transition-all">Home</Link>
          <Link to="/cadastro" className="text-white hover:text-yellow-400 text-sm bg-blue-900  text-white-100 font-semibold px-2 py-1 rounded transition-all">Cadastro</Link>
          <Link to="/lista" className="text-white hover:text-yellow-400 text-sm bg-blue-900  text-white-100 font-semibold px-2 py-1 rounded transition-all">Lista</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
