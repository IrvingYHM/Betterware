import React, { useState, useEffect } from "react";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function ScrollButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const checkScroll = () => {
    // Verifica si el usuario está a una distancia específica de la parte superior o inferior de la página
    if (window.pageYOffset > 400) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }

    if (window.pageYOffset < 400) {
      setShowScrollBottom(true);
    } else {
      setShowScrollBottom(false);
    }
  };

  useEffect(() => {
    checkScroll(); // Verificar la posición del scroll al montar el componente
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="fixed -bottom-[72px] left-2 flex flex- justify-center mb-20">
      <div className="flex flex-col items-center">
        <button
          className={`${
            showScrollTop ? "flex" : "hidden"
          } bg-gray-700 hover:bg-gray-600 text-white rounded-full border-1 border-white `}
          onClick={scrollTop}
        >
          <IoIosArrowUp className="h-12 w-12 pb-1" />
        </button>
        <button
          className={`${
            showScrollBottom ? "flex" : "hidden"
          } bg-gray-700 hover:bg-gray-600 text-white rounded-full border-1 border-white `}
          onClick={scrollBottom}
        >
          <IoIosArrowDown className="h-12 w-12 pt-1" />
        </button>
      </div>
    </div>
  );
}

export default ScrollButton;
