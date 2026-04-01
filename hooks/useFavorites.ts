'use client';
import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('flatmatefind_favorites');
    if (stored) setFavorites(JSON.parse(stored));
    setLoaded(true);
  }, []);

  function toggle(id: string) {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem('flatmatefind_favorites', JSON.stringify(next));
      return next;
    });
  }

  return { favorites, toggle, isFavorited: (id: string) => favorites.includes(id), loaded };
}
