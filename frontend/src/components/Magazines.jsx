import { useEffect, useState } from "react";
import { fetchMagazines } from "./api";

const Home = () => {
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    const getMagazines = async () => {
      const data = await fetchMagazines();
      setMagazines(data.slice(0, 10)); 
    };
    getMagazines();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-b from-gray-100 via-white to-white">
      <div className="container mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-600">Latest Magazines</h2>

        {magazines.length === 0 ? (
          <p className="text-center text-gray-500">No magazines available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {magazines.map((magazine) => (
              <div key={magazine.id} className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
                {/* Title centered above the image */}
                <h3 className="text-xl font-bold text-center text-gray-800">{magazine.title}</h3>

                {/* Image section */}
                <div className="flex items-center justify-center w-full h-56 mt-4 bg-gray-200 rounded-lg">
                  {magazine.image ? (
                    <img
                      src={magazine.image}
                      alt={magazine.title}
                      className="object-cover max-w-full max-h-full rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-500">No Image Available</p>
                  )}
                </div>

                {/* Published date and price on the same line */}
                <div className="flex items-center justify-between mt-2">
                  <small className="text-xs text-gray-500">Published on: {magazine.publishedDate}</small>
                  <div className="text-sm font-semibold text-gray-800">
                    ₹{magazine.price ? magazine.price : "N/A"}
                  </div>
                </div>

                {/* Slim Buy Button */}
                <button className="w-full px-4 py-2 mt-4 text-sm text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
