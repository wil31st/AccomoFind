'use client';
import { useState, useEffect } from 'react';

export function useShortlist() {
  const [shortlisted, setShortlisted] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('flatmatefind_shortlist');
    if (stored) setShortlisted(JSON.parse(stored));
  }, []);

  function toggle(listingId: string) {
    setShortlisted((prev) => {
      const next = prev.includes(listingId)
        ? prev.filter((f) => f !== listingId)
        : [...prev, listingId];
      localStorage.setItem('flatmatefind_shortlist', JSON.stringify(next));
      return next;
    });
  }

  return { shortlisted, toggle, isShortlisted: (id: string) => shortlisted.includes(id) };
}
