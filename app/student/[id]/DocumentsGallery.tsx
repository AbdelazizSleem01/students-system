'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { FaFileAlt, FaImage, FaTimes, FaExpand, FaExclamationTriangle } from 'react-icons/fa';

interface DocumentsGalleryProps {
  officialDocumentsImage?: string;
  nationalIdImage?: string;
  universityCardImage?: string;
  scheduleImage?: string;
  certificate1Image?: string;
}

interface DocumentItem {
  key: keyof DocumentsGalleryProps;
  label: string;
  gradient: string;
}

export default function DocumentsGallery({
  officialDocumentsImage,
  nationalIdImage,
  universityCardImage,
  scheduleImage,
  certificate1Image
}: DocumentsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [imageLoadStates, setImageLoadStates] = useState<{ [key: string]: boolean }>({});

  const documentItems: DocumentItem[] = [
    { key: 'officialDocumentsImage', label: 'Official Documents', gradient: 'from-blue-500 to-blue-600' },
    { key: 'nationalIdImage', label: 'National ID', gradient: 'from-green-500 to-green-600' },
    { key: 'universityCardImage', label: 'University Card', gradient: 'from-purple-500 to-purple-600' },
    { key: 'scheduleImage', label: 'Schedule', gradient: 'from-orange-500 to-orange-600' },
    { key: 'certificate1Image', label: 'Certificate', gradient: 'from-red-500 to-red-600' },
  ];

  const availableDocuments = documentItems.filter(item =>
  ({
    officialDocumentsImage,
    nationalIdImage,
    universityCardImage,
    scheduleImage,
    certificate1Image
  }[item.key])
  );

  const openModal = useCallback((imageUrl: string, label: string) => {
    setSelectedImage(imageUrl);
    setSelectedLabel(label);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setSelectedLabel('');
  }, []);

  const handleImageError = useCallback((imageUrl: string) => {

    setImageErrors(prev => new Set(prev).add(imageUrl));
  }, []);

  const handleImageLoad = useCallback((imageUrl: string) => {
    setImageLoadStates(prev => ({ ...prev, [imageUrl]: true }));
  }, []);

  const isValidImage = (url: string | undefined): url is string => {
    return !!url && typeof url === 'string' && url.trim() !== '';
  };

  if (availableDocuments.length === 0) {
    return null;
  }

  return (
    <>
      {/* Documents Section */}
      <div className="card bg-white shadow-lg rounded-2xl border border-gray-200 mb-6 sm:mb-8">
        <div className="card-body p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-linear-to-r from-indigo-500 to-indigo-600 p-3 rounded-xl text-white shadow-lg">
              <FaFileAlt className="text-xl" />
            </div>
            <h2 className="card-title text-xl text-gray-800">Documents Gallery</h2>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {availableDocuments.map(({ key, label, gradient }) => {
              const imageUrl = {
                officialDocumentsImage,
                nationalIdImage,
                universityCardImage,
                scheduleImage,
                certificate1Image
              }[key];

              const hasError = imageUrl && imageErrors.has(imageUrl);
              const isLoaded = imageUrl && imageLoadStates[imageUrl];
              const isValid = isValidImage(imageUrl);

              return (
                <div
                  key={key}
                  className="group relative bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => isValid && !hasError && openModal(imageUrl, label)}
                >
                  <div className="aspect-video relative bg-gray-100">
                    {isValid && !hasError ? (
                      <>
                        {!isLoaded && (
                          <div className={`absolute inset-0 bg-linear-to-br ${gradient} flex items-center justify-center z-10`}>
                            <div className="animate-pulse flex flex-col items-center">
                              <FaImage className="text-white text-xl opacity-70 mb-2" />
                              <span className="text-white text-xs opacity-70">جاري التحميل...</span>
                            </div>
                          </div>
                        )}

                        <Image
                          src={imageUrl}
                          alt={label}
                          fill
                          className="object-cover transition-opacity duration-300"
                          style={{
                            opacity: isLoaded ? 1 : 0
                          }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          onError={() => handleImageError(imageUrl)}
                          onLoad={() => handleImageLoad(imageUrl)}
                          priority={false}
                        />
                      </>
                    ) : (
                      <div className={`w-full h-full bg-linear-to-br ${gradient} flex items-center justify-center relative`}>
                        {hasError ? (
                          <>
                            <FaExclamationTriangle className="text-white text-2xl opacity-50" />
                            <div className="absolute bottom-1 left-1 right-1 text-center">
                              <span className="text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                                Failed to load
                              </span>
                            </div>
                          </>
                        ) : (
                          <FaImage className="text-white text-2xl opacity-50" />
                        )}
                      </div>
                    )}

                    {/* Overlay */}
                    {isValid && !hasError && isLoaded && (
                      <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center z-20">
                        <div className="opacity-0 group-hover:opacity-100 bg-black p-4 rounded-2xl transition-opacity duration-300 flex items-center gap-2 text-white font-medium">
                          <FaExpand className="text-sm" />
                          <span>View</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <div className="p-3 bg-white">
                    <h3 className="text-sm font-semibold text-gray-800 text-center">{label}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-full w-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full">
              {/* Header */}
              <div className="bg-linear-to-r from-gray-800 to-gray-900 text-white p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{selectedLabel}</h3>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-gray-300 transition-colors duration-200 p-1"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Image Container */}
              <div className="relative p-4 bg-gray-900 flex items-center justify-center min-h-[300px]">
                <div className="relative w-full max-w-2xl">
                  <img
                    src={selectedImage}
                    alt={selectedLabel}
                    className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                    onError={(e) => {

                      e.currentTarget.style.display = 'none';
                    }}
                    onLoad={(e) => {

                    }}
                  />

                  <div className="absolute inset-0 items-center justify-center hidden" id="modal-fallback">
                    <div className="text-center text-white">
                      <FaExclamationTriangle className="text-4xl mb-2 opacity-50 mx-auto" />
                      <p>تعذر تحميل الصورة</p>
                      <button
                        onClick={closeModal}
                        className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        إغلاق
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
