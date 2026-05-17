// pages/coming-soon.tsx

import Head from "next/head";
import Image from "next/image";
import Nav from "./Components/Nav";
import ParallaxText from "./Components/ParallaxText";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Coming Soon</title>
      </Head>
      <Nav bgColor="#141647" navTextColor="#fafafa" />
      <main className="relative min-h-screen flex items-center justify-end overflow-hidden bg-gradient-to-tr from-[#2980b9] to-[#0b20db] text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/coming-soon-bg.jpg"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative text-center flex flex-col justify-end min-h-screen px-4">
          <h2 className="text-4xl font-bold  text-[#a3cffa]">404</h2>
          <h1 className="text-5xl font-bold  text-[#a3cffa]">We are sorry!</h1>
          <ParallaxText
            baseVelocity={-0.6}
            fontSize="md:text-[250px] text-[150px]"
          >
            - Page Not Available -
          </ParallaxText>
        </div>
      </main>
    </>
  );
}
