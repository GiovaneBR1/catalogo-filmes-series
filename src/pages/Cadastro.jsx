import { useState } from "react";
import Voltar from "../components/Voltar";

function Cadastro() {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [nota, setNota] = useState("");
  const [sinopse, setSinopse] = useState("");

  const buscarNaAPI = async () => {
    if (!titulo.trim()) {
      alert("Digite o título para buscar.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=b8adc2&language=pt-BR`
      );
      const data = await response.json();

      if (data.Response === "False") {
        alert("Filme/série não encontrado.");
        return;
      }

      setGenero(data.Genre || "");
      setNota(data.imdbRating || "");
      setSinopse(data.Plot || "");
    } catch (error) {
      console.error("Erro ao buscar:", error);
      alert("Erro ao buscar.");
    }
  };

  const salvarFilme = (e) => {
    e.preventDefault();

    if (!titulo || !genero || !nota || !sinopse) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoItem = { titulo, genero, nota, sinopse, assistido: false };

    const catalogoAtual = JSON.parse(localStorage.getItem("catalogo")) || [];
    catalogoAtual.push(novoItem);
    localStorage.setItem("catalogo", JSON.stringify(catalogoAtual));

    setTitulo("");
    setGenero("");
    setNota("");
    setSinopse("");

    alert("Filme/série cadastrado com sucesso!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative">
      {/* Botão Voltar fixo no canto superior esquerdo */}
      <div className="absolute top-4 left-4 z-10">
        <Voltar />
      </div>
      <div className="w-full max-w-3xl p-6 bg-black/70 backdrop-blur-md shadow-md rounded-lg border border-gray-700 mt-2">
        <div className="mb-8 flex items-center gap-4">
          <h2 className="titulo-pagina text-center flex-1">Cadastrar Filme/Série</h2>
        </div>
        <form onSubmit={salvarFilme} className="space-y-4">
          {/* Campo Título + botão API */}
          <div>
            <label className="label-form">Título:</label>
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="text"
                className="input-form flex-1"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Digite o nome do filme ou série"
              />
            </div>
          </div>

          <div>
            <label className="label-form">Gênero:</label>
            <input
              type="text"
              className="input-form"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />
          </div>

          <div>
            <label className="label-form">Nota (IMDb):</label>
            <input
              type="text"
              className="input-form"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />
          </div>

          <div>
            <label className="label-form">Sinopse:</label>
            <textarea
              className="textarea-form"
            ></textarea>
          </div>

          <button type="submit" className="btn-primario w-full sm:w-auto">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
