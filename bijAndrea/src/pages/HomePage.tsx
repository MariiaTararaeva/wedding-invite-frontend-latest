import { useEffect, useState } from 'react';
import { sanityClient } from '../sanity/client';
import { urlFor } from '../sanity/imageBuilder';
import HomepageSection from '../components/HomeSection';
import { motion } from 'framer-motion';

export default function HomePage() {
  interface HomeData {
    heroTitle?: string;
    heroSubtitle?: string;
    aboutTitle?: string;
    aboutText?: string;
    heroImage?: string;
    showServices?: boolean;
    featuredServices?: Service[];
    featuredTeas?: Tea[];
    featuredRooms?: Room[];
    showContactInfo?: boolean;
  }

  interface Service {
    title: string;
    description: string;
    slug: { current: string };
    imageUrl?: string;
  }

  interface Tea {
    name: string;
    description: string;
    slug: { current: string };
    imageUrl?: string;
  }

  interface Room {
    name: string;
    description: string;
    capacity?: number;
    imageUrl?: string;
  }

  const [homeData, setHomeData] = useState<HomeData | null>(null);

  const HOMEPAGE_ID = 'homepage-content';
  const query = `*[_id == "${HOMEPAGE_ID}"][0]{
    heroTitle,
    heroSubtitle,
    aboutTitle,
    aboutText,
    heroImage,
    showServices,
    featuredServices[]->{
      title, description, slug, "imageUrl": image.asset->url
    },
    featuredTeas[]->{
      name, description, slug, "imageUrl": image.asset->url
    },
    featuredRooms[]->{
      name, description, capacity, "imageUrl": image.asset->url
    },
    showContactInfo
  }`;

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const result = await sanityClient.fetch(query);
        setHomeData(result);
      } catch (err) {
        console.error('❌ Error fetching homepage:', err);
      }
    };
    fetchHome();
  }, [query]);

  if (!homeData) return <p>Loading…</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-20">
      {/* Hero Section */}
      <HomepageSection title={homeData.heroTitle || ''} className="text-center" icon="🎉">
        <p className="text-lg">{homeData.heroSubtitle}</p>
        {homeData.heroImage && (
          <img
            src={urlFor(homeData.heroImage).width(1200).url()}
            alt="Hero"
            className="w-full max-h-[400px] object-cover rounded-xl mx-auto mt-4"
          />
        )}
      </HomepageSection>

      {/* About Section */}
      <HomepageSection title={homeData.aboutTitle || ''} icon="📖">
        <p className="text-center text-gray-700 max-w-2xl mx-auto">{homeData.aboutText}</p>
      </HomepageSection>

      {/* Services Section */}
      {homeData.showServices && (homeData.featuredServices ?? []).length > 0 && (
        <HomepageSection
          title="Eat Me"
          icon="🧁"
          link={{ to: '/services', label: 'Bekijk alle services →' }}
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {homeData.featuredServices!.map(service => (
              <motion.div
                key={service.slug.current}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="border p-4 rounded-xl shadow"
              >
                {service.imageUrl && (
                  <img src={service.imageUrl} alt={service.title} className="mb-2 rounded-md" />
                )}
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-sm text-gray-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </HomepageSection>
      )}

      {/* Teas Section */}
      {(homeData.featuredTeas ?? []).length > 0 && (
        <HomepageSection
          title="Drink Me"
          icon="🍵"
          link={{ to: '/teas', label: 'Bekijk alle theeën →' }}
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {homeData.featuredTeas!.map(tea => (
              <motion.div
                key={tea.slug.current}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="border p-4 rounded-xl shadow"
              >
                {tea.imageUrl && (
                  <img src={tea.imageUrl} alt={tea.name} className="mb-2 rounded-md" />
                )}
                <h3 className="text-xl font-semibold">{tea.name}</h3>
                <p className="text-sm text-gray-700">{tea.description}</p>
              </motion.div>
            ))}
          </div>
        </HomepageSection>
      )}

      {/* Rooms Section */}
      {(homeData.featuredRooms ?? []).length > 0 && (
        <HomepageSection
          title="Theekamers"
          icon="🏰"
          link={{ to: '/rooms', label: 'Bekijk alle kamers →' }}
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {homeData.featuredRooms!.map(room => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="border p-4 rounded-xl shadow"
              >
                {room.imageUrl && (
                  <img src={room.imageUrl} alt={room.name} className="mb-2 rounded-md" />
                )}
                <h3 className="text-xl font-semibold">{room.name}</h3>
                {room.capacity && (
                  <p className="text-sm text-gray-500">Capaciteit: {room.capacity} personen</p>
                )}
                <p className="text-sm text-gray-700">{room.description}</p>
              </motion.div>
            ))}
          </div>
        </HomepageSection>
      )}

      {/* Contact Section */}
      {homeData.showContactInfo && (
        <HomepageSection title="Contact" icon="📬" link={{ to: '/contact', label: 'Naar contactpagina →' }}>
          <p className="text-center text-gray-700">Neem contact met ons op voor reserveringen of vragen!</p>
        </HomepageSection>
      )}
    </div>
  );
}
