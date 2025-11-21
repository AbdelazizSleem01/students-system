'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaFilePdf, FaDownload } from 'react-icons/fa';

interface SocialLink {
  icon: 'github' | 'linkedin' | 'cv';
  analyticsUrl?: string;
  actualUrl: string;
  label: string;
  isDownload?: boolean;
  downloadName?: string;
}

interface Props {
  links: SocialLink[];
}

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  cv: FaFilePdf,
};

export default function SocialLinksClient({ links }: Props) {
  const trackClick = (analyticsUrl?: string) => {
    if (!analyticsUrl) return;
    if (navigator.sendBeacon) {
      navigator.sendBeacon(analyticsUrl);
    } else {
      fetch(analyticsUrl, { method: 'POST', keepalive: true }).catch(() => {});
    }
  };

  return (
    <div className="flex justify-center gap-5 my-8 flex-wrap">
      {links.map(({ icon, analyticsUrl, actualUrl, label, isDownload, downloadName }) => {
        const Icon = iconMap[icon];

        if (isDownload) {
          const proxyUrl = `/api/download-cv?url=${encodeURIComponent(actualUrl)}&name=${encodeURIComponent(downloadName || 'CV.pdf')}`;

          return (
            <a
              key={label}
              href={proxyUrl}
              download={downloadName}
              className="bg-red-50 hover:bg-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 transition-all hover:scale-110 shadow-lg font-medium cursor-pointer select-none border-2 border-red-200"
            >
              <FaFilePdf className="text-2xl" />
              <span>{label}</span>
              <FaDownload className="text-lg" />
            </a>
          );
        }

        return (
          <a
            key={label}
            href={actualUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick(analyticsUrl)}
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 p-4 rounded-xl flex items-center gap-3 transition-all hover:scale-110 shadow-lg font-medium cursor-pointer select-none"
          >
            <Icon className="text-xl" />
            <span>{label}</span>
          </a>
        );
      })}
    </div>
  );
}