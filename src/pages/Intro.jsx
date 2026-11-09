import { useState } from "react";
import { useNavigate } from "react-router-dom";
import stadium from "../assets/stadium.jpg";

function Intro() {
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);

  const handleEnter = () => {
    setIsLeaving(true);

    setTimeout(() => {
      navigate("/home");
    }, 150);
  };

  return (
    <div
      className={`relative flex min-h-screen items-center justify-center bg-cover bg-center transition-opacity duration-150 ${
        isLeaving ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundImage: `url(${stadium})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 text-center text-white">
        <p className="mb-3 text-sm tracking-[0.4em] text-gray-300">PORTFOLIO</p>

        <h1 className="text-5xl font-extrabold tracking-wider md:text-7xl">
          LEE SEUNG MIN
        </h1>

        <p className="mt-5 text-lg text-gray-200">Welcome to my page</p>

        <button
          onClick={handleEnter}
          className="mt-10 border-2 border-white px-12 py-4 text-lg font-bold tracking-[0.3em] transition duration-150 hover:scale-105 hover:bg-white hover:text-black"
        >
          홈화면 입장
        </button>
      </div>
    </div>
  );
}

export default Intro;
