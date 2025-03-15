import { useEffect, useState } from "react";
import { fetchBlogs } from "./api";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null); // ✅ Define state for PDF

  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs();
      setBlogs(data.slice(0, 6)); 
    };
    getBlogs();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-b from-white via-gray-100 to-white">
      <div className="container mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-600">Latest Blogs</h2>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
              >
                {blog.coverImage ? (
                  <button 
                    onClick={() => setSelectedPDF(blog.pdfFile)} 
                    className="block w-full"
                  >
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="object-cover w-full h-56 rounded-lg"
                    />
                  </button>
                ) : (
                  <p className="text-gray-500">No Image Available</p>
                )}
                <h3 className="mt-4 text-xl font-bold text-gray-800">{blog.title}</h3>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Display PDF Below the Grid */}
        {selectedPDF && (
          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold text-center">Preview</h3>
            <iframe 
              src={selectedPDF} 
              className="w-full h-[600px] border rounded-lg"
              title="PDF Preview"
            />
            <button 
              onClick={() => setSelectedPDF(null)} 
              className="block px-4 py-2 mx-auto mt-4 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Close PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
