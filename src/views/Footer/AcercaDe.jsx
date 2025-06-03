import Fot from "../../components/Footer";
import Barra from "../../components/Navegacion/barra";

function AcercaDe() {
  return (
    <>
    <Barra/>
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-10 bg-gray-100">
        <div className="grid grid-cols-1 gap-8 max-w-6xl w-full px-8">
          {/* Misión */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="py-6 px-8">
              <h2 className="text-3xl text-center font-bold mb-4">Misión</h2>
              <p className="text-justify text-lg">
                En Opticenter Huejutla, la empresa se compromete a ofrecer
                soluciones visuales integrales a sus clientes mediante la
                provisión de lentes oftálmicos y para el sol de alta calidad. La
                misión de Opticenter Huejutla se centra en la mejora de la
                eficiencia operativa de la óptica a través de la automatización
                de procesos esenciales, como la programación de citas,
                recordatorios automáticos, opciones de pago en línea y la
                gestión de historiales de servicios. La empresa busca
                simplificar la experiencia del usuario, al mismo tiempo que
                promueve la importancia de la salud visual y proporciona un
                servicio excepcional mediante la implementación de tecnologías
                innovadoras.
              </p>
            </div>
          </div>

          {/* Visión */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="py-6 px-8">
              <h2 className="text-3xl text-center font-bold mb-4">Visión</h2>
              <p className="text-justify text-lg">
                En Opticenter Huejutla, la visión de la empresa es convertirse
                en líderes destacados en la industria óptica, distinguiéndose
                por su excelencia en la gestión integral y la experiencia del
                cliente. Se proyecta un futuro donde la implementación del
                sistema automatizado no solo optimiza la eficiencia interna,
                sino que también facilita a los clientes el acceso a servicios,
                citas personalizadas y una plataforma informativa en línea. La
                visión de Opticenter Huejutla apunta a consolidar su posición
                como un referente en el cuidado de la salud visual y en la
                oferta de productos de calidad.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="py-6 px-14">
              <h2 className="text-3xl text-center font-bold mb-4">Valores</h2>
              <ul className="list-disc list-outside text-justify text-lg">
                <li>
                  <strong>Ética:</strong> Comprométete con altos estándares
                  éticos en la prestación de servicios ópticos, garantizando la
                  integridad y confidencialidad en todas las interacciones con
                  los clientes.
                </li>
                <li>
                  <strong>Responsabilidad:</strong> Comprométete con prácticas
                  empresariales sostenibles y responsables socialmente, apoyando
                  causas benéficas locales y adoptando medidas para minimizar el
                  impacto ambiental de tu negocio.
                </li>
                <li>
                  <strong>Empatía:</strong> Cultivar la empatía hacia las
                  preocupaciones y necesidades de los clientes, brindando un
                  servicio que demuestre comprensión y cuidado genuino.
                </li>
                <li>
                  <strong>Integridad:</strong> Mantener altos estándares éticos,
                  actuando con honestidad y coherencia en todas las
                  transacciones y relaciones comerciales.
                </li>
                <li>
                  <strong>Colaboración:</strong> Fomentar un ambiente de trabajo
                  colaborativo y promover la comunicación efectiva entre el
                  equipo, lo que contribuirá a un mejor servicio al cliente.
                </li>
                <li>
                  <strong>Flexibilidad:</strong> Ser adaptable a las necesidades
                  cambiantes del mercado y del cliente, permitiendo ajustes
                  ágiles en productos y servicios.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Fot />
    </>
  );
}

export default AcercaDe;
