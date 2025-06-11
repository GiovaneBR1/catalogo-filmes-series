import { Link } from "react-router-dom";
import Carrossel from "../components/Carrosel";

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-28 text-center text-white">
      <h2 className="titulo-pagina text-4xl">🎬 Bem-vindo ao CineList</h2>

      <p className="texto-claro mt-4 max-w-3xl mx-auto">
        Aqui você pode cadastrar seus filmes e séries favoritas, visualizar uma lista organizada, marcar como assistido e manter seu catálogo pessoal atualizado.
      </p>

      {/* Botões de navegação */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap max-w-md mx-auto">
        <Link
          to="/cadastro"
          className="btn-primario"
        >
          Cadastrar Novo
        </Link>
        <Link
          to="/lista"
          className="btn-secundario"
        >
          Ver Lista
        </Link>
      </div>

      {/* Carrossel de Destaques */}
      <Carrossel />
    </div>
  );
}

export default Home;
