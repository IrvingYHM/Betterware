import React from "react";
import { TrendingUp, Users, Target, Crown } from "lucide-react";

// Betterware color palette
const colors = {
  primary: '#00B4D8',
  secondary: '#0077B6', 
  accent: '#90E0EF',
  light: '#CAF0F8',
  dark: '#03045E',
  success: '#06FFA5',
  warning: '#FFB700',
  danger: '#FF006E'
};

export const TopListSkeleton = ({ tipo }) => {
  const isVentas = tipo === "Ventas";
  const icon = isVentas ? TrendingUp : Users;
  const headerColor = isVentas ? colors.success : colors.warning;
  
  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 p-6 rounded-2xl w-full lg:w-1/2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
               style={{ background: `linear-gradient(135deg, ${headerColor}, ${colors.secondary})` }}>
            {React.createElement(icon, { className: "w-5 h-5 text-white" })}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Top {tipo}
            </h2>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="p-4 rounded-xl border bg-gray-50 border-gray-200 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="h-5 bg-gray-300 rounded w-8"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ImageSkeleton = ({ titulo }) => {
  const isVentas = titulo.includes("Ventas");
  const headerColor = isVentas ? colors.success : colors.warning;

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 rounded-2xl p-6 w-full lg:w-1/2 flex flex-col">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
             style={{ background: `linear-gradient(135deg, ${headerColor}, ${colors.secondary})` }}>
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{titulo}</h2>
        </div>
      </div>

      {/* Image skeleton */}
      <div className="flex-1 flex flex-col items-center mb-6">
        <div className="w-full h-48 bg-gray-200 rounded-xl animate-pulse flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-32 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Button skeleton */}
      <div className="flex justify-between">
        <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
};

export const SectionHeaderSkeleton = () => {
  return (
    <div className="flex justify-center space-x-3 mb-6">
      <div className="w-8 h-8 rounded-xl bg-gray-300 animate-pulse"></div>
      <div className="h-6 bg-gray-300 rounded w-40 animate-pulse"></div>
    </div>
  );
};

export const FullPageSkeleton = () => {
  return (
    <div className="mt-36">
      <div className="min-h-screen bg-gradient-to-br mb-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Ventas Section Skeleton */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <SectionHeaderSkeleton />
            <div className="flex flex-col lg:flex-row gap-6">
              <TopListSkeleton tipo="Ventas" />
              <ImageSkeleton titulo="Reto - Ventas" />
            </div>
          </div>

          {/* Afiliaciones Section Skeleton */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <SectionHeaderSkeleton />
            <div className="flex flex-col lg:flex-row gap-6">
              <TopListSkeleton tipo="Afiliados" />
              <ImageSkeleton titulo="Reto - Afiliaciones" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};