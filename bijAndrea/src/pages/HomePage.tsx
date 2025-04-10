import { useEffect, useState } from 'react';
import { sanityClient } from '../sanity/client';

interface HomeContent {
    heroImageUrl: string; heroTitle: string; heroSubtitle?: string; aboutTitle: string; aboutText: string; 
}
interface ServicePreview { title: string; slug: {current: string}; description: string; imageUrl: string; }
interface TeaPreview { name: string; slug: {current: string}; description: string; imageUrl: string; }

export default function Home() {
  const [content, setContent] = useState<HomeContent|null>(null);
  const [services, setServices] = useState<ServicePreview[]>([]);
  const [teas, setTeas] = useState<TeaPreview[]>([]);
  const [rooms, setRooms] = useState<{name:string, description:string, imageUrl:string}[]>([]);

  useEffect(() => {
    const fetchHome = async () => {
      const homeData = await sanityClient.fetch(
        `*[_type=="homepage"][0]{
           heroTitle, heroSubtitle, aboutTitle, aboutText
         }`
      );
      const serviceData = await sanityClient.fetch(
        `*[_type=="service"]{title, "slug": slug, description, "imageUrl": image.asset->url}`
      );
      const teaData = await sanityClient.fetch(
        `*[_type=="tea"]{name, "slug": slug, description, "imageUrl": image.asset->url}[0...3]`
      );
      const roomData = await sanityClient.fetch(
        `*[_type=="room"]{name, description, "imageUrl": image.asset->url}`
      );
      setContent(homeData);
      setServices(serviceData);
      setTeas(teaData);
      setRooms(roomData);
    };
    fetchHome();
  }, []);

  if(!content) return <div>Loading...</div>;  // simple loading state

  return (
    <div>
      {/* Hero Section */}
      <section className="hero text-center bg-cover" style={{ backgroundImage: `url(${content.heroImageUrl})` }}>
        <h1 className="text-4xl font-bold">{content.heroTitle}</h1>
        {content.heroSubtitle && <p className="italic">{content.heroSubtitle}</p>}
        <button className="mt-4 px-4 py-2 bg-pink-600 text-white rounded">
          {/* This button could toggle the menu overlay or scroll to booking */}
          Bekijk menu
        </button>
      </section>
      {/* About Section */}
      <section className="about py-8">
        <h2 className="text-3xl mb-2">{content.aboutTitle}</h2>
        <p>{content.aboutText}</p>
      </section>
      {/* Teas Section */}
      <section className="teas py-8 bg-gray-50">
        <h2 className="text-2xl mb-4">🍵 Drink Me – Onze Theeselectie</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teas.map(tea => (
            <div key={tea.slug.current} className="tea-card p-4 border rounded">
              <img src={tea.imageUrl} alt={tea.name} className="mb-2"/>
              <h3 className="text-xl">{tea.name}</h3>
              <p>{tea.description}</p>
              <a href={`/teas/${tea.slug.current}`} className="text-blue-600 hover:underline">Lees meer &rarr;</a>
            </div>
          ))}
        </div>
        <a href="/teas" className="mt-4 inline-block text-blue-800 hover:underline">Bekijk alle thee &rarr;</a>
      </section>
      {/* Services Section */}
      <section className="services py-8">
        <h2 className="text-2xl mb-4">🧁 Eat Me – High Tea Arrangementen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(service => (
            <div key={service.slug.current} className="service-card flex">
              <img src={service.imageUrl} alt={service.title} className="w-1/3 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl">{service.title}</h3>
                <p>{service.description}</p>
                <a href={`/services/${service.slug.current}`} className="text-pink-600 hover:underline">Meer info &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Rooms Section */}
      <section className="rooms py-8 bg-gray-50">
        <h2 className="text-2xl mb-4">🏰 Onze Locaties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rooms.map(room => (
            <div key={room.name} className="room-card">
              <img src={room.imageUrl} alt={room.name} className="h-40 w-full object-cover"/>
              <h3 className="text-xl mt-2">{room.name}</h3>
              <p>{room.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

