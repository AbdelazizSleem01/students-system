'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaExpand, FaFilePdf, FaDownload } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

interface DocumentsGalleryProps {
  nationalIdImage?: string;
  universityCardImage?: string;
  certificate1Image?: string;
  scheduleImage?: string;
  scheduleImageFileName?: string;
}

export default function DocumentsGallery({
  nationalIdImage,
  universityCardImage,
  certificate1Image,
  scheduleImage,
  scheduleImageFileName,
}: DocumentsGalleryProps) {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const documents = [
    {
      key: 'nationalIdImage' as const,
      label: 'National ID',
      type: 'image' as const,
      url: nationalIdImage, 
    },
    {
      key: 'universityCardImage' as const,
      label: 'University Card',
      type: 'image' as const,
      url: universityCardImage,  
    },
    {
      key: 'certificate1Image' as const,
      label: 'Certificate',
      type: 'image' as const,
      url: certificate1Image, 
    },
    {
      key: 'scheduleImage' as const,
      label: 'Schedule',
      type: 'pdf' as const,
      url: scheduleImage,  
      fileName: scheduleImageFileName,  
    },
  ];

  const availableDocs = documents.filter(doc => doc.url);

  if (availableDocs.length === 0) return null;

  const openModal = (url: string) => {
    setModalImage(url);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {availableDocs.map(({ url, label, type, fileName }) => (
          <div
            key={label}
            className="group relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => type === 'image' && url && openModal(url)}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="aspect-3/4 relative bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
                {type === 'pdf' ? (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center p-4">
                    <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-red-100 to-red-200 flex items-center justify-center shadow-xl border-4 border-white">
                      <FaFilePdf className="text-5xl text-red-600" />
                    </div>
                    <p className="text-xs font-medium text-gray-700 px-2 truncate w-full">
                      {fileName || 'Schedule.pdf'}
                    </p>
                    <a
                      href={`/api/download-cv?url=${encodeURIComponent(url!)}&name=${encodeURIComponent(fileName || 'Schedule.pdf')}`}
                      className="mt-2  px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-md transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Download
                      <FaDownload />
                    </a>
                  </div>
                ) : (
                  <>
                    <Image
                      src={url!}
                      alt={label}
                      width={300}
                      height={400}
                      className="w-full h-full object-cover rounded-t-2xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized
                    />
                    <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center rounded-t-2xl pointer-events-none">
                      <FaExpand className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </>
                )}
              </div>

              <div className="p-4 text-center bg-white border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-800">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-white/95 backdrop-blur-md"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalImage(null);
              }}
              className="btn btn-circle btn-md absolute -top-5 -right-4 font-light z-10 bg-gray-300"
            >
              <FaX />
            </button>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-4 border border-gray-200">
              <Image
                src={modalImage}
                alt="Document Preview"
                width={1400}
                height={1800}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}