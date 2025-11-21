'use client';
import { useEffect } from 'react';

interface VisitTrackerProps {
  studentId: string;
}

export default function VisitTracker({ studentId }: VisitTrackerProps) {
  useEffect(() => {
    // Avoid tracking multiple times in development hot reloads
    if (typeof window !== 'undefined' && !sessionStorage.getItem(`visited_${studentId}`)) {
      fetch(`/api/analytics/visit/${studentId}`, { method: 'POST' });
      sessionStorage.setItem(`visited_${studentId}`, 'true');
    }
  }, [studentId]);

  return null;
}
