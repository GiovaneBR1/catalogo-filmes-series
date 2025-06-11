import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Voltar() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-20 left-4 z-50 bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-2 shadow"
    >
      <FaArrowLeft />
      Voltar
    </button>
  );
}

export default Voltar;
