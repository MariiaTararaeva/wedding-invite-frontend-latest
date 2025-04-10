import { Link } from 'react-router-dom';

interface TeaCardProps {
  slug: string;
  name: string;
  description: string;
  imageUrl?: string;
  type?: string;
}

export default function TeaCard({ slug, name, description, imageUrl, type }: TeaCardProps) {
  return (
    <Link
      to={`/teas/${slug}`}
      className="border rounded-xl overflow-hidden hover:shadow-md transition flex flex-col"
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-xl font-semibold">{name}</h3>
        {type && <p className="text-xs text-pink-600 mb-1">Soort: {type}</p>}
        <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
        <span className="text-pink-700 text-sm mt-4 inline-block">Lees meer →</span>
      </div>
    </Link>
  );
}

