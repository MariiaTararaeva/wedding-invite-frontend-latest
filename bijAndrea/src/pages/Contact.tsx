import { useEffect, useState } from 'react';
import { sanityClient } from '../sanity/client';

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  parking?: string;
  directions?: string;
  collaborationNote?: string;
}

export default function Contact() {
  const [contact, setContact] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      const query = `*[_type == "contactInfo"][0]{
        address, phone, email, parking, directions, collaborationNote
      }`;
      const result = await sanityClient.fetch(query);
      setContact(result);
    };
    fetchContact();
  }, []);

  if (!contact) return <div className="p-4">Contactinformatie wordt geladen...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-4xl font-bold text-center">📍 Contact & Route</h1>

      <div>
        <h2 className="text-xl font-semibold">Adres</h2>
        <p>{contact.address}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Telefoon</h2>
        <a href={`tel:${contact.phone}`} className="text-pink-600 underline">{contact.phone}</a>
      </div>

      <div>
        <h2 className="text-xl font-semibold">E-mail</h2>
        <a href={`mailto:${contact.email}`} className="text-pink-600 underline">{contact.email}</a>
      </div>

      {contact.parking && (
        <div>
          <h2 className="text-xl font-semibold">Parkeren</h2>
          <p>{contact.parking}</p>
        </div>
      )}

      {contact.directions && (
        <div>
          <h2 className="text-xl font-semibold">Routebeschrijving</h2>
          <p>{contact.directions}</p>
        </div>
      )}

      {contact.collaborationNote && (
        <div className="bg-pink-50 p-4 border border-pink-200 rounded">
          <h2 className="text-xl font-semibold mb-1">Samenwerken?</h2>
          <p>{contact.collaborationNote}</p>
        </div>
      )}
    </div>
  );
}

