const ProductSkeleton = () => {
  return (
    <div className="relative w-80 bg-white border-2 border-gray-200 shadow-lg rounded-xl flex flex-col animate-pulse overflow-hidden">
      {/* Badge placeholders */}
      <div className="absolute top-3 left-3 z-10">
        <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
      </div>
      <div className="absolute top-3 right-3 z-10">
        <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
      </div>

      {/* Image skeleton */}
      <div className="relative h-64 w-full bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="h-full w-full bg-gray-300 rounded-t-lg"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="relative flex flex-col p-4 space-y-2 bg-white flex-grow">
        {/* Product name skeleton */}
        <div className="space-y-2">
          <div className="w-full h-5 bg-gray-300 rounded"></div>
          <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
        </div>
        
        {/* Price section skeleton */}
        <div className="flex flex-col space-y-1 pt-2 flex-grow">
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
          <div className="w-20 h-7 bg-gray-300 rounded"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
        
        {/* Arrow skeleton - positioned at bottom right */}
        <div className="absolute bottom-4 right-4">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const ProductSkeletonGrid = ({ count = 6 }) => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-6 mt-8">
      {Array.from({ length: count }, (_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export { ProductSkeleton, ProductSkeletonGrid };
export default ProductSkeleton;