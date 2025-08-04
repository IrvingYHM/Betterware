import { BsFacebook } from "react-icons/bs";
import caihqr from "../img/caihqr.png";
import { Link } from "react-router-dom";
import { FaCookieBite } from "react-icons/fa";
import poli from "../img/politica.png";

/* import { useCart } from "../views/Lente/hooks/useCart"; */

export default function Footer() {
/*   const { cart } = useCart(); */

  return (
    <footer className="bg-teal-500 w-full">
      <div className="w-full max-w-screen-xl p-4 py-6 mx-auto lg:p-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 md:flex md:items-center">
            <a className="flex items-center mx-auto md:mx-0">
              <img
                src={caihqr}
                className="h-40 mx-auto rounded-md"
                alt="Logo caih"
              />
            </a>
          </div>
          <div className="mb-6 md:mb-0 md:flex md:items-center"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {/* TEXTO FOOTER */}
            <div>
              <h2 className="mb-6 text-lg font-bold uppercase">
                Sobre nosotros
              </h2>
              <Link
                to="/inicio/AcercaDe"
                className="hover:underline -translate-x-1 font-medium space-y-2"
              >
                Acerca de
              </Link>
            </div>

            <div>
              <h2 className="mb-6 text-lg font-bold uppercase">síguenos</h2>
              <a href=""></a>
              <ul className="font-medium">
                <li className="mb-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=100076763264003"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline "
                  >
                    Facebook
                  </a>
                </li>
              </ul>
              {/*               <div>{JSON.stringify(cart, null, 2)}</div> */}
            </div>
            <div>
              <h2 className="mb-6 text-lg font-bold uppercase">Legal</h2>
              <ul className="font-medium space-y-2">
                <li className="mb-4 flex items-center">
                  <img
                    className="-translate-x-2"
                    src={poli}
                    style={{ width: "30px", height: "30px" }}
                    alt="Imagen politica de privacidad"
                  />

                  <Link
                    to="/inicio/avisoP"
                    className="hover:underline -translate-x-1"
                  >
                    Politica de privacidad
                  </Link>
                </li>
                <li className="mb-4 flex items-center ">
                  <FaCookieBite className="mr-2 " style={{ color: "black" }} />
                  <Link to="/inicio/cookies" className="hover:underline">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link to="/inicio/terminosC" className="hover:underline">
                    Terminos y condiciones
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-black sm:text-center">
            © 2023 <a>OptiCenter™</a>. Todos los derechos reservados.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="https://www.facebook.com/profile.php?id=100076763264003"
              target="_blank"
              rel="noreferrer"
              className="text-gray-900 hover:animate-bounce text-2xl"
            >
              <BsFacebook />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

{
  /* <Link
to="avisoP"
className="text-black-600 hover:text-black mx-2 text-sm md:text-base lg:text-lg"
>
Aviso de privacidad
</Link> */
}
