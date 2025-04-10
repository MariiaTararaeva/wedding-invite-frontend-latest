import { useEffect, useState } from 'react';
import { sanityClient } from '../sanity/client';

interface Room {
  name: string;
  description: string;
  capacity?: number;
  imageUrl?: string;
}

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const query = `*[_type == "room"]{
        name, description, capacity, "imageUrl": image.asset->url
      }`;
      const result = await sanityClient.fetch(query);
      setRooms(result);
    };
    fetchRooms();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">🏰 Onze Theekamers</h1>

      <div className="space-y-12">
        {rooms.map((room, index) => (
          <div
            key={room.name}
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : ''
            } items-center gap-8`}
          >
            {room.imageUrl && (
              <img
                src={room.imageUrl}
                alt={room.name}
                className="w-full md:w-1/2 object-cover rounded-xl shadow"
              />
            )}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold mb-2">{room.name}</h2>
              {room.capacity && (
                <p className="text-sm text-gray-500 mb-2">
                  Capaciteit: {room.capacity} personen
                </p>
              )}
              <p className="text-gray-700">{room.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

