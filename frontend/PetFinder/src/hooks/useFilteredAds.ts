import { useMemo } from "react";
import type { IAd } from "../interfaces/ad";

interface Filters {
  animalType?: string;
  color?: string;
  isLost?: boolean;
  search?: string;
  recentOnly?: boolean;
}

export function useFilteredAds(ads: IAd[], filters: Filters) {
  return useMemo(() => {
    return ads.filter(ad => {
      const byType = filters.animalType ? ad.animalType.name === filters.animalType : true;
      const byColor = filters.color
        ? ad.color.toLowerCase().includes(filters.color.toLowerCase())
        : true;
      const byIsLost = filters.isLost !== undefined ? ad.isLost === filters.isLost : true;
      const bySearch = filters.search
        ? ad.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          ad.description.toLowerCase().includes(filters.search.toLowerCase())
        : true;
      const byRecent = filters.recentOnly
        ? (new Date().getTime() - new Date(ad.date).getTime()) / (1000 * 60 * 60 * 24) <= 7
        : true;

      return byType && byColor && byIsLost && bySearch && byRecent;
    });
  }, [ads, filters]);
}
