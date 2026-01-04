import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../api";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/auth/contact", formData);

    toast.success(
      "Thank you for contacting SociallyConnect! We’ll get back to you soon."
    );

    setFormData({ name: "", email: "", message: "" });
  } catch (error) {
    toast.error("Failed to send message. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Contact Us
        </h1>
        <p className="text-center text-gray-500 mb-10">
          We'd love to hear from you. Reach out to us anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
              <p className="text-gray-600">
                Have questions, feedback, or support requests? Our team at
                <span className="font-medium"> SociallyConnect</span> is here to help.
              </p>
            </div>

            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Email:</span> support@sociallyconnect.com
              </p>
              <p>
                <span className="font-semibold">Response Time:</span> Within 24–48 hours
              </p>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl">
              <h3 className="font-semibold mb-2">Why Contact Us?</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Account or login issues</li>
                <li>Bug reports & feature requests</li>
                <li>Privacy or security concerns</li>
                <li>General inquiries</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SociallyConnect. We’re here to help.
        </div>
      </div>
    </div>
  );
};

export default ContactUs;