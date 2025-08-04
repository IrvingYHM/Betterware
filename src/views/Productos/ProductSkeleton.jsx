const ProductSkeleton = () => {
  return (
    <div className="group relative w-80 bg-white border-2 border-gray-200 shadow-lg rounded-xl flex flex-col animate-pulse overflow-hidden transition-all duration-300">
      {/* Offer Badge placeholder */}
      <div className="absolute top-3 left-3 z-10">
        <div className="w-16 h-6 bg-gray-300 rounded-full shadow-md"></div>
      </div>
      
      {/* Discount Percentage placeholder */}
      <div className="absolute top-3 right-3 z-10">
        <div className="w-14 h-6 bg-gray-300 rounded-full shadow-md"></div>
      </div>

      {/* Image skeleton with gradient background */}
      <div className="relative h-64 w-full bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="h-full w-full bg-gray-300 rounded-t-lg"></div>
        
        {/* Overlay gradiente placeholder */}
        <div className="absolute inset-0 bg-gray-200 bg-opacity-10 rounded-t-lg"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="relative flex flex-col p-4 space-y-2 bg-white flex-grow">
        {/* Product name skeleton - 2 lines with line-clamp-2 simulation */}
        <div className="space-y-2">
          <div className="w-full h-5 bg-gray-300 rounded"></div>
          <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
        </div>
        
        {/* Price section skeleton - flex-grow to match real layout */}
        <div className="flex flex-col space-y-1 flex-grow">
          {/* Simulate both offer and normal price layouts */}
          <div className="space-y-1">
            {/* Original price (small, crossed out) */}
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
            {/* Offer price (large, bold) */}
            <div className="w-24 h-7 bg-gray-300 rounded"></div>
            {/* Savings text */}
            <div className="w-28 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
        
        {/* Action indicator - positioned at bottom right like real cards */}
        <div className="absolute bottom-4 right-4">
          <div className="w-5 h-5 bg-gray-300 rounded transition-colors duration-200"></div>
        </div>
      </div>
    </div>
  );
};

const ProductSkeletonGrid = ({ count = 12 }) => {
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