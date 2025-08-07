import React from 'react';
import { Users, Sparkles, Heart, Trophy, Upload, Edit, Plus, CheckCircle } from 'lucide-react';

const UneteSkeleton = ({ isAdmin = false }) => {
  return (
    <>
      {/* Admin Edit Button Skeleton */}
      {isAdmin && (
        <div className="fixed top-28 right-4 z-50">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-200/70 to-blue-300/70 rounded-full animate-gentle-pulse shadow-xl flex items-center justify-center">
            <Edit className="w-5 h-5 text-blue-400 animate-fade-pulse" />
          </div>
        </div>
      )}

      {/* Hero Section Skeleton */}
      <section className={`relative w-full ${isAdmin ? 'h-[550px]' : 'h-[550px] mt-32'} bg-gradient-to-br from-slate-100 via-gray-100 to-blue-50 overflow-hidden`}>
        {/* Enhanced Background without shimmer - using breathing animation */}
        <div className="w-full h-full bg-gradient-to-br from-teal-100/30 via-cyan-100/40 to-blue-100/30 animate-gentle-breathing relative">
          {/* Subtle floating particles */}
          <div className="absolute top-16 left-12 w-2 h-2 bg-teal-200/60 rounded-full animate-float-gentle"></div>
          <div className="absolute top-24 right-20 w-3 h-3 bg-cyan-200/50 rounded-full animate-float-gentle-delayed"></div>
          <div className="absolute bottom-20 left-16 w-2 h-2 bg-blue-200/60 rounded-full animate-float-gentle-slow"></div>
          <div className="absolute bottom-32 right-24 w-3 h-3 bg-teal-200/40 rounded-full animate-float-gentle"></div>
          
          {/* Subtle overlay gradients */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/5 to-white/10 animate-gentle-pulse"></div>
        </div>
        
        {/* Admin Image Upload Button Skeleton */}
        {isAdmin && (
          <div className="absolute top-4 left-4 z-20">
            <div className="w-44 h-11 bg-gradient-to-r from-blue-200/60 to-blue-300/60 rounded-lg animate-gentle-pulse shadow-lg flex items-center justify-center gap-2">
              <Upload className="w-5 h-5 text-blue-400 animate-bounce-subtle" />
              <div className="h-3 w-20 bg-blue-300/80 rounded animate-gentle-pulse"></div>
            </div>
          </div>
        )}

        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/30" />
        
        {/* Content Skeleton with Better Animation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-8">
          {/* Animated Logo/Icon */}
          <div className="mb-4 relative">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-300/60 to-cyan-400/60 rounded-2xl flex items-center justify-center animate-gentle-scale shadow-2xl">
              <Users className="w-8 h-8 text-white/90 animate-bounce-subtle" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-orange-300/80 to-orange-400/80 rounded-full flex items-center justify-center animate-gentle-ping">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-gradient-to-br from-green-300/70 to-emerald-400/70 rounded-full flex items-center justify-center animate-gentle-scale">
              <Heart className="w-2 h-2 text-white" />
            </div>
          </div>

          {/* Enhanced Title Skeleton */}
          <div className="w-full max-w-2xl space-y-4">
            <div className="h-14 bg-gradient-to-r from-white/50 via-white/70 to-white/50 rounded-xl animate-gentle-pulse mx-auto w-3/4 shadow-lg"></div>
            <div className="h-10 bg-gradient-to-r from-white/40 via-white/60 to-white/40 rounded-lg animate-gentle-pulse mx-auto w-1/2 shadow-md" style={{ animationDelay: '0.3s' }}></div>
          </div>
          
          {/* Enhanced Subtitle Skeleton */}
          <div className="w-full max-w-2xl space-y-3">
            <div className="h-6 bg-gradient-to-r from-white/45 via-white/65 to-white/45 rounded-lg animate-gentle-pulse mx-auto w-4/5" style={{ animationDelay: '0.6s' }}></div>
            <div className="h-6 bg-gradient-to-r from-white/40 via-white/60 to-white/40 rounded-lg animate-gentle-pulse mx-auto w-3/5" style={{ animationDelay: '0.9s' }}></div>
            <div className="h-6 bg-gradient-to-r from-white/35 via-white/55 to-white/35 rounded-lg animate-gentle-pulse mx-auto w-2/3" style={{ animationDelay: '1.2s' }}></div>
          </div>
          
          {/* Enhanced Button Skeleton */}
          <div className="w-52 h-16 bg-gradient-to-r from-orange-300/70 via-orange-400/80 to-orange-500/70 rounded-full animate-gentle-glow shadow-2xl flex items-center justify-center">
            <div className="h-4 w-32 bg-orange-100/90 rounded animate-gentle-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section Skeleton */}
      <section className="py-16 px-4 flex justify-center">
        <div className="bg-gradient-to-br from-cyan-25 to-blue-25 rounded-2xl shadow-2xl p-10 max-w-3xl w-full border border-cyan-100/30 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-50/40 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-50/40 to-transparent rounded-tr-full"></div>
          
          {/* Section Title Skeleton */}
          <div className="text-center mb-10 space-y-4 relative z-10">
            <div className="h-10 bg-gradient-to-r from-teal-100/80 via-teal-200/90 to-teal-100/80 rounded-xl animate-gentle-pulse mx-auto w-80 shadow-lg"></div>
            <div className="h-7 bg-gradient-to-r from-gray-100/80 via-gray-200/90 to-gray-100/80 rounded-lg animate-gentle-pulse mx-auto w-64 shadow-md" style={{ animationDelay: '0.4s' }}></div>
          </div>
          
          {/* Benefits List Skeleton */}
          <div className="space-y-6 relative z-10">
            {/* Benefits Header */}
            <div className="flex items-center gap-3">
              <div className="h-7 bg-gradient-to-r from-gray-200/80 via-gray-300/90 to-gray-200/80 rounded-lg animate-gentle-pulse w-56 shadow-sm"></div>
              {isAdmin && (
                <div className="w-9 h-9 bg-gradient-to-br from-green-200/70 to-green-300/70 rounded-full animate-gentle-scale flex items-center justify-center shadow-lg">
                  <Plus className="w-4 h-4 text-green-400 animate-fade-pulse" />
                </div>
              )}
            </div>
            
            {/* Individual Benefits with Enhanced Animation */}
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="flex items-start gap-4 p-3 bg-white/50 rounded-lg backdrop-blur-sm shadow-sm animate-gentle-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-7 h-7 bg-gradient-to-br from-green-200/80 to-green-300/80 rounded-full animate-gentle-scale mt-1 flex items-center justify-center shadow-md">
                  <CheckCircle className="w-4 h-4 text-green-400 animate-fade-pulse" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gradient-to-r from-gray-150/90 via-gray-200/95 to-gray-150/90 rounded-md animate-gentle-pulse w-full shadow-sm"></div>
                  {index % 2 === 0 && (
                    <div className="h-5 bg-gradient-to-r from-gray-150/80 via-gray-200/85 to-gray-150/80 rounded-md animate-gentle-pulse w-3/4 shadow-sm" style={{ animationDelay: '0.3s' }}></div>
                  )}
                </div>
                {isAdmin && (
                  <div className="w-8 h-8 bg-gradient-to-br from-red-200/70 to-red-300/70 rounded-full animate-gentle-scale flex items-center justify-center shadow-md">
                    <div className="w-3 h-3 bg-red-300 rounded animate-gentle-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Enhanced CTA Button Skeleton */}
          <div className="flex justify-center mt-12 relative z-10">
            <div className="w-44 h-14 bg-gradient-to-r from-orange-200/80 via-orange-300/90 to-orange-400/80 rounded-full animate-gentle-glow shadow-2xl flex items-center justify-center">
              <div className="h-4 w-24 bg-orange-100/90 rounded animate-gentle-pulse"></div>
            </div>
          </div>
          
          {/* Subtle floating particles */}
          <div className="absolute top-16 right-8 w-2 h-2 bg-gradient-to-br from-teal-200/60 to-teal-300/60 rounded-full animate-float-gentle"></div>
          <div className="absolute bottom-16 left-12 w-3 h-3 bg-gradient-to-br from-cyan-200/60 to-cyan-300/60 rounded-full animate-float-gentle-delayed"></div>
          <div className="absolute top-32 left-8 w-1 h-1 bg-gradient-to-br from-blue-200/60 to-blue-300/60 rounded-full animate-float-gentle-slow"></div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gentle-breathing {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.002);
          }
        }

        @keyframes gentle-pulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.01);
          }
        }

        @keyframes gentle-scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes gentle-glow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          50% {
            transform: scale(1.01);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }
        }

        @keyframes gentle-ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes float-gentle-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes float-gentle-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes fade-pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes gentle-fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gentle-breathing {
          animation: gentle-breathing 4s ease-in-out infinite;
        }

        .animate-gentle-pulse {
          animation: gentle-pulse 2.5s ease-in-out infinite;
        }

        .animate-gentle-scale {
          animation: gentle-scale 2s ease-in-out infinite;
        }

        .animate-gentle-glow {
          animation: gentle-glow 2s ease-in-out infinite;
        }

        .animate-gentle-ping {
          animation: gentle-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }

        .animate-float-gentle-delayed {
          animation: float-gentle-delayed 3.5s ease-in-out infinite;
        }

        .animate-float-gentle-slow {
          animation: float-gentle-slow 4s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-fade-pulse {
          animation: fade-pulse 1.8s ease-in-out infinite;
        }

        .animate-gentle-fade-in {
          animation: gentle-fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default UneteSkeleton;