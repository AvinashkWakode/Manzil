import { useEffect, useState, useRef } from "react";
import { fetchMagazines } from "./api";
import { Bookmark } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// ✅ Proper worker setup for Vite
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
};

const Magazines = () => {
  const [magazines, setMagazines] = useState([]);
  const [bookmarked, setBookmarked] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [currentSheet, setCurrentSheet] = useState(0);
  const [width] = useWindowSize();
  const flipBookRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [userId, setUserId] = useState(null); // Store user ID

  useEffect(() => {
    // Check if user is logged in by looking for the token in localStorage
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding JWT token
      setUserId(decodedToken.userId); // Assuming userId is stored in the token
    } else {
      setIsLoggedIn(false);
    }

    // Fetch magazines
    fetchMagazines().then((data) => setMagazines(data));

    if (isLoggedIn && userId) {
      // Fetch bookmarks for the user
      fetch(`http://localhost:1337/api/bookmarks?filters[user][$eq]=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          const bookmarks = data.data.reduce((acc, bookmark) => {
            acc[bookmark.id] = true;
            return acc;
          }, {});
          setBookmarked(bookmarks); // Set the bookmarks state
        });
    }
  }, [isLoggedIn, userId]);

  const openPDF = (url) => {
    setPdfUrl(url);
    setIsOpen(true);
    setCurrentSheet(0);
  };

  const toggleBookmark = async (id, e) => {
    e.stopPropagation();

    // Toggle bookmark UI
    const isBookmarked = !bookmarked[id];
    setBookmarked((prev) => ({ ...prev, [id]: isBookmarked }));

    // If logged in, save the bookmark to Strapi
    if (isLoggedIn && userId) {
      try {
        const method = isBookmarked ? "POST" : "DELETE"; // Use DELETE for removing bookmarks
        const url =
          method === "POST"
            ? "http://localhost:1337/api/bookmarks"
            : `http://localhost:1337/api/bookmarks/${id}`;
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: method === "POST" ? JSON.stringify({
            data: {
              user: userId,
              magazine: id,
            },
          }) : undefined,
        });
      } catch (error) {
        console.error("Failed to save bookmark:", error);
      }
    }
  };

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const closeReader = () => {
    setIsOpen(false);
    setPdfUrl("");
  };

  const renderFlipPage = (pageNumber) => (
    <div
      style={{
        width: "50%",
        height: "100%",
        margin: "5px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Page
        pageNumber={pageNumber}
        width={width < 768 ? width * 0.9 : width * 0.4}
        height={width < 768 ? width * 1.2 : width * 0.6}
        renderAnnotationLayer={false}
        renderTextLayer={false}
      />
    </div>
  );

  const handleNext = () => {
    if (currentSheet * 2 + 2 < numPages) {
      setCurrentSheet(currentSheet + 1);
    }
  };

  const handlePrev = () => {
    if (currentSheet > 0) {
      setCurrentSheet(currentSheet - 1);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {!isOpen ? (
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {magazines.map((mag) => (
            <div
              key={mag.id}
              className="relative overflow-hidden transition duration-100 border shadow-xl cursor-pointer rounded-2xl hover:shadow-2xl"
              onClick={() => openPDF(mag.pdf)}
            >
              <div className="w-full h-[320px] flex justify-center items-center overflow-hidden">
                <img
                  src={mag.cover}
                  alt={mag.title}
                  className="w-[290px] h-[350px] object-cover transition-all duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
              <div className="relative p-4 bg-white">
                <h2 className="text-lg font-bold text-gray-800">{mag.title}</h2>

                {/* Show bookmark only if logged in */}
                {isLoggedIn && (
                  <div
                    className="absolute p-2 transition rounded-full bottom-2 right-2 bg-white/80 hover:bg-white"
                    onClick={(e) => toggleBookmark(mag.id, e)}
                  >
                    <Bookmark
                      className={`w-5 h-5 transition-colors ${bookmarked[mag.id] ? "text-blue-600" : "text-gray-600"}`}
                      fill={bookmarked[mag.id] ? "currentColor" : "none"}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative flex flex-col items-center w-full min-h-screen px-4 py-10 bg-gray-100">
          <button
            onClick={closeReader}
            className="absolute z-20 p-2 text-black bg-white rounded-full top-4 right-4"
          >
            X
          </button>

          <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
            {numPages && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    perspective: "1500px",
                    width: "100%",
                    margin: "0 auto",
                  }}
                  ref={flipBookRef}
                >
                  {renderFlipPage(currentSheet * 2 + 1)}
                  {currentSheet * 2 + 2 <= numPages && renderFlipPage(currentSheet * 2 + 2)}
                </div>

                <div className="mt-4 text-sm font-medium text-gray-700">
                  Page {currentSheet * 2 + 1} - {currentSheet * 2 + 2 <= numPages ? currentSheet * 2 + 2 : ""}
                </div>

                <div className="absolute flex justify-between w-full px-4 transform -translate-y-1/2 top-1/2">
                  <button
                    onClick={handlePrev}
                    className="px-4 py-2 text-white bg-black rounded-full hover:bg-gray-800"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 text-white bg-black rounded-full hover:bg-gray-800"
                  >
                    →
                  </button>
                </div>
              </>
            )}
          </Document>
        </div>
      )}
    </div>
  );
};

export default Magazines;
