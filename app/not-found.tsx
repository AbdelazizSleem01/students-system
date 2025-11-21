'use client';

import Link from 'next/link';
import { FaHome, FaSearch, FaUserGraduate, FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            404
          </div>
          <div className="absolute top-6 -right-4 w-16 h-16 bg-linear-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center animate-bounce">
            <FaSearch className="text-white text-2xl" />
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <FaUserGraduate className="text-white text-5xl" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-ping">
              <span className="text-white font-bold">?</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Student
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Not </span>
          Found
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
          Oops! It looks like this student profile doesn't exist or has been moved.
          Don't worry, let's get you back to exploring our amazing student community!
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/"
            className="btn btn-primary btn-lg px-8 rounded-full bg-linear-to-r from-blue-500 to-purple-500 border-none text-white hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <FaHome className="mr-2" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline btn-lg px-8 rounded-full border-2 border-gray-300 hover:bg-gray-50 hover:border-blue-400 transition-all duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>

        {/* Fun facts or tips */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            💡 Did you know?
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our Student ID System helps manage over 500+ student profiles! Each student gets a unique digital identity
            with academic information, social links, and professional documents. If you're looking for a specific student,
            try checking our main directory or contact your administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
