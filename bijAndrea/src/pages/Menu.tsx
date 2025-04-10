import { useEffect, useState } from 'react';
import { sanityClient } from '../sanity/client';

interface MenuData {
  title?: string;
  pdfFile?: { asset: { url: string } };
  pdfUrl?: string;
}

export default function Menu() {
  const [menu, setMenu] = useState<MenuData | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      const query = `*[_type == "menu"][0]{
        title,
        pdfUrl,
        pdfFile{asset->{url}}
      }`;
      const result = await sanityClient.fetch(query);
      setMenu(result);
    };
    fetchMenu();
  }, []);

  const pdfLink = menu?.pdfFile?.asset?.url || menu?.pdfUrl || '/menu.pdf';

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        📜 {menu?.title || 'Onze Menukaart'}
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Bekijk hieronder onze heerlijke selectie van hapjes, gebakjes en theesoorten.
      </p>

      {pdfLink ? (
        <div className="w-full h-[600px] mb-4 border rounded-lg overflow-hidden">
          <object
            data={pdfLink}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p className="text-center p-4">
              Kan de menukaart niet laden?{" "}
              <a
                href={pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 underline"
              >
                Download hier de PDF
              </a>
              .
            </p>
          </object>
        </div>
      ) : (
        <p className="text-center text-gray-500">Geen menukaart beschikbaar.</p>
      )}
    </div>
  );
}
