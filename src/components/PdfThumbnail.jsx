import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// Configurar el worker localmente (evita el error CORS)
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

function PdfThumbnail({ url }) {
  const canvasRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const renderThumbnail = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(url).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 0.6 });

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
      } catch (err) {
        console.error("Error cargando PDF:", err);
        setError(true);
      }
    };

    renderThumbnail();
  }, [url]);

  return error ? (
    <p className="text-red-500 text-sm">No se pudo cargar la vista previa</p>
  ) : (
    <canvas ref={canvasRef} className="rounded-md mb-4 shadow-md" />
  );
}

export default PdfThumbnail;
