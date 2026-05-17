import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "OceviaLab – Creative Digital Agency",
  description:
    "OceviaLab is a modern creative agency specializing in websites, animations, and digital experiences.",
  keywords: [
    "OceviaLab",
    "digital agency",
    "OceviaLab designs",
    "web development",
    "web design agency",
    "web design studio",
    "web design company",
    "web design services",
    "web development agency",
    "web development studio",
    "software development",
    "software development company",
    "software development services",
    "software development agency",
    "digital marketing",
    "digital marketing agency",
    "digital marketing services",
    "digital marketing company",
    "branding",
    "branding agency",
    "branding services",
    "branding company",
    "graphic design",
    "graphic design agency",
    "graphic design services",
    "low budget web design",
    "affordable web design",
    "cheap web design",
    "custom web design",
    "responsive web design",
    "ecommerce web design",
    "wordpress web design",
    "ui design",
    "ux design",
    "user experience design",
    "user interface design",
    "luxury web design",
    "minimalist web design",
    "modern web design",
    "creative web design",
    "professional web design",
    "social media marketing",
    "search engine optimization",
    "SEO",
    "web design",
    "creative studio",
    "next.js",
    "framer motion",
    "GSAP",
  ],
  metadataBase: new URL("https://ocevialab.com"),
  openGraph: {
    title: "OceviaLab – Creative Digital Agency",
    description:
      "OceviaLab creates cutting-edge websites with smooth animations and modern aesthetics.",
    url: "https://ocevialab.com",
    siteName: "OceviaLab",
    images: [
      {
        url: "https://ocevialab.com/favicon.png",

        width: 1200,
        height: 630,
        alt: "OceviaLab Hero Image",
      },
    ],
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "OceviaLab – Creative Digital Agency",
  //   description: "Cutting-edge websites and smooth web animations by OceviaLab.",
  //   images: ["/assets/logo-WM.svg"],
  // },
  icons: {
    icon: "/favicon.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("we are OceviaLab, This is implemented coding from scratch");
  console.log("Not a clone, but a unique creation");
  console.log("Not a no-code tool, but a custom-built solution");
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="antialiased tracking-widest">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
