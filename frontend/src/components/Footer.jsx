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
    <footer className="w-full px-4 py-10 text-white bg-gradient-to-r from-blue-500 to-indigo-600 md:px-16 lg:px-24">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-10 mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Category Columns */}
        {footerData.categories.map((section, idx) => (
          <div key={idx} className="text-left">
            <h4 className="mb-4 text-lg font-semibold text-white">{section.title}</h4>
            <ul className="space-y-3 text-sm">
              {section.links.map((link, index) => (
                <li key={index}>
                  {link.path.startsWith("http") ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white transition-colors hover:text-blue-900"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-white transition-colors hover:text-blue-500"
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
        <div className="flex flex-col items-start space-y-3 text-left">
          <h4 className="mb-4 text-lg font-semibold text-white">Follow Us</h4>
          <ul className="space-y-3 text-sm">
            {footerData.socialIcons.map((social, index) => (
              <li key={index}>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white transition-colors hover:text-blue-500"
                >
                  <img
                    src={`https://www.google.com/s2/favicons?sz=64&domain=${social.link}`}
                    alt={social.icon}
                    className="w-5 h-5"
                  />
                  {social.icon.charAt(0).toUpperCase() + social.icon.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Address */}
        <div className="flex flex-col items-start space-y-3 text-left">
          <h4 className="mb-4 text-lg font-semibold text-white">Our Location</h4>
          <address className="space-y-2 text-sm not-italic">
            <div className="flex items-start gap-2">📍 BVICAM, Paschim Vihar East, New Delhi, India</div>
            <div className="flex items-center gap-2">📞 +91 98765 43210</div>
            <div className="flex items-center gap-2">✉️ manzil@bvicam.in</div>
            <div className="flex items-center gap-2">
              🌍{" "}
              <a
                href="https://www.google.com/maps/place/Bharati+Vidyapeeth's+Institute+of+Computer+Applications+and+Management+(BVICAM)/@28.6755037,77.1106681,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors hover:text-blue-500"
              >
                View on Google Maps
              </a>
            </div>
          </address>
        </div>
      </div>

      {/* Footer Image */}
      <div className="flex justify-center pt-6 mt-10 border-t border-gray-700">
        <img
          src="/footer.png"
          alt="Footer visual"
          className="w-full h-auto max-w-6xl"
        />
      </div>

      {/* Bottom Text */}
      <p className="mt-6 text-xs text-center text-white">
        © 2025 BVICAM, New Delhi. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
