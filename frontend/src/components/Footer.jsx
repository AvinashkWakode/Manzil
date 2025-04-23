import { Link } from "react-router-dom";

const footerData = {
  categories: [
    {
      title: "Connect & Grow With Us",
      links: [
        { name: "About us", path: "/About" },
        { name: "Contact us", path: "/contact" },
        { name: "Careers", path: "/careers" },
        { name: "FAQs", path: "/faqs" },
        { name: "Terms", path: "/terms" },
      ],
    },
    {
      title: "Important Links",
      links: [
        { name: "BVICAM", path: "https://bvicam.in" },
        { name: "Bharati News", path: "https://bharatinews.com" },
        { name: "Bharati Radio", path: "https://bharatiradio.com" },
        { name: "Bharati Network", path: "https://bharatinetwork.com" },
        { name: "INDIACom", path: "https://bvicam.ac.in/indiacom/" },
      ],
    },
  ],
  socialIcons: [
    {
      icon: "facebook",
      link: "https://www.facebook.com/people/Bvicam-New-Delhi/100075344976453/",
    },
    {
      icon: "linkedin",
      link: "https://www.linkedin.com/in/bvicam-new-delhi/",
    },
    {
      icon: "instagram",
      link: "https://www.instagram.com/ibvicam/?igshid=YmMyMTA2M2Y%3D",
    },
    {
      icon: "twitter",
      link: "https://x.com/i/flow/login?redirect_after_login=%2FBharatiNews_",
    },
  ],
};

const Footer = () => {
  return (
    <footer className="w-full px-4 py-8 text-white bg-gradient-to-r from-blue-900 to-gray-800 md:px-16 lg:px-24">
      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-8 mx-auto text-sm sm:grid-cols-2 md:grid-cols-4 max-w-7xl">
        {/* Dynamic Category Links */}
        {footerData.categories.map((category, index) => (
          <div key={index}>
            <h4 className="mb-4 text-lg font-semibold text-white">{category.title}</h4>
            <ul className="space-y-2">
              {category.links.map((link, idx) => (
                <li key={idx}>
                  {link.path.startsWith("http") ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white transition-opacity hover:opacity-75"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-white transition-opacity hover:opacity-75"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social Media */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">Follow Us</h4>
          <ul className="space-y-3">
            {footerData.socialIcons.map((social, index) => (
              <li key={index}>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white transition-opacity hover:opacity-75"
                >
                  <img
                    src={`https://www.google.com/s2/favicons?sz=64&domain=${social.link}`}
                    alt={social.icon}
                    className="w-6 h-6"
                  />
                  {social.icon.charAt(0).toUpperCase() + social.icon.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Location Details */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">Our Location</h4>
          <address className="space-y-3 text-sm not-italic text-white">
            <div className="flex items-center gap-2 whitespace-nowrap">
              📍 BVICAM, Paschim Vihar East, New Delhi, India
            </div>
            <div className="flex items-center gap-2">📞 +91 98765 43210</div>
            <div className="flex items-center gap-2">✉️ manzil@bvicam.in</div>
            <div className="flex items-center gap-2">
              🌍{" "}
              <a
                href="https://www.google.com/maps/place/Bharati+Vidyapeeth's+Institute+of+Computer+Applications+and+Management+(BVICAM)/@28.6755037,77.1106681,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-opacity hover:opacity-75"
              >
                View on Google Maps
              </a>
            </div>
          </address>
        </div>
      </div>

      {/* Footer Image */}
      <div className="flex justify-center pt-8 mt-10 border-t border-gray-500">
        <img
          src="/footer.png"
          alt="Footer Visual"
          className="w-full h-auto max-w-7xl"
        />
      </div>

      {/* Copyright */}
      <p className="mt-4 text-xs text-center text-white">
        © 2025 BVICAM, New Delhi. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
