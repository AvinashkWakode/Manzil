import { useState } from "react";
import { User, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubscribeClick = () => {
    navigate("/subscribe"); // Navigate to Subscribe Page
  };

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Magazines", path: "/magazines" },
    { name: "Articles", path: "/articles" },
    { name: "Blogs", path: "/blogs" },
    { name: "Newsletter", path: "/newsletter" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="relative w-full shadow-md bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      {/* Search Bar Below Subscribe Button */}
      <div className="flex justify-center mt-6 md:mt-4">
        <div className="relative flex items-center w-1/4 px-2 py-1 border-b border-gray-400 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
          <Search className="w-5 h-5 mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search Something..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full text-sm text-gray-700 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between max-w-screen-xl px-10 py-4 mx-auto">
        {/* Logo */}
        <a href="/Home" className="flex items-center">
          <img src="manzillogo.png" alt="Manzil Logo" className="h-10" />
        </a>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={handleMenuToggle}
          className="text-gray-700 md:hidden focus:outline-none"
        >
          <span className="w-6 h-6">☰</span> {/* Hamburger icon */}
        </button>

        {/* Navigation */}
        <div className="flex justify-center flex-grow">
          <nav
            className={`absolute top-full left-0 w-full md:static md:w-auto md:flex md:space-x-6 md:items-center transition-all duration-300 ease-in-out ${
              isMenuOpen ? "block" : "hidden"
            } md:block`}
          >
            <ul className="flex flex-col p-4 space-y-4 font-bold md:p-0 md:flex-row md:space-y-0 md:space-x-6">
              {filteredNavItems.map((item) => (
                <li key={item.path}>
                  <a href={item.path} className="text-blue-600 hover:text-blue-800">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Icons */}
        <div className="flex items-center pr-10 space-x-6">
          <User
            className="w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-600"
            onClick={handleProfileClick}
          />
          <button
            onClick={handleSubscribeClick}
            className="inline-block px-6 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Subscribe
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
