import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sanityClient } from '../../sanity/client';

interface Service {
  title: string;
  description: string;
  price?: string;
  details?: string[];
  imageUrl?: string;
}

export default function ServiceDetail() {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      const query = `*[_type == "service" && slug.current == $slug][0]{
        title, description, price, details,
        "imageUrl": image.asset->url
      }`;
      const result = await sanityClient.fetch(query, { slug: serviceSlug });
      setService(result);
    };
    fetchService();
  }, [serviceSlug]);

  if (!service) return <div className="p-4">Laden...</div>;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-6 gap-6 max-w-6xl mx-auto">
      <img
        src={service.imageUrl}
        alt={service.title}
        className="w-full md:w-1/2 object-cover rounded-xl shadow"
      />
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
        <p className="mb-4">{service.description}</p>

        {service.details?.length && (
          <ul className="list-disc list-inside mb-4 text-gray-700">
            {service.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        )}

        {service.price && (
          <p className="font-semibold text-lg text-pink-700 mb-4">
            Prijs: {service.price}
          </p>
        )}

        <div className="flex gap-4 mt-6">
          <button
            className="bg-pink-600 text-white px-4 py-2 rounded"
            onClick={() => navigate('/booking')}
          >
            Boek deze high tea
          </button>
          <a
            href="/contact"
            className="bg-gray-100 px-4 py-2 rounded border hover:bg-gray-200"
          >
            Contact opnemen
          </a>
        </div>
      </div>
    </div>
  );
}

