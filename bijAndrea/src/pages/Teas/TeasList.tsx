import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sanityClient } from '../../sanity/client';
import TeaCard from '../../components/TeaCard';


interface Tea {
  name: string;
  description: string;
  slug: { current: string };
  imageUrl?: string;
  type?: string;
}

export default function TeasList() {
  const [teas, setTeas] = useState<Tea[]>([]);

  useEffect(() => {
    const fetchTeas = async () => {
      const query = `*[_type == "tea"]{
        name, description, type, "slug": slug, "imageUrl": image.asset->url
      }`;
      const result = await sanityClient.fetch(query);
      setTeas(result);
    };
    fetchTeas();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">🍵 Drink Me – Onze Theeën</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {teas.map((tea) => (
          <Link
            to={`/teas/${tea.slug.current}`}
            key={tea.slug.current}
            className="border rounded-xl overflow-hidden hover:shadow-md transition"
          >
            {tea.imageUrl && (
              <img
                src={tea.imageUrl}
                alt={tea.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{tea.name}</h2>
              <p className="text-sm text-gray-700 mt-2">{tea.description.slice(0, 100)}...</p>
              {tea.type && <p className="text-xs text-pink-600 mt-1">Type: {tea.type}</p>}
              <span className="text-pink-700 text-sm mt-2 inline-block">Lees meer →</span>
            </div>
            <TeaCard
  key={tea.slug.current}
  slug={tea.slug.current}
  name={tea.name}
  description={tea.description}
  imageUrl={tea.imageUrl}
  type={tea.type}
/>
          </Link>
        ))}
      </div>
    </div>
  );
}

