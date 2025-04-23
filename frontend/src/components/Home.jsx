import { useEffect, useState } from "react";
import { fetchMagazines } from "./api";  // Import the fetchMagazines function
import { fetchArticles } from "./api";   // Import the fetchArticles function

const Home = () => {
  const [magazines, setMagazines] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch Magazines
    const loadMagazines = async () => {
      const magazineData = await fetchMagazines();
      setMagazines(magazineData);
    };

    // Fetch Articles
    const loadArticles = async () => {
      const articleData = await fetchArticles();
      setArticles(articleData);
    };

    loadMagazines();
    loadArticles();
  }, []);

  const openPDF = (pdfUrl) => {
    window.open(pdfUrl, "_blank"); // Opens the PDF in a new tab
  };

  return (
    <div className="min-h-screen p-6">
      {/* Magazines Section */}
      <div className="mb-10">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">Magazines</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {magazines.map((mag) => (
            <div
              key={mag.id}
              className="overflow-hidden bg-white shadow-xl cursor-pointer rounded-2xl"
              onClick={() => openPDF(mag.pdf)} // Open PDF when the card is clicked
            >
              <img
                src={mag.cover}
                alt={mag.title}
                className="object-cover w-full h-60"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{mag.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles Section */}
      <div>
        <h2 className="mb-4 text-3xl font-bold text-gray-800">Articles</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {articles.map((article) => (
            <div key={article.id} className="overflow-hidden bg-white shadow-md rounded-2xl">
              <img
                src={article.image}
                alt={article.title}
                className="object-cover w-full h-40"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.description}</p>
                <a href="#" className="block mt-2 text-blue-600">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
