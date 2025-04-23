import { useState, useEffect } from "react";
import { User, Search, Menu, UserCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import { motion } from "framer-motion";

const fetchSuggestions = async (term, category) => {
  const dummyData = {
    articles: ["AI in 2025", "React Best Practices", "Future of Tech"],
    blogs: ["Travel Diaries", "Healthy Living", "Startup Growth"],
    magazines: ["Tech Monthly", "Design Digest", "Business Weekly"],
  };

  const results = dummyData[category]?.filter((item) =>
    item.toLowerCase().includes(term.toLowerCase())
  );

  return results || [];
};

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentSection = location.pathname.split("/")[1];

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}&section=${currentSection}`);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim().length > 0) {
        fetchSuggestions(searchTerm, currentSection).then(setSuggestions);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, currentSection]);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    setIsLoggedIn(!!storedUser);
  }, [location]);

  const handleMyProfile = () => {
    navigate("/Userdash");
  };

  return (
    <header className="w-full shadow-md bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="flex items-center justify-between px-6 py-4 mx-6 md:mx-12 lg:mx-24">
        {/* Logo */}
        <a href="/home" className="flex items-center">
          <img src="manzillogo.png" alt="Manzil Logo" className="h-10" />
        </a>

        {/* Search Bar with Suggestions */}
        <div className="relative items-center hidden w-1/3 px-4 py-2 bg-white border border-gray-300 rounded-full md:flex">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder={`Search in ${currentSection || "site"}...`}
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
            className="w-full ml-2 text-gray-700 focus:outline-none"
          />

          {suggestions.length > 0 && (
            <ul className="absolute left-0 z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg top-full">
              {suggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-100"
                  onClick={() => {
                    setSearchTerm(suggestion);
                    navigate(`/search?query=${encodeURIComponent(suggestion)}&section=${currentSection}`);
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Icons & Menu Button */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn && (
            <>
              <User
                className="hidden w-6 h-6 text-gray-700 cursor-pointer md:block"
                onClick={() => setShowLogin(true)}
              />
              <button
                onClick={() => navigate("/subscribe")}
                className="hidden px-6 py-2 text-white bg-red-600 rounded-full md:block hover:bg-red-700"
              >
                Subscription
              </button>
            </>
          )}
          {isLoggedIn && (
            <button
              onClick={handleMyProfile}
              className="items-center hidden gap-2 px-5 py-2 text-white transition-all duration-300 rounded-full shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:flex hover:from-indigo-600 hover:to-pink-600"
            >
              <UserCircle className="w-5 h-5" />
              My Profile
            </button>
          )}

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="px-6 pb-4 mx-6 md:mx-12 lg:mx-24">
        <div className="flex flex-col p-4 rounded-lg shadow-md bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 md:flex-row md:justify-center">
          <ul className="flex flex-col space-y-2 font-medium md:flex-row md:space-y-0 md:space-x-4">
            {["Home", "Magazines", "Articles", "Events", "About", "Contact"].map((item) => {
              const path = `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;
              return (
                <li key={item}>
                  <a
                    href={path}
                    className={`block px-5 py-2 rounded-full transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowLogin(false)}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-[750px] max-w-full p-6 overflow-auto"
          >
            <button
              className="absolute text-gray-600 top-4 right-4 hover:text-gray-800"
              onClick={() => setShowLogin(false)}
            >
              ✖
            </button>
            <Login />
          </motion.div>
        </div>
      )}
    </header>
  );
};

export default Header;
