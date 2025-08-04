import React from "react";
import { TrendingUp, Users, Target, Crown, Edit3, Upload, Award, Eye } from "lucide-react";

// Betterware color palette matching admin dashboard
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

export const AdminTopListSkeleton = ({ tipo }) => {
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
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse mt-1"></div>
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

      {/* Admin Edit Button Skeleton */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminImageSkeleton = ({ titulo }) => {
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
          <div className="h-3 bg-gray-200 rounded w-40 animate-pulse mt-1"></div>
        </div>
      </div>

      {/* Image skeleton */}
      <div className="flex-1 flex flex-col items-center mb-6">
        <div className="w-full h-48 bg-gray-200 rounded-xl animate-pulse flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-32 mx-auto animate-pulse mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-28 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Admin Action Buttons Skeleton */}
      <div className="flex justify-between gap-2">
        {/* Ver Ganadores Button Skeleton */}
        <div className="h-12 bg-gray-200 rounded-xl animate-pulse flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
          </div>
        </div>
        
        {/* Subir Reto Button Skeleton */}
        <div className="h-12 bg-gray-200 rounded-xl animate-pulse flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
          </div>
        </div>
        
        {/* Subir Ganadores Button Skeleton */}
        <div className="h-12 bg-gray-200 rounded-xl animate-pulse flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminSectionHeaderSkeleton = () => {
  return (
    <div className="flex justify-center space-x-3 mb-6">
      <div className="w-8 h-8 rounded-xl bg-gray-300 animate-pulse"></div>
      <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
    </div>
  );
};

export const AdminFullPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Ventas Section Skeleton */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <AdminSectionHeaderSkeleton />
          <div className="flex flex-col lg:flex-row gap-6">
            <AdminTopListSkeleton tipo="Ventas" />
            <AdminImageSkeleton titulo="Reto - Ventas" />
          </div>
        </div>

        {/* Afiliaciones Section Skeleton */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <AdminSectionHeaderSkeleton />
          <div className="flex flex-col lg:flex-row gap-6">
            <AdminTopListSkeleton tipo="Afiliados" />
            <AdminImageSkeleton titulo="Reto - Afiliaciones" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for loading individual sections
export const AdminSectionSkeleton = ({ tipo }) => {
  const isVentas = tipo === "Ventas";
  const sectionColor = isVentas ? colors.success : colors.warning;
  const icon = isVentas ? TrendingUp : Users;
  const title = isVentas ? "Retos de Ventas" : "Retos de Afiliaciones";
  const imageTitle = isVentas ? "Reto - Ventas" : "Reto - Afiliaciones";

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
      <div className="flex justify-center space-x-3 mb-6">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
             style={{ background: `linear-gradient(135deg, ${sectionColor}, ${colors.primary})` }}>
          {React.createElement(icon, { className: "w-4 h-4 text-white" })}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <AdminTopListSkeleton tipo={tipo} />
        <AdminImageSkeleton titulo={imageTitle} />
      </div>
    </div>
  );
};

// Compact skeleton for quick loading
export const AdminCompactSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Cargando panel de retos...</p>
        </div>
      </div>
    </div>
  );
};