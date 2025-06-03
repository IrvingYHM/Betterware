import { useState } from "react";
/* import Navbar from "../components/BarraNavegacion"; */
import Slider from "../home/slider";
import Fot from "../components/Footer";
import imagen from "../img/Productos/Agua-Fresh.webp";
import imagen2 from "../img/Productos/Better-Tostador.webp";
import imagen3 from "../img/Productos/Escurridor-Max-Resist.webp";
import Scrool from '../components/scroll';
import Barra from "../components/Navegacion/barra";
import banner from "../img/Anuncios/Afiliate/afiliaciones2.jpg";
import banner2 from "../img/Anuncios/Afiliate/afiliaciones6.jpg";


function App() {
  return (
    <>
      {/*       <Navbar /> */}

      <Barra />
      <script
        src="//code.tidio.co/lr3byfcdvywtakcwkxqmh0yvvnggymum.js"
        async
      ></script>
      <div className="flex flex-col lg:flex-row mt-16 px-4 lg:px-12 gap-6">
        <div className="w-full lg:w-3/4 my-16">
          <Slider />
          <br />

          {/* Separador de promociones */}
          <div className="flex items-center justify-center my-12">
            <div className="h-2 bg-betterware flex-1"></div>
            <span className="mx-4 text-2xl md:text-5xl font-bold uppercase tracking-wider">
              Promociones
            </span>
            <div className="h-2 bg-betterware flex-1"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-center">
            <div className="max-w-sm rounded overflow-hidden shadow-lg mx-8">
              <img className="w-full h-72" src={imagen} alt="Agua Fresh" />

              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 ">Agua Fresh</div>
                <p className="text-gray-700 text-justify">
                  Ten agua fría y lista para servir directo del refri gracias la
                  llave dosificadora integrada de Agua Fresh, un contenedor con
                  dispensador de líquidos de diseño angosto, fácil de sujetar y
                  organizar.
                </p>
              </div>
            </div>

            {/* Aquí empieza El segundo */}
            <div className="max-w-sm rounded overflow-hidden shadow-lg mx-8">
              <img
                className="w-full h-72"
                src={imagen2}
                alt="Better Tostador"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 ">Better Tostador</div>
                <p className="text-gray-700 text-justify">
                  Descubre el Better Tostador Betterware, el tostador de pan
                  ideal para calentar distintos panes de manera rápida y
                  sencilla. Incluye 2 accesorios: una amplia rejilla en la cual
                  puedes colocar hasta un sandwich completo y una pinza que
                  facilitan el manejo de tus alimentos. Cuenta con 7 niveles de
                  tostado y 2 opciones predeterminadas. Además, es muy fácil de
                  limpiar ya que cuenta con bandeja de migajas extraíble. ¡No te
                  quedes sin el tuyo y disfruta de un pan crujiente en minutos!
                </p>
              </div>
            </div>

            {/* Aquí empieza el tercero */}
            <div className="max-w-sm rounded overflow-hidden shadow-lg mx-8">
              <img
                className="w-full h-72"
                src={imagen3}
                alt="Escurridor Max Resist"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 ">
                  Escurridor Max Resist
                </div>
                <p className="text-gray-700 text-justify">
                  Descubre el Escurridor Max Resist Betterware, ideal para una
                  cocina organizada. Este escurridor de gran tamaño tiene dos
                  niveles, permitiéndote secar más vajilla. Es extensible, lo
                  que incrementará el espacio de secado. Incluye una base con
                  desagüe para evitar acumulaciones de agua. Su diseño incorpora
                  un organizador de vasos y cubierto. Además su segundo nivel
                  tiene máxima altura, lo que maximizará tu espacio.
                </p>
              </div>
            </div>
          </div>
          <br />
        </div>
        <Scrool />

        {/* Banner de Nuevas Afiliaciones Betterware */}
        <div className="my-16 w-3/12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-4 rounded-xl shadow-md">
          <div className="rounded-xl">
            <img
              src={banner}
              alt="Afíliate a Betterware"
              className="rounded-md mb-3"
            />
            <h3 className="text-lg font-bold mb-2">¡Afíliate a Betterware!</h3>
            <p className="text-sm mb-4">
              Gana comisiones, accede a promociones exclusivas y transforma tu
              futuro con nosotros.
            </p>
            <a
              href="#afiliaciones"
              className="block justify-self-center w-2/4 text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition"
            >
              Afíliate ahora
            </a>
          </div>

          {/* Anucio Afiliate 2 */}
          <div className="rounded-xl mt-10">
            <img
              src={banner2}
              alt="Afíliate a Betterware"
              className="rounded-md mb-3"
            />
            <h3 className="text-lg font-bold mb-2">¡Afíliate a Betterware!</h3>
            <p className="text-sm mb-4">
              Gana comisiones, accede a promociones exclusivas y transforma tu
              futuro con nosotros.
            </p>
            <a
              href="#afiliaciones"
              className="block justify-self-center w-2/4 text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition"
            >
              Afíliate ahora
            </a>
          </div>
        </div>
      </div>

      <Fot />
    </>
  );
}

export default App;
