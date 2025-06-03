import React, { useState, useEffect } from 'react';

// Componente para mostrar recomendaciones basadas en el producto seleccionado
const ProductRecommendations = () => {
  const [rules, setRules] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Cargar las reglas de asociación
    const fetchRules = async () => {
      try {
        const response = await fetch('association_rules.json'); // O la URL de tu API
        const data = await response.json();
        setRules(data);
      } catch (error) {
        console.error('Error al cargar las reglas:', error);
      }
    };

    fetchRules();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      // Aplicar las reglas para obtener recomendaciones
      const newRecommendations = rules
        .filter(rule => rule.antecedents.includes(selectedProduct))
        .flatMap(rule => rule.consequents);

      // Filtrar recomendaciones duplicadas
      const uniqueRecommendations = [...new Set(newRecommendations)];
      setRecommendations(uniqueRecommendations);
    }
  }, [selectedProduct, rules]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Recomendaciones de Productos</h1>

      <select
        className="mb-4 p-2 border border-gray-300 rounded"
        onChange={e => setSelectedProduct(e.target.value)}
        value={selectedProduct || ''}
      >
        <option value="" disabled>Selecciona un producto</option>
        {/* Aquí debes renderizar las opciones de productos disponibles */}
        <option value="VisionPro HD">VisionPro HD</option>
        <option value="Lentsa reyescar">Lentsa reyescar</option>
        <option value="NovaLens">NovaLens</option>
        <option value="Infinivue">Infinivue</option>
        <option value="PrismView">PrismView:</option>
      </select>

      {selectedProduct && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Recomendaciones para {selectedProduct}:</h2>
          <ul className="list-disc pl-5">
            {recommendations.length > 0 ? (
              recommendations.map((item, index) => (
                <li key={index} className="mb-1">{item}</li>
              ))
            ) : (
              <li>No hay recomendaciones disponibles.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductRecommendations;
