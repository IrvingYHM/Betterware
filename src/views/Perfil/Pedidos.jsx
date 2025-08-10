import React from 'react';
import { useState } from 'react';
import Barra from "../../components/Navegacion/barra";
import Fot from "../../components/Footer";

const OrderHistory = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  return (
    <div>
      <section className="mt-20 lg:mt-36 relative">
        <Barra/>
        
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-8">
          <h2 className="font-manrope font-bold text-3xl leading-10 mb-9 text-center">Historial de órdenes</h2>

          <div className="flex sm:flex-col lg:flex-row sm:items-center justify-between">
            <div className="flex max-sm:flex-col items-center justify-end gap-2 max-lg:mt-5">
              <div className="flex rounded-full py-3 px-4 border border-gray-300 relative">
                <svg className="relative " width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.5 7.75H16.5M11.9213 11.875H11.928M11.9212 14.125H11.9279M9.14676 11.875H9.1535M9.14676 14.125H9.1535M6.37088 11.875H6.37762M6.37088 14.125H6.37762M5.25 4.75V1.75M12.75 4.75V1.75M7.5 18.25H10.5C13.3284 18.25 14.7426 18.25 15.6213 17.3713C16.5 16.4926 16.5 15.0784 16.5 12.25V9.25C16.5 6.42157 16.5 5.00736 15.6213 4.12868C14.7426 3.25 13.3284 3.25 10.5 3.25H7.5C4.67157 3.25 3.25736 3.25 2.37868 4.12868C1.5 5.00736 1.5 6.42157 1.5 9.25V12.25C1.5 15.0784 1.5 16.4926 2.37868 17.3713C3.25736 18.25 4.67157 18.25 7.5 18.25Z"
                    stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  name="from-dt"
                  id="from-dt"
                  className="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900"
                  placeholder="11-01-2023"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <p className="font-medium text-lg leading-8 text-black">A</p>
              <div className="flex rounded-full py-3 px-4 border border-gray-300 relative">
                <svg className="relative " width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.5 7.75H16.5M11.9213 11.875H11.928M11.9212 14.125H11.9279M9.14676 11.875H9.1535M9.14676 14.125H9.1535M6.37088 11.875H6.37762M6.37088 14.125H6.37762M5.25 4.75V1.75M12.75 4.75V1.75M7.5 18.25H10.5C13.3284 18.25 14.7426 18.25 15.6213 17.3713C16.5 16.4926 16.5 15.0784 16.5 12.25V9.25C16.5 6.42157 16.5 5.00736 15.6213 4.12868C14.7426 3.25 13.3284 3.25 10.5 3.25H7.5C4.67157 3.25 3.25736 3.25 2.37868 4.12868C1.5 5.00736 1.5 6.42157 1.5 9.25V12.25C1.5 15.0784 1.5 16.4926 2.37868 17.3713C3.25736 18.25 4.67157 18.25 7.5 18.25Z"
                    stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  name="to-dt"
                  id="to-dt"
                  className="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900"
                  placeholder="11-01-2023"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-7 border border-gray-300 pt-9">
            <OrderItem
              orderNumber="#10234987"
              paymentDate="18 de marzo de 2021"
              status="Entregado"
              deliveryDate="23 de marzo de 2021"
              productName="Flor decorativa en maceta"
              productImage="https://pagedone.io/asset/uploads/1705474774.png"
              productBy="Dust Studios"
              productSize="s"
              productQty="1"
              productPrice="$80.00"
              totalPrice="$200.00"
            />
{/*             <OrderItem
              orderNumber="#10234987"
              paymentDate="18 de marzo de 2021"
              status="Cancelado"
              deliveryDate="23 de marzo de 2021"
              productName="Artículo decorativo"
              productImage="https://pagedone.io/asset/uploads/1705474672.png"
              productBy="Dust Studios"
              productSize="s"
              productQty="1"
              productPrice="$80.00"
              totalPrice="$200.00"
            /> */}
          </div>
        </div>
      </section>
      <Fot/>
    </div>
  );
};

const OrderItem = ({
  orderNumber,
  paymentDate,
  status,
  deliveryDate,
  productName,
  productImage,
  productBy,
  productSize,
  productQty,
  productPrice,
  totalPrice,
}) => {
  return (
    <>
      <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
        <div className="data">
          <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">Orden: {orderNumber}</p>
          <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">Pago de la orden: {paymentDate}</p>
        </div>
        <div className="flex items-center gap-3 max-md:mt-5">
{/*           <button className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">
            Mostrar factura
          </button> */}
{/*           <button className="rounded-full px-7 py-3 bg-indigo-600 shadow-sm shadow-transparent text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700">
            Comprar ahora
          </button> */}
        </div>
      </div>
      <div className="flex max-md:flex-col max-md:items-start items-center justify-between mt-7 px-3 md:px-11 border-t border-gray-300 py-9">
        <div className="flex gap-10 items-center max-md:w-full max-md:gap-3">
          <img className="w-36 rounded-md" src={productImage} alt={productName} />
          <div className="info flex-1">
            <p className="font-medium text-lg leading-8 text-black">{productName}</p>
            <p className="font-semibold text-sm leading-7 text-gray-500 mt-1">Por {productBy}</p>
            <p className="font-medium text-sm leading-7 text-gray-900 mt-6">Tamaño: <span className="font-semibold text-sm leading-7 text-gray-500">{productSize}</span></p>
            <p className="font-medium text-sm leading-7 text-gray-900 mt-1">Cantidad: <span className="font-semibold text-sm leading-7 text-gray-500">{productQty}</span></p>
            <p className="font-medium text-sm leading-7 text-gray-900 mt-1">Precio: <span className="font-semibold text-sm leading-7 text-gray-500">{productPrice}</span></p>
          </div>
        </div>
        <div className="flex max-md:w-full flex-col justify-center max-md:items-end max-md:mt-5">
          <div className="w-full">
            <p className="font-medium text-lg leading-8 text-black text-center">Estado: {status}</p>
            <p className="font-medium text-lg leading-8 text-black text-center mt-3">Fecha de entrega: {deliveryDate}</p>
            <p className="font-extrabold text-2xl leading-10 text-black mt-5 text-center">{totalPrice}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
