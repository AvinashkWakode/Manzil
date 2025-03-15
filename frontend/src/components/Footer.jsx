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
    { icon: "facebook", link: "https://www.facebook.com/people/Bvicam-New-Delhi/100075344976453/" },
    { icon: "linkedin", link: "https://www.linkedin.com/in/bvicam-new-delhi/" },
    { icon: "instagram", link: "https://www.instagram.com/ibvicam/?igshid=YmMyMTA2M2Y%3D" },
    { icon: "twitter", link: "https://x.com/i/flow/login?redirect_after_login=%2FBharatiNews_" },
  ],
};

const Footer = () => {
  return (
    <footer className="px-2 py-4 text-white bg-gradient-to-r from-blue-900 to-gray-800 md:px-16">
      {/* Main Footer Grid */}
      <div className="grid grid-cols-2 gap-6 mx-auto text-sm max-w-7xl md:grid-cols-4">
        {/* Categories Section */}
        {footerData.categories.map((category, index) => (
          <div key={index}>
            <h4 className="mb-4 text-lg font-semibold text-white">{category.title}</h4>
            <ul className="space-y-2">
              {category.links.map((link, idx) => (
                <li key={idx} className="transition-opacity cursor-pointer hover:opacity-75">
                  {link.path.startsWith("http") ? (
                    <a href={link.path} target="_blank" rel="noopener noreferrer" className="text-white">
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.path} className="text-white">{link.name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social Media Section */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">Follow Us</h4>
          <ul className="space-y-3">
            {footerData.socialIcons.map((social, index) => (
              <li key={index}>
                <a href={social.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:opacity-75">
                  <img src={`https://www.google.com/s2/favicons?sz=64&domain=${social.link}`} alt={social.icon} className="w-6 h-6" />
                  {social.icon.charAt(0).toUpperCase() + social.icon.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Location Section with Increased Right Margin */}
        <div className="mt-0 mb-1 mr-8 md:mr-16">
          <h4 className="mb-4 text-lg font-semibold text-white">Our Location</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-white whitespace-nowrap">📍 BVICAM, Paschim Vihar East, New Delhi, India</li>
            <li className="flex items-center gap-2 text-white">📞 +91 98765 43210</li>
            <li className="flex items-center gap-2 text-white">✉️ manzil@bvicam.in</li>
            <li className="flex items-center gap-2 text-white">
              🌍 <a href="https://www.google.com/maps/place/Bharati+Vidyapeeth's+Institute+of+Computer+Applications+and+Management+(BVICAM)/@28.6755037,77.1106681,17z/data=!3m1!4b1!4m6!3m5!1s0x390d038b9232e7cd:0x34ebc68df4428491!8m2!3d28.675499!4d77.113243!16s%2Fg%2F11b86r2_8d?entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-75">
                View on Google Maps
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Image */}
      <div className="flex justify-center pt-6 mt-8 border-t border-gray-500">
        <img src="/footer.png" alt="Footer Image" className="w-full h-auto max-w-7xl" />
      </div>

      {/* Copyright Text */}
      <p className="mt-4 text-xs text-center text-white">© 2025 BVICAM, New Delhi. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
