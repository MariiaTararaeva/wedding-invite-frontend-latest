import { Link } from 'react-router-dom';

interface ServiceCardProps {
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export default function ServiceCard({ slug, title, description, imageUrl }: ServiceCardProps) {
  return (
    <Link
      to={`/services/${slug}`}
      className="border rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col"
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-700 mt-2 line-clamp-3">{description}</p>
        <span className="text-pink-700 text-sm mt-4 inline-block">Bekijk arrangement →</span>
      </div>
    </Link>
  );
}
