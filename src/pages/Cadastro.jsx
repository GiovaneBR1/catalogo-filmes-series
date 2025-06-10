import { useState } from "react";

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
    <div className="card-form mt-28 max-w-3xl mx-auto p-6 bg-black/70 backdrop-blur-md shadow-md rounded-lg border border-gray-700">
      <h2 className="titulo-pagina text-center">Cadastrar Filme/Série</h2>

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
            value={sinopse}
            onChange={(e) => setSinopse(e.target.value)}
            placeholder="Escreva uma breve sinopse..."
          ></textarea>
        </div>

        <button type="submit" className="btn-primario w-full sm:w-auto">
          Salvar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
