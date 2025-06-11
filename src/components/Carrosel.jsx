import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const filmes = [
  {
    titulo: "Stranger Things",
    tituloOMDb: "Stranger Things",
    imagem: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
  },
  {
    titulo: "Vingadores: Ultimato",
    tituloOMDb: "Avengers: Endgame",
    imagem: "https://image.tmdb.org/t/p/w500/q6725aR8Zs4IwGMXzZT8aC8lh41.jpg",
  },
  {
    titulo: "Supernatural",
    tituloOMDb: "Supernatural",
    imagem: "https://image.tmdb.org/t/p/w500/KoYWXbnYuS3b0GyQPkbuexlVK9.jpg",
  },
  {
    titulo: "Breaking Bad",
    tituloOMDb: "Breaking Bad",
    imagem: "https://images2.vudu.com/poster2/353871-360",
  },
  {
    titulo: "Game of Thrones",
    tituloOMDb: "Game of Thrones",
    imagem: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
  },
  {
    titulo: "Homem-Aranha: Sem Volta Para Casa",
    tituloOMDb: "Spider-Man: No Way Home",
    imagem: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  },
];

// Setas personalizadas
const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 left-0 z-10 cursor-pointer bg-blue-800 text-white rounded-full p-2 shadow"
  >
    <FaChevronLeft />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 right-0 z-10 cursor-pointer bg-blue-800 text-white rounded-full p-2 shadow"
  >
    <FaChevronRight />
  </div>
);

function Carrossel() {
  const [adicionados, setAdicionados] = useState([]);

  // Carrega do localStorage ao iniciar
  useEffect(() => {
    const salvos =
      JSON.parse(localStorage.getItem("carrosselAdicionados")) || [];
    setAdicionados(salvos);
  }, []);

  const navigate = useNavigate();

  const adicionarFilme = async (tituloOMDb) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          tituloOMDb
        )}&apikey=b8adc2b`
      );
      const data = await response.json();

      if (data.Response === "False") {
        alert("Filme não encontrado.");
        return;
      }

      const novoFilme = {
        titulo: data.Title,
        genero: data.Genre,
        nota: data.imdbRating,
        sinopse: data.Plot,
        assistido: false,
      };

      const catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];

      const jaExiste = catalogo.some(
        (item) => item.titulo === novoFilme.titulo
      );
      if (jaExiste) return;

      catalogo.push(novoFilme);
      localStorage.setItem("catalogo", JSON.stringify(catalogo));

      // Atualiza estado e salva os adicionados do carrossel
      const novosAdicionados = [...adicionados, novoFilme.titulo];
      setAdicionados(novosAdicionados);
      localStorage.setItem(
        "carrosselAdicionados",
        JSON.stringify(novosAdicionados)
      );
    } catch (error) {
      console.error("Erro ao adicionar filme:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="my-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Mais Populares</h2>
      <Slider {...settings}>
        {filmes.map((f, index) => {
          const jaAdicionado = adicionados.includes(f.tituloOMDb);
          return (
            <div key={index} className="px-2 text-center">
              <img
                src={f.imagem}
                alt={f.titulo}
                className="rounded-lg shadow-md h-72 object-cover w-full cursor-pointer"
                onClick={() =>
                  navigate(`/lista?titulo=${encodeURIComponent(f.tituloOMDb)}`)
                }
                title="Ver na lista"
              />

              <p className="mt-2 font-semibold text-white">{f.titulo}</p>

              <button
                onClick={() => adicionarFilme(f.tituloOMDb)}
                className={`mt-2 px-4 py-1 rounded font-semibold text-sm transition ${
                  jaAdicionado
                    ? "bg-green-600 text-white cursor-default"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
                disabled={jaAdicionado}
              >
                {jaAdicionado ? "✅ Adicionado!" : "+ Adicionar à lista"}
              </button>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Carrossel;
