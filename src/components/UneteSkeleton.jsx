import React from 'react';

const UneteSkeleton = ({ isAdmin = false }) => {
  return (
    <>
      {/* Admin Edit Button Skeleton */}
      {isAdmin && (
        <div className="fixed top-28 right-4 z-50">
          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse shadow-lg"></div>
        </div>
      )}

      {/* Hero Section Skeleton */}
      <section className="relative w-full h-[600px] bg-gray-200 animate-pulse">
        {/* Background Image Skeleton */}
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
        
        {/* Admin Image Upload Button Skeleton */}
        {isAdmin && (
          <div className="absolute top-4 left-4 z-20">
            <div className="w-40 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Content Skeleton */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-6">
          {/* Title Skeleton */}
          <div className="w-full max-w-2xl space-y-3">
            <div className="h-12 bg-white/30 rounded-lg animate-pulse mx-auto w-3/4"></div>
            <div className="h-8 bg-white/30 rounded-lg animate-pulse mx-auto w-1/2"></div>
          </div>
          
          {/* Subtitle Skeleton */}
          <div className="w-full max-w-2xl space-y-2">
            <div className="h-6 bg-white/30 rounded-lg animate-pulse mx-auto w-4/5"></div>
            <div className="h-6 bg-white/30 rounded-lg animate-pulse mx-auto w-3/5"></div>
            <div className="h-6 bg-white/30 rounded-lg animate-pulse mx-auto w-2/3"></div>
          </div>
          
          {/* Button Skeleton */}
          <div className="w-48 h-14 bg-orange-300/50 rounded-full animate-pulse"></div>
        </div>
      </section>

      {/* Benefits Section Skeleton */}
      <section className="py-16 px-4 flex justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-3xl w-full border border-gray-100">
          {/* Section Title Skeleton */}
          <div className="text-center mb-8 space-y-4">
            <div className="h-8 bg-gray-200 rounded-lg animate-pulse mx-auto w-80"></div>
            <div className="h-6 bg-gray-200 rounded-lg animate-pulse mx-auto w-64"></div>
          </div>
          
          {/* Benefits List Skeleton */}
          <div className="space-y-6">
            {/* Benefits Header */}
            <div className="flex items-center gap-2">
              <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-56"></div>
              {isAdmin && (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              )}
            </div>
            
            {/* Individual Benefits */}
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-200 rounded-full animate-pulse mt-1"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-full"></div>
                  {index % 2 === 0 && (
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  )}
                </div>
                {isAdmin && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* CTA Button Skeleton */}
          <div className="flex justify-center mt-10">
            <div className="w-40 h-12 bg-orange-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .animate-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};

export default UneteSkeleton;