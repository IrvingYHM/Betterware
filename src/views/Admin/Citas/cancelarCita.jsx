// CancelarCita.jsx
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root"); // Especifica tu elemento raíz para accesibilidad

const CancelarCita = ({ citaId, onCancelSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleCancelClick = async () => {
    console.log("Cita ID a cancelar:", citaId);

    try {
      setLoading(true);
      // Hacer la solicitud de cancelación al backend
      const response = await axios.put(
        `https://backopt-production.up.railway.app/cita/cancelar/${citaId}`
      );

      if (response.status === 200) {
        toast.success("La cita ha sido cancelada exitosamente");
        onCancelSuccess(citaId);
        window.location.reload(); 
      } else {
        toast.error("Hubo un problema al cancelar la cita");
      }
    } catch (error) {
      console.error("Error al cancelar la cita:", error);

      // Manejo de errores específico basado en el código de estado
      if (error.response) {
        switch (error.response.status) {
          case 404:
            toast.error("La cita no fue encontrada.");
            break;
          case 400:
            toast.error("La cita ya está cancelada o el estado es inválido.");
            break;
          default:
            toast.error("Hubo un problema al cancelar la cita.");
        }
      } else {
        toast.error("Error de red o servidor no disponible.");
      }
    } finally {
      setLoading(false);
      closeModal(); // Cerrar el modal después de la operación
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Cancelando..." : "Cancelar"}
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        contentLabel="Confirmar Cancelación"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">
            Confirmar Cancelación
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            ¿Estás seguro de que deseas cancelar esta cita?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleCancelClick}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? "Cancelando..." : "Confirmar"}
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default CancelarCita;
