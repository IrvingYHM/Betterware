import { useState } from "react";
import Cat_Abril from "../../img/Catalogos/catalogo_abril_2025.jpg";
import Cat_Mayo from "../../img/Catalogos/catalogo_mayo_2025.jpg";
import Cat_Junio from "../../img/Catalogos/catalogo_junio_2025.jpg";
import Barra from "../../components/Navegacion/barra";
import Fot from "../../components/Footer";

function Catalogos() {
  return (
    <>
      <Barra />
      <div className="p-6 mt-28">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {/* Catálogo 1 */}
          <div className="bg-sky-200 rounded-lg shadow-md p-4 w-80 text-center flex items-center flex-col">
            <h3 className="text-xl font-bold mb-2">Catálogo Abril 2025</h3>
            <img
              src={Cat_Abril}
              alt="Catálogo Otoño 2025"
              className="w-auto h-96 object-cover rounded-md mb-4"
            />
            <a
              href="https://drive.google.com/file/d/18zLOk1I5JAnaDdod-NlRGc6Ctn3gdP42/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-naranja-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-naranja-700 transition"
            >
              Descargar
            </a>
          </div>

          {/* Catálogo 2 */}
          <div className="bg-sky-200 rounded-lg shadow-md p-4 w-80 text-center flex items-center flex-col">
            <h3 className="text-xl font-bold mb-2">Catálogo Mayo 2025</h3>
            <img
              src={Cat_Mayo}
              alt="Catálogo Primavera 2025"
              className="w-auto h-96 object-cover rounded-md mb-4"
            />
            <a
              href="https://storage.googleapis.com/betterware-production-media/content/Paginas_Estaticas/Catalogo%20DIgital/2025/Cat%C3%A1logo%20Digital%20Mayo%2005-225%20Final.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-naranja-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-naranja-700 transition"
            >
              Descargar
            </a>
          </div>

          {/* Catálogo 3 */}
          <div className="bg-sky-200 rounded-lg shadow-md p-4 w-80 text-center flex items-center flex-col">
            <h3 className="text-xl font-bold mb-2">Catálogo Junio 2025</h3>
            <img
              src={Cat_Junio}
              alt="Catálogo Verano 2025"
              className="w-auto h-96 object-cover rounded-md mb-4"
            />
            <a
              href="https://storage.googleapis.com/betterware-production-media/content/Paginas_Estaticas/Catalogo%20DIgital/2025/Cata%CC%81logo%20Digital%20Junio%2006-225.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-naranja-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-naranja-700 transition"
            >
              Descargar
            </a>
          </div>

          {/* Catálogo 1 */}
          <div className="bg-sky-200 rounded-lg shadow-md p-4 w-80 text-center flex items-center flex-col">
            <h3 className="text-xl font-bold mb-2">Catálogo Abril 2025</h3>
            <img
              src={Cat_Abril}
              alt="Catálogo Otoño 2025"
              className="w-auto h-96 object-cover rounded-md mb-4"
            />
            <a
              href="https://drive.google.com/file/d/18zLOk1I5JAnaDdod-NlRGc6Ctn3gdP42/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-naranja-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-naranja-700 transition"
            >
              Descargar
            </a>
          </div>

          {/* Catálogo 2 */}
          <div className="bg-sky-200 rounded-lg shadow-md p-4 w-80 text-center flex items-center flex-col">
            <h3 className="text-xl font-bold mb-2">Catálogo Mayo 2025</h3>
            <img
              src={Cat_Mayo}
              alt="Catálogo Primavera 2025"
              className="w-auto h-96 object-cover rounded-md mb-4"
            />
            <a
              href="https://storage.googleapis.com/betterware-production-media/content/Paginas_Estaticas/Catalogo%20DIgital/2025/Cat%C3%A1logo%20Digital%20Mayo%2005-225%20Final.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-naranja-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-naranja-700 transition"
            >
              Descargar
            </a>
          </div>

          {/* Catálogo 3 */}
          <div className="bg-sky-200 rounded-lg shadow-md p-4 w-80 text-center flex items-center flex-col">
            <h3 className="text-xl font-bold mb-2">Catálogo Junio 2025</h3>
            <img
              src={Cat_Junio}
              alt="Catálogo Verano 2025"
              className="w-auto h-96 object-cover rounded-md mb-4"
            />
            <a
              href="https://storage.googleapis.com/betterware-production-media/content/Paginas_Estaticas/Catalogo%20DIgital/2025/Cata%CC%81logo%20Digital%20Junio%2006-225.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-naranja-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-naranja-700 transition"
            >
              Descargar
            </a>
          </div>
          
        </div>
      </div>
      <Fot />
    </>
  );
}

export default Catalogos;