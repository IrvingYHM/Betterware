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
        const viewport = page.getViewport({ scale: 1 });

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        
        // Calcular escala para que se ajuste al contenedor
        const container = canvas.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        const scaleX = containerWidth / viewport.width;
        const scaleY = containerHeight / viewport.height;
        const scale = Math.min(scaleX, scaleY);
        
        const scaledViewport = page.getViewport({ scale });
        
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        await page.render({ canvasContext: context, viewport: scaledViewport }).promise;
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
    <canvas 
      ref={canvasRef} 
      className="max-w-full max-h-full object-contain rounded-md" 
      style={{ display: 'block', margin: '0 auto' }}
    />
  );
}

export default PdfThumbnail;
