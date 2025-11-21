'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaExpand } from 'react-icons/fa';

interface DocumentsGalleryProps {
  officialDocumentsImage?: string;
  nationalIdImage?: string;
  universityCardImage?: string;
  scheduleImage?: string;
  certificate1Image?: string;
}

const documents = [
  { key: 'nationalIdImage' as const, label: 'National ID' },
  { key: 'universityCardImage' as const, label: 'University Card' },
  { key: 'scheduleImage' as const, label: 'Schedule' },
  { key: 'certificate1Image' as const, label: 'Certificate ' },
];

export default function DocumentsGallery({
  nationalIdImage,
  universityCardImage,
  scheduleImage,
  certificate1Image,
}: DocumentsGalleryProps) {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const availableDocs = documents
    .map(doc => ({
      label: doc.label,
      url: {
        nationalIdImage,
        universityCardImage,
        scheduleImage,
        certificate1Image,
      }[doc.key],
    }))
    .filter(doc => doc.url);

  if (availableDocs.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {availableDocs.map(({ url, label }) => (
          <div
            key={label}
            onClick={() => setModalImage(url!)}
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
              {/* Image Container */}
              <div className="aspect-3/4 relative bg-gray-50">
                <Image
                  src={url!}
                  alt={label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 20vw"

                />

                {/* Hover Overlay */}
                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <FaExpand className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Label */}
              <div className="p-4 text-center bg-white">
                <p className="text-sm font-medium text-gray-700 truncate">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-4xl font-light"
            >
              ×
            </button>
            <Image
              src={modalImage}
              alt="Document"
              width={400}
              height={400}
              sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 20vw"

              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}