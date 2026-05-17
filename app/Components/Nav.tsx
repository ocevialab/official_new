"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";

import im1 from "../../public/assets/DigitalMarketing.jpg";
import im2 from "../../public/assets/Website.jpg";
import im3 from "../../public/assets/Social-Media.jpg";
import im4 from "../../public/Branding.jpg";

import {
  OCEVIALAB_SERVICES,
  type ServicePreview,
} from "../data/services";

interface NavProps {
  bgColor?: string;
  navTextColor?: string;
}

const Nav: React.FC<NavProps> = ({ bgColor, navTextColor }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileExpertiseOpen, setMobileExpertiseOpen] = useState(false);
  const [isExpertiesHovered, setExpertiesHovered] = useState(false);
  const [Hovered, setHovered] = useState<ServicePreview>("web");

  const menuRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mobileExpertiseRef = useRef<HTMLUListElement>(null);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const textElement = event.currentTarget.querySelector("span");
    if (!textElement) return;

    gsap.to(textElement, {
      y: -10,
      duration: 0.1,
      ease: "power1.out",
      onComplete: () => {
        gsap.set(textElement, { y: 20, opacity: 1 });
        gsap.to(textElement, {
          y: 0,
          duration: 0.1,
          ease: "power1.in",
        });
      },
    });
  };

  const toggleMenu = () => {
    if (isMobileMenuOpen && menuRef.current) {
      gsap.to(menuRef.current, {
        scaleY: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => setMobileMenuOpen(false),
      });
    } else {
      setMobileMenuOpen(true);
    }
  };

  const toggleCloseDrop = () => {
    if (isExpertiesHovered && contentRef.current && menuRef.current) {
      gsap.to(contentRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 0.2,
        stagger: -0.05,
        ease: "power2.in",
      });

      gsap.to(menuRef.current, {
        scaleY: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => setExpertiesHovered(false),
      });
    }
  };

  useEffect(() => {
    if (isExpertiesHovered && menuRef.current && contentRef.current) {
      gsap.fromTo(
        menuRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.5, ease: "power2.inOut" }
      );

      gsap.fromTo(
        contentRef.current.children,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }
  }, [isExpertiesHovered]);

  useEffect(() => {
    if (isMobileMenuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.5, ease: "power2.inOut" }
      );
    }
  }, [isMobileMenuOpen]);

  // ✅ Animate Mobile Expertise Dropdown
  useEffect(() => {
    const el = mobileExpertiseRef.current;
    if (!el) return;

    if (isMobileExpertiseOpen) {
      gsap.set(el, { display: "block" });
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 30,
          scaleY: 0.8,
          transformOrigin: "top center",
        },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 0.5,
          ease: "expo.out",
        }
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        y: 30,
        scaleY: 0.8,
        duration: 0.4,
        ease: "expo.in",
        onComplete: () => {
          gsap.set(el, { display: "none" });
        },
      });
    }
  }, [isMobileExpertiseOpen]);

  return (
    <div className="w-screen font-Mokoto tracking-widest flex justify-between items-center px-6 lg:px-20 py-6 top-0 z-10 overflow-hidden fixed md:bg-transparent bg-[#212121] bg-opacity-50 ">
      {/* Logo */}
      <div
        className="font-bold text-xl leading-none flex items-start z-20"
        style={{ color: navTextColor || "#f6f6f6" }}
      >
        <span>OceviaLab</span>
        <span className="text-[10px] mt-[2px] align-top">™</span>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex">
        <ul
          className="flex items-center space-x-16 text-xs font-semibold"
          style={{ color: navTextColor || "#f6f6f6" }}
        >
          {["Home", "Our Projects", "Expertise", "Contact"].map(
            (item, index) => (
              <li key={index} className="group">
                <Link
                  href={
                    item === "Home"
                      ? "/"
                      : item === "Expertise"
                      ? "#"
                      : item === "Our Projects"
                      ? "/works"
                      : `/${item.toLowerCase()}`
                  }
                  onMouseEnter={(e) => {
                    handleMouseEnter(e);
                    if (item === "Expertise") setExpertiesHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (item === "Expertise") setExpertiesHovered(false);
                  }}
                  className="relative overflow-hidden flex items-center hover:opacity-50 gap-2 z-40"
                >
                  <span className="block">{item}</span>
                  {item === "Expertise" && (
                    <div className="flex items-center rounded-full bg-[#fffdfc] bg-opacity-20 p-1">
                      <FaArrowDown className="w-2 h-2" />
                    </div>
                  )}
                </Link>
                {item === "Expertise" && isExpertiesHovered && (
                  <div
                    className="fixed top-0 left-0 w-screen"
                    ref={menuRef}
                    style={{
                      transformOrigin: "top center",
                      transform: "scaleY(0)",
                      backgroundColor: bgColor || "#2D2D2D",
                    }}
                    onMouseEnter={() => setExpertiesHovered(true)}
                    onMouseLeave={toggleCloseDrop}
                  >
                    <div
                      className="mt-28 px-24 mb-20 w-full flex justify-between items-stretch gap-10 xl:gap-16"
                      ref={contentRef}
                    >
                      <div className="self-start text-xs font-semibold uppercase tracking-[0.2em] opacity-70 shrink-0 pt-1">
                        Our Services
                      </div>
                      <ul className="flex flex-1 flex-col gap-4 md:gap-5 font-Mokoto font-bold text-lg md:text-xl lg:text-2xl max-w-xl min-w-0">
                        {OCEVIALAB_SERVICES.map((service) => (
                          <li
                            key={service.label}
                            onMouseEnter={() => setHovered(service.preview)}
                          >
                            <Link href={service.href}>{service.label}</Link>
                          </li>
                        ))}
                      </ul>
                      <div className="relative w-72 lg:w-96 shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src={
                            Hovered === "web"
                              ? im2
                              : Hovered === "marketing"
                              ? im1
                              : Hovered === "social"
                              ? im3
                              : im4
                          }
                          alt="expertise preview"
                          fill
                          sizes="(max-width: 1024px) 288px, 384px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className="lg:hidden z-40">
        <button
          onClick={toggleMenu}
          className="text-white text-2xl focus:outline-none transition-transform duration-300"
        >
          {isMobileMenuOpen ? (
            <IoClose
              className="transform rotate-180"
              style={{ color: navTextColor || "#f6f6f6" }}
            />
          ) : (
            <HiMenuAlt1
              className="transform rotate-0"
              style={{ color: navTextColor || "#f6f6f6" }}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 w-full h-full bg-[#212121] flex flex-col items-start justify-center z-30 px-8"
          style={{ transformOrigin: "top center", transform: "scaleY(0)" }}
        >
          <ul className="space-y-3 text-white text-4xl font-Mokoto font-bold text-start w-full">
            {["Home", "Our Projects", "Contact"].map((item, index) => (
              <li key={index}>
                <Link
                  href={
                    item === "Home"
                      ? "/"
                      : item === "Expertise"
                      ? "#"
                      : item === "Our Projects"
                      ? "/works"
                      : `/${item.toLowerCase()}`
                  }
                  onClick={toggleMenu}
                  className="hover:opacity-70 block"
                >
                  {item}
                </Link>
              </li>
            ))}
            <li>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setMobileExpertiseOpen(!isMobileExpertiseOpen)}
              >
                <span>Expertise</span>
                <FaArrowDown
                  className={`ml-2 transition-transform duration-300 ${
                    isMobileExpertiseOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              <ul
                ref={mobileExpertiseRef}
                className="pl-4 mt-4 space-y-2 text-2xl font-Mokoto font-light overflow-hidden max-h-[55vh] overflow-y-auto"
                style={{ display: "none", transformOrigin: "top center" }}
              >
                {OCEVIALAB_SERVICES.map((service) => (
                  <li key={service.label}>
                    <Link href={service.href} onClick={toggleMenu}>
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
