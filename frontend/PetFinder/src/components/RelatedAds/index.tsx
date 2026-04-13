import axios from 'axios';
import { useEffect, useState } from 'react';
import type { IAd } from '../../interfaces/ad';
import AdCard from '../ad';

type Props = {
  currentAdId: number | undefined;
};

const RelatedAds = ({ currentAdId }: Props) => {
    const [allAds, setAllAds] = useState<IAd[]>();

    useEffect(() => {
        axios.get<IAd[]>(`http://localhost:5005/api/Ad/GetAllAsync`)
            .then(response => {
                const ads = response.data;
                setAllAds(ads)
            })
    }, [setAllAds])
    const currentAd = allAds?.find(ad => ad.id === currentAdId);
    const filtered = allAds?.filter(ad => ad.id !== currentAdId && ad.animalType.id === currentAd?.animalType.id);

  // Випадкові 3
  const randomAds = filtered
    ?.sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className="mt-14">
      <p className="text-5xl uppercase text-left font-bold text-[#222831] mb-10">
        Maybe you are looking for something else?
      </p>
      <div className="flex justify-between">
        {randomAds?.map(ad => (
          <AdCard key={ad.id} result={ad} />
        ))}
      </div>
    </div>
  );
};

export default RelatedAds;