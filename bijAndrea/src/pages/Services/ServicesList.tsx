import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sanityClient } from '../../sanity/client';
import ServiceCard from '../../components/ServiceCard';

interface Service {
  title: string;
  description: string;
  slug: { current: string };
  imageUrl?: string;
}

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const query = `*[_type == "service"]{
        title, description, "slug": slug, "imageUrl": image.asset->url
      }`;
      const results = await sanityClient.fetch(query);
      setServices(results);
    };
    fetchServices();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">🧁 Eat Me – High Tea Arrangementen</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">

{services.map((service) => (
  <ServiceCard
    key={service.slug.current}
    slug={service.slug.current}
    title={service.title}
    description={service.description}
    imageUrl={service.imageUrl}
  />
))}

{services.map((service) => (
          <Link
            to={`/services/${service.slug.current}`}
            key={service.slug.current}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {service.imageUrl && (
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{service.title}</h2>
              <p className="text-sm text-gray-700 mt-2">{service.description.slice(0, 100)}...</p>
              <span className="text-pink-700 text-sm mt-2 inline-block">Meer lezen →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

