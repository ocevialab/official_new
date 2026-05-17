import React from "react";

import Image from "next/image";
import Link from "next/link";

import logo from "../../public/assets/OceviaLab-dark.webp";
import ParallaxText from "./ParallaxText";
import { OCEVIALAB_SERVICES } from "../data/services";

interface FooterProp {
  bgColorTop: string;
  bgColorMid?: string;
  bgColorBottom: string;
}

const Footer: React.FC<FooterProp> = ({
  bgColorBottom,
  bgColorTop,
  bgColorMid,
}) => {
  return (
    <div
      className="w-screen h-fit pt-4 z-10 relative "
      style={{
        background: `linear-gradient(to bottom,${bgColorTop} 0%, ${bgColorMid} 20%, ${bgColorBottom} 100%)`,
      }}
    >
      <div className="w-screen h-fit flex flex-col lg:flex-row justify-between  md:p-24">
        <div className="md:w-fit w-full h-fit flex md:justify-start justify-center items-center md:items-start">
          <div className="w-24 cursor-pointer z-40">
            <Image src={logo} alt="OceviaLab" />
          </div>
        </div>

        <div className="md:w-fit w-full h-fill flex flex-col md:flex-row justify-center items-center md:justify-between md:items-start md:gap-12 gap-2">
          <div className="w-fit h-fit flex-col justify-center items-center md:items-start mt-6">
            <div className="text-sm text-bold text-white text-center md:text-start mb-4 font-bold">
              Contact Us
            </div>
            <ul className="list-none text-text flex flex-col gap-2 text-sm items-center md:items-start ">
              <li className="max-w-[260px] text-center md:text-start leading-snug">
                NO. 416/B, Daham Mw, Habarakada, Homagama, Sri Lanka
              </li>
              <li className="cursor-pointer hover:underline">
                <a href="tel:+94771320533">+94 77 132 0533</a>
              </li>
              <li className="cursor-pointer hover:underline">
                <a href="tel:+61423314733">+61 42 331 4733</a>
              </li>
              <li className="cursor-pointer hover:underline">
                <a href="mailto:ocevialab@gmail.com">ocevialab@gmail.com</a>
              </li>
              <li className="cursor-pointer hover:underline">
                <a href="mailto:info@oceviallab.com">info@oceviallab.com</a>
              </li>
            </ul>
          </div>
          <div className="w-fit h-fit flex-col justify-center items-center md:items-start mt-6">
            <div className="text-sm text-bold text-white text-center md:text-start mb-4 font-bold">
              Our Services
            </div>
            <ul className="list-none text-text flex flex-col gap-2 text-sm items-center md:items-start">
              {OCEVIALAB_SERVICES.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="cursor-pointer hover:underline"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-fit h-fit flex-col justify-center items-start mt-6">
            <div className="text-sm text-bold text-white text-center md:text-start mb-4 font-bold">
              Pages
            </div>
            <ul className="list-none text-text flex flex-col gap-2 text-sm items-center md:items-start">
              <li>
                <Link href="/" className="cursor-pointer hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/works" className="cursor-pointer hover:underline">
                  Our Project
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/About-Us"
                  className="cursor-pointer hover:underline"
                >
                  About Us
                </Link>
              </li> */}
              <li>
                <Link
                  href="/contact"
                  className="cursor-pointer hover:underline"
                >
                  Contact Us
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/Careers"
                  className="cursor-pointer hover:underline"
                >
                  Careers
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="w-fit h-fit flex-col justify-center items-start mt-6">
            <div className="text-sm text-bold text-white text-center md:text-start mb-4 font-bold">
              Follow Us
            </div>
            <ul className="list-none text-text flex flex-col gap-2 text-sm items-center md:items-start">
              <a
                className="cursor-pointer hover:underline"
                href="https://www.instagram.com/ocevialab"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                className="cursor-pointer hover:underline"
                href="/notAvailable"
                target="_blank"
                rel="noopener noreferrer"
              >
                Youtube
              </a>
              <a
                className="cursor-pointer hover:underline"
                href="https://www.facebook.com/share/1L3fUquxz1/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                className="cursor-pointer hover:underline"
                href="https://www.tiktok.com/@ocevialab"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tiktok
              </a>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-fit bg-green lg:px-24 opacity-80 flex justify-between items-center  text-sm font-extralight text-text px-4 md:px-8 relative -bottom-8">
        <div>All rights reserved 2026 © OceviaLab</div>
        <div className="flex justify-end gap-12 ">
          <div className="cursor-pointer hover:underline">Privacy Policy</div>
          <div className="cursor-pointer hover:underline">Terms of Service</div>
        </div>
      </div>
      <main className="flex flex-col items-center justify-center h-[360px]  bg-transparent text-text md:pb-0">
        <ParallaxText baseVelocity={-1.5} fontSize="text-[300px]">
          - Get In Touch -
        </ParallaxText>
      </main>
    </div>
  );
};

export default Footer;
