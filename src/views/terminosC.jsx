import Fot from "../components/Footer";
import Barra from "../components/Navegacion/barra"

function App() {
  return (
    <>
    <Barra/>
      <div className="bg-gray-200 flex-center min-h-screen flex justify-center pt-24 pb-10 items-center">
          <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
            <h3 className="text-center text-black font-bold text-xl mb-4">
              Términos y condiciones de OptiCenter
            </h3>
            <p>Última actualización: 14 de noviembre de 2023</p>
            <p>
              Lea atentamente estos términos y condiciones antes de utilizar
              nuestro servicio.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">
              Interpretación y definiciones
            </h2>
            <h3 className="text-lg font-bold">Interpretación</h3>
            <p className="mb-4">
              Las palabras cuya letra inicial está en mayúscula tienen
              significados definidos bajo las siguientes condiciones. Las
              siguientes definiciones tendrán el mismo significado
              independientemente de que aparezcan en singular o en plural.
            </p>

            <h3 className="text-lg font-bold">Definiciones</h3>
            <p className="mb-4">
              Para los efectos de estos Términos y condiciones:
            </p>

            <ul>
              <li>
                <strong>Afiliada</strong> significa una entidad que controla,
                está controlada por o está bajo control común con una parte,
                donde control significa propiedad del 50% o más de las acciones,
                participación accionaria u otros valores con derecho a votar
                para la elección de directores u otra autoridad administrativa.
              </li>
              <li>
                <strong>País</strong> se refiere a: México
              </li>
              <li>
                <strong>Compañía</strong> (denominada la Compañía en este
                Acuerdo) se refiere a OptiCenter Huejutla, Calle Velázquez
                Ibarra 51, Colonia Centro, Ciudad Huejutla de Reyes, Hidalgo, cp
                43000.
              </li>
              <li>
                <strong>dispositivo</strong> significa cualquier dispositivo que
                pueda acceder al Servicio, como una computadora, un teléfono
                celular o una tableta digital.
              </li>
              <li>
                <strong>El servicio</strong> se refiere al sitio web.
              </li>
              <li>
                <strong>Términos y condiciones</strong> (también denominados
                Términos) significan estos Términos y condiciones que forman el
                acuerdo completo entre usted y la Compañía con respecto al uso
                del Servicio.
              </li>
              <li>
                <strong>Servicio de redes sociales de terceros</strong>{" "}
                significa cualquier servicio o contenido (incluidos datos,
                información, productos o servicios) proporcionado por un tercero
                que puede mostrarse, incluirse o ponerse a disposición mediante
                el Servicio.
              </li>
              <li>
                <strong>El sitio web</strong> se refiere a OptiCenter, accesible
                desde{" "}
                <a href="https://opticenteuy.000webhostapp.com/Opticenter/">
                  https://opticenteuy.000webhostapp.com/Opticenter/
                </a>
              </li>
              <li>
                <strong>Usted</strong> se refiere a la persona que accede o
                utiliza el Servicio, o la empresa u otra entidad legal en nombre
                de la cual dicha persona accede o utiliza el Servicio, según
                corresponda.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Reconocimiento</h2>
            <p className="mb-4">
              Estos son los Términos y condiciones que rigen el uso de este
              Servicio y el acuerdo que opera entre Usted y la Compañía. Estos
              Términos y Condiciones establecen los derechos y obligaciones de
              todos los usuarios con respecto al uso del Servicio.
            </p>
            <p className="mb-4">
              Su acceso y uso del Servicio está condicionado a su aceptación y
              cumplimiento de estos Términos y condiciones. Estos Términos y
              condiciones se aplican a todos los visitantes, usuarios y otras
              personas que acceden o utilizan el Servicio.
            </p>
            <p className="mb-4">
              Al acceder o utilizar el Servicio, usted acepta estar sujeto a
              estos Términos y condiciones. Si no está de acuerdo con alguna
              parte de estos Términos y condiciones, no podrá acceder al
              Servicio.
            </p>
            <p className="mb-4">
              Usted declara que es mayor de 18 años. La Compañía no permite que
              menores de 18 años utilicen el Servicio.
            </p>
            <p className="mb-4">
              Su acceso y uso del Servicio también está condicionado a su
              aceptación y cumplimiento de la Política de Privacidad de la
              Compañía. Nuestra Política de privacidad describe Nuestras
              políticas y procedimientos sobre la recopilación, el uso y la
              divulgación de Su información personal cuando utiliza la
              Aplicación o el Sitio web y le informa sobre Sus derechos de
              privacidad y cómo la ley lo protege. Lea atentamente nuestra
              Política de privacidad antes de utilizar nuestro servicio.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Enlaces a otros sitios web
            </h2>
            <p className="mb-4">
              Nuestro Servicio puede contener enlaces a sitios web o servicios
              de terceros que no son propiedad de la Compañía ni están
              controlados por ella.
            </p>
            <p className="mb-4">
              La Compañía no tiene control ni asume ninguna responsabilidad por
              el contenido, las políticas de privacidad o las prácticas de los
              sitios web o servicios de terceros. Además, reconoce y acepta que
              la Compañía no será responsable, directa o indirectamente, de
              ningún daño o pérdida causada o presuntamente causada por o en
              conexión con el uso o la confianza en dicho contenido, bienes o
              servicios disponibles en o a través de dichos sitios web o
              servicios.
            </p>
            <p className="mb-4">
              Le recomendamos encarecidamente que lea los términos y condiciones
              y las políticas de privacidad de los sitios web o servicios de
              terceros que visite.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Terminación</h2>
            <p className="mb-4">
              Podemos cancelar o suspender Su acceso inmediatamente, sin previo
              aviso ni responsabilidad, por cualquier motivo, incluido, entre
              otros, si incumple estos Términos y condiciones.
            </p>
            <p className="mb-4">
              Tras la rescisión, su derecho a utilizar el Servicio cesará
              inmediatamente.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Limitación de responsabilidad
            </h2>
            <p className="mb-4">
              Independientemente de los daños en los que pueda incurrir, la
              responsabilidad total de la Compañía y cualquiera de sus
              proveedores según cualquier disposición de estos Términos y su
              recurso exclusivo por todo lo anterior se limitará al monto
              realmente pagado por usted a través del Servicio o 100 USD, si no
              ha comprado nada a través del Servicio.
            </p>
            <p className="mb-4">
              En la máxima medida permitida por la ley aplicable, en ningún caso
              la Compañía o sus proveedores serán responsables de ningún daño
              especial, incidental, indirecto o consecuente de ningún tipo
              (incluidos, entre otros, daños por pérdida de ganancias, pérdida
              de datos o otra información, por interrupción del negocio, por
              lesiones personales, pérdida de privacidad que surja de o esté
              relacionada de alguna manera con el uso o la imposibilidad de usar
              el Servicio, el software de terceros y/o el hardware de terceros
              utilizado con el Servicio, o de otro modo en relación con
              cualquier disposición de estos Términos), incluso si la Compañía o
              cualquier proveedor han sido advertidos de la posibilidad de tales
              daños e incluso si el remedio no cumple con su propósito esencial.
            </p>
            <p className="mb-4">
              Algunos estados no permiten la exclusión de garantías implícitas o
              la limitación de responsabilidad por daños incidentales o
              consecuentes, lo que significa que algunas de las limitaciones
              anteriores pueden no aplicarse. En estos estados, la
              responsabilidad de cada parte se limitará en la mayor medida
              permitida por la ley.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Descargo de responsabilidad TAL CUAL y SEGÚN DISPONIBILIDAD
            </h2>
            <p className="mb-4">
              El Servicio se le proporciona TAL CUAL y SEGÚN DISPONIBILIDAD y
              con todas las fallas y defectos sin garantía de ningún tipo. En la
              medida máxima permitida por la ley aplicable, la Compañía, en su
              propio nombre y en nombre de sus Afiliados y sus respectivos
              licenciantes y proveedores de servicios, renuncia expresamente a
              todas las garantías, ya sean expresas, implícitas, legales o de
              otro tipo, con respecto a la Servicio, incluidas todas las
              garantías implícitas de comerciabilidad, idoneidad para un
              propósito particular, título y no infracción, y garantías que
              puedan surgir del curso del trato, curso del desempeño, uso o
              práctica comercial.
            </p>
            <p className="mb-4">
              Sin limitación a lo anterior, la Compañía no ofrece garantía ni
              compromiso, y no hace ninguna declaración de ningún tipo de que el
              Servicio cumplirá con Sus requisitos, logrará los resultados
              previstos, será compatible o funcionará con cualquier otro
              software, aplicación, sistema o servicio, operará sin
              interrupción, cumplirá con cualquier estándar de rendimiento o
              confiabilidad, o estará libre de errores o que cualquier error o
              defecto pueda o será corregido.
            </p>
            <p className="mb-4">
              Sin limitar lo anterior, ni la Compañía ni ninguno de los
              proveedores de la compañía hacen ninguna representación o garantía
              de ningún tipo, expresa o implícita: (i) en cuanto al
              funcionamiento o disponibilidad del Servicio, o la información, el
              contenido y los materiales o productos incluidos en el mismo; (ii)
              que el Servicio será ininterrumpido o estará libre de errores;
              (iii) en cuanto a la exactitud, confiabilidad o actualidad de
              cualquier información o contenido proporcionado a través del
              Servicio; o (iv) que el Servicio, sus servidores, el contenido o
              los correos electrónicos enviados desde o en nombre de la Compañía
              están libres de virus, scripts, troyanos, gusanos, malware, bombas
              de tiempo u otros componentes dañinos.
            </p>
            <p className="mb-4">
              Algunas jurisdicciones no permiten la exclusión de ciertos tipos
              de garantías o limitaciones de los derechos legales aplicables de
              un consumidor, por lo que es posible que algunas o todas las
              exclusiones y limitaciones anteriores no se apliquen a usted. Pero
              en tal caso, las exclusiones y limitaciones establecidas en esta
              sección se aplicarán en la mayor medida exigible según la ley
              aplicable.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Ley que rige</h2>
            <p className="mb-4">
              Las leyes del País, excluyendo sus conflictos de normas legales,
              regirán estos Términos y Su uso del Servicio. Su uso de la
              Aplicación también puede estar sujeto a otras leyes locales,
              estatales, nacionales o internacionales.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Resolución de disputas
            </h2>
            <p className="mb-4">
              Si tiene alguna inquietud o disputa sobre el Servicio, acepta
              intentar primero resolver la disputa de manera informal
              comunicándose con la Compañía.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Para usuarios de la Unión Europea (UE)
            </h2>
            <p className="mb-4">
              Si es un consumidor de la Unión Europea, se beneficiará de las
              disposiciones obligatorias de la ley del país en el que reside.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Cumplimiento legal de Estados Unidos
            </h2>
            <p className="mb-4">
              Usted declara y garantiza que (i) no se encuentra en un país que
              esté sujeto al embargo del gobierno de los Estados Unidos, o que
              haya sido designado por el gobierno de los Estados Unidos como un
              país que apoya al terrorismo, y (ii) no está incluido en cualquier
              lista del gobierno de los Estados Unidos de partes prohibidas o
              restringidas.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Divisibilidad y renuncia
            </h2>
            <h3 className="text-xl font-bold mt-6 mb-2">Divisibilidad</h3>
            <p className="mb-4">
              Si alguna disposición de estos Términos se considera inaplicable o
              inválida, dicha disposición se modificará e interpretará para
              lograr los objetivos de dicha disposición en la mayor medida
              posible según la ley aplicable y las disposiciones restantes
              continuarán en pleno vigor y efecto.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-2">Exención</h3>
            <p className="mb-4">
              Salvo lo dispuesto en el presente documento, la falta de ejercicio
              de un derecho o de exigir el cumplimiento de una obligación en
              virtud de estos Términos no afectará la capacidad de una parte
              para ejercer dicho derecho o exigir dicho cumplimiento en
              cualquier momento posterior ni la renuncia a un incumplimiento
              constituirá una renuncia a cualquier incumplimiento posterior.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Traducción e Interpretación
            </h2>
            <p className="mb-4">
              Es posible que estos Términos y condiciones se hayan traducido si
              los hemos puesto a su disposición en nuestro Servicio. Usted
              acepta que el texto original en inglés prevalecerá en caso de
              disputa.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Cambios a estos términos y condiciones
            </h2>
            <p className="mb-4">
              Nos reservamos el derecho, a nuestra entera discreción, de
              modificar o reemplazar estos Términos en cualquier momento. Si una
              revisión es importante, haremos esfuerzos razonables para avisar
              con al menos 30 días de antelación antes de que los nuevos
              términos entren en vigor. Lo que constituye un cambio material se
              determinará a Nuestro exclusivo criterio.
            </p>
            <p className="mb-4">
              Al continuar accediendo o utilizando Nuestro Servicio después de
              que esas revisiones entren en vigencia, usted acepta estar sujeto
              a los términos revisados. Si no acepta los nuevos términos, total
              o parcialmente, deje de utilizar el sitio web y el Servicio.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contáctenos</h2>
            <p className="mb-4">
              Si tiene alguna pregunta sobre estos Términos y condiciones, puede
              contactarnos:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Por correo electrónico:{" "}
                <a href="mailto:OpticenterHuejutla@gmail.com">
                  OpticenterHuejutla@gmail.com
                </a>
              </li>
              <li>
                Visitando esta página en nuestro sitio web:{" "}
                <a href="https://www.facebook.com/profile.php?id=100076763264003">
                  https://www.facebook.com/profile.php?id=100076763264003
                </a>
              </li>
              <li>Por número de teléfono: 7711231054</li>
            </ul>
          </div>
      </div>
      <Fot />
    </>
  );
}

export default App;
