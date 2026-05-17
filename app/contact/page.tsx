// Contact.tsx
"use client";

import React, { useState, useRef } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Mouse-move glow setup (unchanged but optimized for mobile)
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const defaultShadow = `
    16px 4px 20px rgba(45, 95, 157,0.8),
    0px 0px 40px rgba(45, 95, 157,0.3)
  `;

  const handleMouseMove = (e: React.MouseEvent) => {
    // Disable glow effect on mobile for better performance
    if (window.innerWidth < 768) return;

    if (!containerRef.current || !headingRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const maxOffset = 40;
    const offsetX = (x / (rect.width / 2)) * maxOffset;
    const offsetY = (y / (rect.height / 2)) * maxOffset;
    headingRef.current.style.textShadow = `
      ${-offsetX}px ${-offsetY}px 20px rgba(45, 95, 157,0.8),
      ${offsetX * 0.5}px ${offsetY * 0.5}px 40px rgba(45, 95, 157,0.3)
    `;
  };

  const handleMouseLeave = () => {
    if (headingRef.current) {
      headingRef.current.style.textShadow = defaultShadow;
    }
  };

  // Input handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // EmailJS submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    console.log(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!);
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setFormData({
        fullName: "",
        email: "",
        mobileNumber: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <>
      <Nav bgColor="#212121" />

      <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#010B19] text-white">
        <div className="px-4 py-8 sm:px-6 md:px-10 lg:py-16">
          <div className="max-w-7xl mx-auto mt-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16">
              {/* Left Panel with Glow Effect */}
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full lg:w-1/2 flex flex-col items-start text-left relative overflow-visible lg:cursor-move "
              >
                <h1
                  ref={headingRef}
                  style={{ textShadow: defaultShadow }}
                  className="relative text-6xl sm:text-8xl md:text-9xl lg:text-[200px] xl:text-[300px] font-bold font-Mokoto text-[rgb(248,251,254)] leading-none mb-4 lg:mb-8"
                >
                  Hey
                </h1>
                <p className="relative font-thin text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#ded9cf] lg:pr-16 max-w-md lg:max-w-none ml-0 lg:ml-6 mt-4">
                  Let&apos;s start something great together!
                </p>
              </div>

              {/* Contact Form */}
              <div className="w-full lg:w-1/2 lg:max-w-xl mt-4">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6 sm:space-y-8"
                >
                  <div>
                    <label className="block mb-2 text-sm sm:text-base text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-600 outline-none focus:border-[#ded9cf] transition-colors text-white placeholder-gray-500 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm sm:text-base text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your email address"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-600 outline-none focus:border-[#ded9cf] transition-colors text-white placeholder-gray-500 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm sm:text-base text-gray-300">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                      placeholder="Your mobile number"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-600 outline-none focus:border-[#ded9cf] transition-colors text-white placeholder-gray-500 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm sm:text-base text-gray-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Subject"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-600 outline-none focus:border-[#ded9cf] transition-colors text-white placeholder-gray-500 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm sm:text-base text-gray-300">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Your message"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-600 outline-none focus:border-[#ded9cf] transition-colors resize-none text-white placeholder-gray-500 text-sm sm:text-base"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-4 sm:gap-4 pt-4">
                    <div className="flex items-center justify-center sm:justify-start">
                      {status === "sending" && (
                        <span className="text-blue-400 text-sm sm:text-base">
                          Sending…
                        </span>
                      )}
                      {status === "sent" && (
                        <span className="text-green-400 text-sm sm:text-base">
                          Message sent successfully!
                        </span>
                      )}
                      {status === "error" && (
                        <span className="text-red-400 text-sm sm:text-base">
                          Failed to send message.
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full sm:w-auto bg-[#ded9cf] text-black px-8 py-3 rounded hover:opacity-80 transition-opacity disabled:opacity-50 font-medium text-sm sm:text-base min-w-[120px]"
                    >
                      {status === "sending" ? "Sending..." : "Send"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer
        bgColorBottom="#02214d"
        bgColorMid="#07101E"
        bgColorTop="#040719"
      />
    </>
  );
};

export default Contact;
