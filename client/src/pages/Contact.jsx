import { useState } from "react";
import axios from "axios";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/contact", form);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FAF8F4]] py-10 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          {/* LEFT INFO */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              Have questions about properties, bookings, or your account?
              Reach out to us — we’re here to help.
            </p>

            <div className="space-y-4">
              <p>📍 Hamirpur, Himachal Pradesh, India</p>
              <p>📧 support@dreamdwell.com</p>
              <p>📞 +91 xxxxx xxxxx </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Send Message</h3>

            {submitted && (
              <p className="text-green-600 mb-3">
                Message sent successfully!
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 text-white py-3 rounded-md hover:bg-cyan-600 transition disabled:bg-cyan-300"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contact;