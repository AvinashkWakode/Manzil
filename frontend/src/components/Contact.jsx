import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", message: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required.";
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage("Thank you for reaching out! Our team will get back to you soon.");
      setFormData({ name: "", email: "", mobile: "", message: "" });
      setErrors({});
      setTimeout(() => setSuccessMessage(""), 10000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-gray-800 bg-white md:px-8 lg:px-10">
      <div className="w-full max-w-2xl p-6 border border-gray-200 rounded-lg shadow-lg md:p-8 lg:p-10">
        <h1 className="mb-5 text-2xl font-extrabold text-center text-indigo-600 md:text-3xl">Contact Us</h1>
        <p className="mb-5 text-center text-gray-700">Have questions? Fill out the form and we’ll get back to you!</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {Object.keys(errors).map((key) => (
            <p key={key} className="text-sm text-red-500">{errors[key]}</p>
          ))}
          {successMessage && <p className="text-sm font-semibold text-green-600">{successMessage}</p>}
          
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md md:p-4 focus:ring-2 focus:ring-indigo-500"
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md md:p-4 focus:ring-2 focus:ring-indigo-500"
            placeholder="Email Address"
          />
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md md:p-4 focus:ring-2 focus:ring-indigo-500"
            placeholder="Mobile Number"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md md:p-4 focus:ring-2 focus:ring-indigo-500"
            placeholder="Your Message"
          ></textarea>
          
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition duration-300 bg-indigo-600 rounded-md md:py-4 hover:bg-indigo-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
