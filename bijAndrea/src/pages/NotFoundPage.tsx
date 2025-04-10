import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4">🌀 Oeps... Pagina niet gevonden</h1>
      <p className="text-gray-600 max-w-md mb-6">
        Je bent misschien in een konijnenhol gevallen... Deze pagina bestaat niet.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
      >
        Terug naar huis
      </Link>
    </div>
  );
}
