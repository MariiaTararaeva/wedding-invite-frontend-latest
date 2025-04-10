import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sanityClient } from '../../sanity/client';

interface Tea {
  name: string;
  description: string;
  type?: string;
  imageUrl?: string;
}

export default function TeaDetail() {
  const { teaSlug } = useParams();
  const [tea, setTea] = useState<Tea | null>(null);

  useEffect(() => {
    const fetchTea = async () => {
      const query = `*[_type == "tea" && slug.current == $slug][0]{
        name, description, type, "imageUrl": image.asset->url
      }`;
      const result = await sanityClient.fetch(query, { slug: teaSlug });
      setTea(result);
    };
    fetchTea();
  }, [teaSlug]);

  if (!tea) return <div className="p-4">Thee wordt geladen...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col md:flex-row items-start gap-6">
      {tea.imageUrl && (
        <img
          src={tea.imageUrl}
          alt={tea.name}
          className="w-full md:w-1/2 object-cover rounded-xl shadow"
        />
      )}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{tea.name}</h1>
        {tea.type && (
          <p className="text-sm text-pink-600 mb-2">Soort: {tea.type}</p>
        )}
        <p className="text-gray-800">{tea.description}</p>
      </div>
    </div>
  );
}

