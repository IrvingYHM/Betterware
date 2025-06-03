import { useState, useEffect } from "react";
/* import Aside from "../../../../components/Aside"; */
/* import Layout from "../../Layout"; */
/* import { arraycitas } from "../../../../helpers/ArrayCitas"; */
/* import { Input } from "../../../../components/Ui/Input"; */
import Chart from 'chart.js/auto';
const arraycitas = [
    { id: 1, fecha: "2024-01-01", peso: 10, altura: 0.5 },
    { id: 2, fecha: "2024-02-01", peso: 11, altura: 0.6 },
    { id: 3, fecha: "2024-03-01", peso: 12, altura: 0.7 },
    // Otras fechas...
];
function Mate() {
    const [fechas, setFechas] = useState(arraycitas);
    const [fechaInicialSeleccionada, setFechaInicialSeleccionada] = useState(null);
    const [fechaFinalSeleccionada, setFechaFinalSeleccionada] = useState(null);
    const [infoFechaSeleccionada, setInfoFechaSeleccionada] = useState(null);
    const [infoFechaSeleccionada2, setInfoFechaSeleccionada2] = useState(null);
    const [mesSeleccionado, setMesSeleccionado] = useState("");
    const [peso1, setPeso1] = useState(0)
    const [peso2, setPeso2] = useState(0)
    const [peso3, setPeso3] = useState(0)
    const [resultado, setResultado] = useState({
        peso: "",
        altura: "",
        imc: "",
        alimento: ""
    });

    

    useEffect(() => {
        if (fechaInicialSeleccionada !== null) {
            const fechaSeleccionada = fechas.find(item => item.id === fechaInicialSeleccionada);
            setInfoFechaSeleccionada(fechaSeleccionada);
        }
    }, [fechaInicialSeleccionada, fechas]);

    useEffect(() => {
        if (fechaFinalSeleccionada !== null) {
            const fechaSeleccionada2 = fechas.find(item => item.id === fechaFinalSeleccionada);
            setInfoFechaSeleccionada2(fechaSeleccionada2);
        }
    }, [fechaFinalSeleccionada, fechas]);

    const fechasFiltradas = fechas.filter(item => item.id > fechaInicialSeleccionada);

    const handleFechaInicialChange = (event) => {
        const fechaSeleccionada = parseInt(event.target.value);
        setFechaInicialSeleccionada(fechaSeleccionada);
    };

    const handleFechaFinalChange = (event) => {
        const fechaSeleccionada = parseInt(event.target.value);
        setFechaFinalSeleccionada(fechaSeleccionada);
    };

    const handleMesChange = (event) => {
        const mesSeleccionado = event.target.value;
        setMesSeleccionado(mesSeleccionado);
    };

    const meses = [{ mes: 1 }, { mes: 2 }, { mes: 3 }, { mes: 4 }, { mes: 5 }, { mes: 6 }, { mes: 7 }, { mes: 8 }, { mes: 9 }, { mes: 10 }, { mes: 11 }, { mes: 12 }];

    const ed = () => {
        if (infoFechaSeleccionada && infoFechaSeleccionada2 && mesSeleccionado) {
            let pesoInicial = parseFloat(infoFechaSeleccionada.peso);
            let pesoFinal = parseFloat(infoFechaSeleccionada2.peso);
            let alturaInicial = parseFloat(infoFechaSeleccionada.altura);
            let alturaFinal = parseFloat(infoFechaSeleccionada2.altura);
            let tiempoFinal = parseFloat(infoFechaSeleccionada2.id - infoFechaSeleccionada.id);
            let t = parseInt(mesSeleccionado) + (infoFechaSeleccionada2.id - infoFechaSeleccionada.id);

            let k2peso = Math.log(pesoFinal / pesoInicial) / tiempoFinal;
            let kpeso = k2peso.toFixed(4);

            let k2altura = Math.log(alturaFinal / alturaInicial) / tiempoFinal;
            let kaltura = k2altura.toFixed(4)

            let resultLogPeso = Math.exp(kpeso * t).toFixed(4);
            let resultLogAltura = Math.exp(kaltura * t).toFixed(4);

            let peso = (pesoInicial * resultLogPeso).toFixed(2);
            let altura = (alturaInicial * resultLogAltura).toFixed(2);
            let imc = peso / (altura * altura);
            let alimento = peso * 0.025;

            setPeso1(pesoInicial);
            setPeso2(pesoFinal);
            setPeso3(peso);

            console.log(t);

            setResultado({
                peso: peso,
                altura: altura,
                imc: imc,
                alimento: alimento
            });
        }
    };

    useEffect(() => {
        ed();
    }, [infoFechaSeleccionada, infoFechaSeleccionada2, mesSeleccionado]);

    useEffect(() => {
        ed();
    }, [fechaInicialSeleccionada, fechaFinalSeleccionada]);

    useEffect(() => {
        const ctx = document.getElementById('grafico').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Mes 1", "Mes 2", "Mes calculado"],
                datasets: [{
                label: 'Peso',
                data: [peso1, peso2, peso3],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
                }]
            },
            options: {
                scales: {
                x: {
                    title: {
                    display: true,
                    text: 'Número de mes'
                    },
                    beginAtZero: true
                },
                y: {
                    title: {
                    display: true,
                    text: 'kilos'
                    },
                    beginAtZero: true
                }
                }
            }
        });

        // Limpia el gráfico cuando el componente se desmonta
        return () => {
            myChart.destroy();
        };
    }, [ peso1, peso2, peso3]);

    const handleNuevo = () => {
        setPeso1(0);
        setPeso2(0);
        setPeso3(0);
        setFechaInicialSeleccionada(null);
        setFechaFinalSeleccionada(null);
        setInfoFechaSeleccionada(null);
        setInfoFechaSeleccionada2(null);
        setMesSeleccionado(null);
    }

    return (
            <div className="flex py-24">
{/*                 <Aside selected={1} /> */}
                <div className="w-full h-[100vh] overflow-y-scroll">
                    <div className="mx-10">
                        <h1 className="bg-secondaryBlue text-primaryBlue p-3 text-3xl text-center mt-5">Calculo del aumento de alimento de mi mascota Malu</h1>

                        <div className="flex">
                            <div className="w-2/6 pr-5">
                                <div className="bg-primaryBlue w-[80%] ml-[10%] rounded-full mb-5 mt-5">
                                    <img src="https://res.cloudinary.com/dl8odylct/image/upload/v1712448966/jireh/mascotas/malu_sigsmx.png" className="w-[100%] h-[100%]" />
                                </div>

                                <button 
                                    className="w-full rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                                    font-semibold uppercase text-secondaryBlue transition-all duration-300
                                    hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                                    hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                                    active:rounded-2xl active:shadow-none"
                                onClick={handleNuevo}>Nuevo</button> 
                            </div>
                            <div className="w-4/6">
                                <div className="w-full bg-primaryBlue p-5 mt-10">
                                <h1 className="bg-secondaryBlue text-primaryBlue p-2 my-2">- Seleccione una fecha inicial</h1>
                                <div className="">
                                    {fechaInicialSeleccionada === null
                                        ?
                                        <select
                                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                            id="fechaInicial"
                                            onChange={handleFechaInicialChange}
                                            value={fechaInicialSeleccionada || ""}
                                        >
                                            <option value="">Seleccione un fecha inicial</option>
                                            {fechas.map((item, index) => (
                                                <option key={index} value={item.id} className='bg-secondaryBlue text-primaryBlue'>
                                                    {item.fecha}
                                                </option>
                                            ))}
                                        </select>
                                        :
                                        <div className="flex justify-between w-full">
                                            <div className="border border-secondaryBlue w-1/4">
                                                <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                                    <h1 className="text-center font-bold">Datos</h1>
                                                </div>
                                                <div className="bg-secondaryBlue">
                                                    <h1 className="text-center">CI</h1>
                                                </div>
                                            </div>

                                            <div className="border border-secondaryBlue w-1/4">
                                                <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                                    <h1 className="text-center font-bold">Peso (kg)</h1>
                                                </div>
                                                <div className="bg-secondaryBlue">
                                                    <h1 className="text-center">Peso: {infoFechaSeleccionada?.peso}</h1>
                                                </div>
                                            </div>

                                            <div className="border border-secondaryBlue w-1/4">
                                                <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                                    <h1 className="text-center font-bold">Altura (m)</h1>
                                                </div>
                                                <div className="bg-secondaryBlue">
                                                    <h1 className="text-center">Altura: {infoFechaSeleccionada?.altura}</h1>
                                                </div>
                                            </div>

                                            <div className="border border-secondaryBlue w-1/4">
                                                <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                                    <h1 className="text-center font-bold">Tiempo (meses)</h1>
                                                </div>
                                                <div className="bg-secondaryBlue">
                                                    <h1 className="text-center">Fecha: {infoFechaSeleccionada?.fecha}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>

                                {fechaInicialSeleccionada && (
                                    <>
                                        <h1 className="bg-secondaryBlue text-primaryBlue p-2 mt-8 mb-2">- Seleccione una fecha final</h1>
                                        {fechaFinalSeleccionada === null
                                            ?
                                            <div className="">
                                                <select
                                                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                        focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                                    id="fechaFinal"
                                                    onChange={handleFechaFinalChange}
                                                    value={fechaFinalSeleccionada || ""}
                                                >
                                                    <option value="">Seleccione un fecha final</option>
                                                    {fechasFiltradas.map((item, index) => (
                                                        <option key={index} value={item.id} className='bg-secondaryBlue text-primaryBlue'>
                                                            {item.fecha}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            :
                                            <div className="flex justify-between w-full">
                                                <div className="border border-secondaryBlue w-1/4">
                                                    <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                                        <h1 className="text-center font-bold">Datos</h1>
                                                    </div>
                                                    <div className="bg-secondaryBlue">
                                                        <h1 className="text-center">K</h1>
                                                    </div>
                                                </div>

                                                <div className="border border-secondaryBlue w-1/4">
                                                    <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                                        <h1 className="text-center font-bold">Peso (kg)</h1>
                                                    </div>
                                                    <div className="bg-secondaryBlue">
                                                        <h1 className="text-center">Peso: {infoFechaSeleccionada2?.peso}</h1>
                                                    </div>
                                                </div>

                                                <div className="border border-secondaryBlue w-1/4">
                                                    <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                                        <h1 className="text-center font-bold">Altura (m)</h1>
                                                    </div>
                                                    <div className="bg-secondaryBlue">
                                                        <h1 className="text-center">Altura: {infoFechaSeleccionada2?.altura}</h1>
                                                    </div>
                                                </div>

                                                <div className="border border-secondaryBlue w-1/4">
                                                    <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                                        <h1 className="text-center font-bold">Tiempo (meses)</h1>
                                                    </div>
                                                    <div className="bg-secondaryBlue">
                                                        <h1 className="text-center">Fecha: {infoFechaSeleccionada2?.fecha}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </>
                                )}

                                {fechaFinalSeleccionada && (
                                    <>
                                        <h1 className="bg-secondaryBlue text-primaryBlue p-2 mt-8 mb-2">- Seleccione para predecir hasta 12 meses adelante de la fecha final</h1>
                                        <div className="">
                                            <select
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                    focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                                id="fecha12Meses"
                                                onChange={handleMesChange}
                                                value={mesSeleccionado}
                                            >
                                                <option value="">Seleccione una fecha a 12 meses adelante</option>
                                                {meses.map((item, index) => (
                                                    <option key={index} value={item.mes} className='bg-secondaryBlue text-primaryBlue'>
                                                        Mes {item.mes}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}
                            </div>
                            {mesSeleccionado !== "" && fechaInicialSeleccionada && fechaFinalSeleccionada &&
                                <div className="my-10">
                                    <h1 className="bg-secondaryBlue text-primaryBlue p-2 text-2xl text-center">Resultados</h1>
                                    <div className="flex space-x-10 mt-5">
                                        <div className="w-full">
                                            <h1>Peso:</h1>
{/*                                             <Input
                                                disabled
                                                value={resultado.peso}
                                            /> */}
                                        </div>
                                        <div className="w-full">
                                            <h1>Altura:</h1>
{/*                                             <Input
                                                disabled
                                                value={resultado.altura}
                                            /> */}
                                        </div>
                                    </div>
                                    <div className="flex space-x-10 mt-5">
                                        <div className="w-full">
                                            <h1>IMC:</h1>
{/*                                             <Input
                                                disabled
                                                value={resultado.imc}
                                            /> */}
                                        </div>
                                        <div className="w-full">
                                            <h1>Porción diaria de alimento:</h1>
{/*                                             <Input
                                                disabled
                                                value={resultado.alimento}
                                            /> */}
                                        </div>
                                    </div>
                                </div>
                            }
                            </div>
                        </div>
                        
                        <h1 className="bg-secondaryBlue text-primaryBlue p-2 mt-8 mb-2">- Gráfica</h1>
                        <canvas id="grafico" width="100" height="100"></canvas>
                    </div>
                </div>
            </div>
    )
}

export default Mate;