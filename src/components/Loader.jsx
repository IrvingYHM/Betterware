function Loader({ mensaje = "Cargando..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
        <div className="absolute inset-0 rounded-full border-t-4 border-blue-500 animate-spin"></div>
      </div>
      <p className="text-blue-600 font-medium">{mensaje}</p>
    </div>
  );
}

export default Loader;
