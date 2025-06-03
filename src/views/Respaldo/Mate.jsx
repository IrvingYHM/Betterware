import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const MiComponente = () => {
    const [v1, setV1] = useState('');
    const [t1, setT1] = useState('');
    const [v2, setV2] = useState('');
    const [t2, setT2] = useState('');
    const [t, setT] = useState(''); // Nuevo estado para el tiempo
    const [reviews, setReviews] = useState([]);
    const [result, setResult] = useState('');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Ventas vs. Tiempo',
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    });

    const handleChangeV1 = (e) => {
        setV1(e.target.value);
    };

    const handleChangeT1 = (e) => {
        setT1(e.target.value);
    };

    const handleChangeV2 = (e) => {
        setV2(e.target.value);
    };

    const handleChangeT2 = (e) => {
        setT2(e.target.value);
    };

    const handleChangeT = (e) => {
        setT(e.target.value);
    };

    const handleChangeReviews = (e) => {
        // Aquí debes manejar la lógica para almacenar las reseñas, por ejemplo, en un array
        setReviews([...reviews, e.target.value]);
    };

    const calcularK = () => {
        const V1 = parseFloat(v1);
        const T1 = parseFloat(t1);
        const V2 = parseFloat(v2);
        const T2 = parseFloat(t2);
        const tiempo = parseFloat(t); // Obtener el valor de t del estado

        if (!isNaN(V1) && !isNaN(T1) && !isNaN(V2) && !isNaN(T2) && !isNaN(tiempo)) {
            if (V1 > 0 && T1 >= 0 && V2 > 0 && T2 > 0 && tiempo >= 0) {
                const kValue = Math.log(V2 / V1) / (T2 - T1);
                setResult(` El valor de 'k' es: ${kValue.toFixed(4)}`);

                // Calcular V con el tiempo ingresado por el usuario
                const V = Math.round(V1 * Math.exp(kValue * tiempo));
                setResult(prevResult => `${prevResult}\nEl valor de 'V' con t = ${tiempo} meses es: ${V.toFixed(0)}`);

                // Actualizar el estado de los datos de la gráfica
                const newData = {
                    labels: [...chartData.labels, `t=${tiempo}`],
                    datasets: [
                        {
                            ...chartData.datasets[0],
                            data: [...chartData.datasets[0].data, V]
                        }
                    ]
                };
                setChartData(newData);

                // Realizar el análisis con las reseñas
                // Aquí puedes agregar la lógica para analizar las reseñas y su impacto en las ventas
            } else {
                setResult('Por favor, asegúrate de que los valores de ventas sean mayores que 0 y los valores de tiempo sean mayores o iguales a 0.');
            }
        } else {
            setResult('Por favor, introduce números válidos en los campos.');
        }
    };

    return (
        <div className="py-24">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Condiciones Iniciales
            </h1>
            <table className="w-auto border-collapse border border-gray-400 mx-auto md:mx-10 text-center">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2"></th>
                        <th className="border border-gray-400 px-4 py-2"> V = Ventas </th>
                        <th className="border border-gray-400 px-4 py-2">
                            {' '}
                            t = tiempo (meses)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-400 px-4 py-2"> CI</td>
                        <td className="border border-gray-400 px-4 py-2">
                            <input
                                className="w-full px-2 focus:outline-none text-center"
                                type="text"
                                value={v1}
                                onChange={handleChangeV1}
                            />
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            <select
                                className="w-full px-2 focus:outline-none text-center"
                                value={t1}
                                onChange={handleChangeT1}
                            >
                                <option disabled value="">
                                    Selecciona una fecha
                                </option>
                                <option value="0">1 de Enero de 2024</option>
                                <option value="1">1 de Febrero de 2024</option>
                                <option value="2">1 de Marzo de 2024</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-gray-400 px-4 py-2">K</td>
                        <td className="border border-gray-400 px-4 py-2">
                            <input
                                className="w-full px-2 focus:outline-none text-center"
                                type="text"
                                value={v2}
                                onChange={handleChangeV2}
                            />
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            <select
                                className="w-full px-2 focus:outline-none text-center"
                                value={t2}
                                onChange={handleChangeT2}
                            >
                                <option disabled value="">
                                    Selecciona una fecha
                                </option>
                                <option value="1">1 de Febrero de 2024</option>
                                <option value="2">1 de Marzo de 2024</option>
                                <option value="3">1 de Abril de 2024</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-gray-400 px-4 py-2">
                            t (meses)
                        </td>
                        <td className="border border-gray-400 px-4 py-2">?</td>
                        <td className="border border-gray-400 px-4 py-2">
                            <select
                                className="w-full px-2 focus:outline-none text-center"
                                value={t}
                                onChange={handleChangeT}
                            >
                                <option disabled value="">
                                    Selecciona una fecha
                                </option>
                                <option value="4">1 de Mayo de 2024</option>
                                <option value="5">1 de Junio de 2024</option>
                                <option value="6">1 de julio de 2024</option>
                                <option value="7">1 de Agosto de 2024</option>
                                <option value="8">1 de Septiembre de 2024</option>
                                <option value="9">1 de Octubre de 2024</option>
                                <option value="10">1 de Noviembre de 2024</option>
                                <option value="11">1 de Diciembre de 2024</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-center">
                <button
                    onClick={calcularK}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                >
                    Calcular 
                </button>
            </div>
            <p className="text-center mt-2">{result}</p>
            <div>
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default MiComponente;
