import { useEffect, useState, useCallback } from "react";
import { fetchMagazines } from "./api";
import { Bookmark } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
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
  const [thumbPage, setThumbPage] = useState(0);
  const [goToPageInput, setGoToPageInput] = useState("");
  const [width] = useWindowSize();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const thumbsPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.userId);
    }

    fetchMagazines().then((data) => setMagazines(data));

    if (isLoggedIn && userId) {
      fetch(`http://localhost:1337/api/bookmarks?filters[user][$eq]=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          const bookmarks = data.data.reduce((acc, bookmark) => {
            acc[bookmark.id] = true;
            return acc;
          }, {});
          setBookmarked(bookmarks);
        });
    }
  }, [isLoggedIn, userId]);

  const openPDF = (url) => {
    setPdfUrl(url);
    setIsOpen(true);
    setCurrentSheet(0);
    setThumbPage(0);
  };

  const toggleBookmark = async (id, e) => {
    e.stopPropagation();
    const isBookmarked = !bookmarked[id];
    setBookmarked((prev) => ({ ...prev, [id]: isBookmarked }));

    if (isLoggedIn && userId) {
      try {
        const method = isBookmarked ? "POST" : "DELETE";
        const url = method === "POST"
          ? "http://localhost:1337/api/bookmarks"
          : `http://localhost:1337/api/bookmarks/${id}`;
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: method === "POST"
            ? JSON.stringify({ data: { user: userId, magazine: id } })
            : undefined,
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

  const handleNext = useCallback(() => {
    if (currentSheet * 2 + 2 < numPages) setCurrentSheet((prev) => prev + 1);
  }, [currentSheet, numPages]);

  const handlePrev = useCallback(() => {
    if (currentSheet > 0) setCurrentSheet((prev) => prev - 1);
  }, [currentSheet]);

  const handleGoToPage = () => {
    const page = parseInt(goToPageInput);
    if (!isNaN(page) && page >= 1 && page <= numPages) {
      setCurrentSheet(Math.floor((page - 1) / 2));
      setThumbPage(Math.floor((page - 1) / thumbsPerPage));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isOpen]);

  return (
    <div className="w-full min-h-screen">
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
                {/* Thumbnails */}
                <div className="flex justify-center mb-4 space-x-2">
                  {thumbPage > 0 && (
                    <button
                      className="px-2 font-bold text-gray-700 bg-white border rounded hover:bg-gray-100"
                      onClick={() => setThumbPage((prev) => prev - 1)}
                    >
                      ←
                    </button>
                  )}

                  {Array.from(
                    { length: thumbsPerPage },
                    (_, i) => thumbPage * thumbsPerPage + i
                  )
                    .filter((index) => index < numPages)
                    .map((index) => (
                      <div
                        key={index}
                        className={`cursor-pointer border-2 rounded-sm ${
                          Math.floor(currentSheet * 2) === index ||
                          Math.floor(currentSheet * 2 + 1) === index
                            ? "border-indigo-600"
                            : "border-transparent"
                        }`}
                        onClick={() => {
                          setCurrentSheet(Math.floor(index / 2));
                        }}
                      >
                        <Page
                          pageNumber={index + 1}
                          width={60}
                          renderAnnotationLayer={false}
                          renderTextLayer={false}
                        />
                      </div>
                    ))}

                  {(thumbPage + 1) * thumbsPerPage < numPages && (
                    <button
                      className="px-2 font-bold text-gray-700 bg-white border rounded hover:bg-gray-100"
                      onClick={() => setThumbPage((prev) => prev + 1)}
                    >
                      →
                    </button>
                  )}
                </div>
                <p className="mb-4 text-sm text-gray-500">
                   pages {thumbPage * thumbsPerPage + 1} to{" "}
                  {Math.min((thumbPage + 1) * thumbsPerPage, numPages)} of {numPages}
                </p>

               {/* Jump to Page */}
<div className="absolute flex items-center gap-2 top-14 right-14">
  <input
    type="number"
    placeholder="Go to page..."
    className="px-2 py-1 text-sm border rounded"
    value={goToPageInput}
    onChange={(e) => setGoToPageInput(e.target.value)}
  />
  <button
    onClick={handleGoToPage}
    className="px-3 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700"
  >
    Go
  </button>
</div>

                {/* PDF Display */}
                <div className="relative flex justify-center gap-4 mb-6">
                  <Page
                    pageNumber={currentSheet * 2 + 1}
                    width={width < 768 ? width * 0.9 : width * 0.4}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                  {currentSheet * 2 + 2 <= numPages && (
                    <Page
                      pageNumber={currentSheet * 2 + 2}
                      width={width < 768 ? width * 0.9 : width * 0.4}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  )}

                  {/* PDF arrows */}
                  <button
                    onClick={handlePrev}
                    className="absolute z-10 px-3 py-2 text-white -translate-y-1/2 bg-black rounded-full left-1 top-1/2 hover:bg-gray-800"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute z-10 px-3 py-2 text-white -translate-y-1/2 bg-black rounded-full right-1 top-1/2 hover:bg-gray-800"
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
