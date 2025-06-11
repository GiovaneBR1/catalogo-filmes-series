import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import Voltar from "../components/Voltar";

function Lista() {
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("catalogo")) || [];
    setCatalogo(dadosSalvos);
  }, []);

  const excluirItem = (index) => {
    const novaLista = [...catalogo];
    novaLista.splice(index, 1);
    localStorage.setItem("catalogo", JSON.stringify(novaLista));
    setCatalogo(novaLista);
    // Remover também da lista de adicionados do carrossel
    const adicionadosCarrossel =
      JSON.parse(localStorage.getItem("carrosselAdicionados")) || [];
    const atualizados = adicionadosCarrossel.filter(
      (titulo) => titulo !== catalogo[index].titulo
    );
    localStorage.setItem("carrosselAdicionados", JSON.stringify(atualizados));
  };

  const alternarAssistido = (index) => {
    const novaLista = [...catalogo];
    novaLista[index].assistido = !novaLista[index].assistido;
    localStorage.setItem("catalogo", JSON.stringify(novaLista));
    setCatalogo(novaLista);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tituloDestacado = queryParams.get("titulo");

  const refs = useRef([]);

  const [destaqueIndex, setDestaqueIndex] = useState(null);

  useEffect(() => {
    if (!tituloDestacado || refs.current.length === 0) return;

    const index = catalogo.findIndex((item) => item.titulo === tituloDestacado);
    if (index !== -1 && refs.current[index]) {
      refs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setDestaqueIndex(index);

      // Remove destaque após 3 segundos
      setTimeout(() => setDestaqueIndex(null), 3000);
    }
  }, [catalogo, tituloDestacado]);

  return (
    <div className="max-w-6xl mx-auto p-4 mt-24 min-h-screen">
      <h2 className="titulo-pagina">Filmes e Séries Cadastrados</h2>
      <Voltar />

      <div className="bg-black/40 rounded-xl shadow-lg p-6 backdrop-blur-md">
        {catalogo.length === 0 ? (
          <p className="text-gray-300">Nenhum item cadastrado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {catalogo.map((item, index) => (
              <div
                key={index}
                ref={(el) => (refs.current[index] = el)}
                className={`shadow-md rounded-lg p-4 border border-gray-700 relative transition-all backdrop-blur-md bg-black/60 ${
                  item.assistido
                    ? "ring-2 ring-green-500 opacity-90"
                    : "hover:scale-[1.02]"
                } ${
                  index === destaqueIndex 
                    ? "ring-1 ring-yellow-400 animate-pulse"
                    : ""
                }`}
              >
                {/* Botão de excluir */}
                <button
                  onClick={() => excluirItem(index)}
                  className="absolute top-10 right-2 text-red-500 hover:text-red-700 text-sm bg-red-600 text-yellow-100 font-semibold px-2 py-1 rounded transition-all"
                  title="Excluir"
                >
                  Excluir❌
                </button>

                {/* Botão de marcar como assistido */}
                <button
                  onClick={() => alternarAssistido(index)}
                  className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                    item.assistido
                      ? "bg-green-600 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {item.assistido ? "Assistido" : "Marcar como Assistido"}
                </button>

                <h3 className="text-xl font-bold mb-1 text-yellow-400">
                  {item.titulo}
                </h3>
                <p className="text-gray-300 mb-1">
                  <span className="font-semibold">Gênero:</span> {item.genero}
                </p>

                {/* Badge de nota */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-300">Nota:</span>
                  <span
                    className={`badge ${
                      Number(item.nota) >= 8
                        ? "badge-verde"
                        : Number(item.nota) >= 5
                        ? "badge-amarela"
                        : "badge-vermelha"
                    }`}
                  >
                    {item.nota}
                  </span>
                </div>

                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-gray-300">Sinopse:</span>{" "}
                  {item.sinopse}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Lista;
