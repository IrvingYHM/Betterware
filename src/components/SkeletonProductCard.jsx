// src/components/SkeletonProductCard.jsx
function SkeletonProductCard() {
  return (
    <div className="w-72 bg-white rounded-xl shadow-md animate-pulse">
      <div className="h-72 bg-gray-300 rounded-t"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mt-4"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
}

export default SkeletonProductCard;
