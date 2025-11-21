'use client';

import { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

interface CopyProfileButtonProps {
  studentId: string;
}

export default function CopyProfileButton({ studentId }: CopyProfileButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const profileUrl = `${window.location.origin}/student/${studentId}`;

    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = profileUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-indigo-600 text-center hover:bg-indigo-700 cursor-pointer disabled:bg-green-500 text-white font-semibold py-4 px-10 rounded-xl flex items-center gap-3 shadow-lg transition-all hover:scale-105 disabled:hover:scale-100"
      disabled={copied}
    >
      {copied ? <FaCheck /> : <FaCopy />}
      {copied ? 'Copied!' : 'Copy Profile URL'}
    </button>
  );
}
