/** OceviaLab service offerings — labels, routes, and nav preview imagery keys */
export type ServicePreview = "web" | "marketing" | "social" | "brand";

export interface OceviaService {
  label: string;
  href: string;
  preview: ServicePreview;
  description: string;
}

export const OCEVIALAB_SERVICES: OceviaService[] = [
  {
    label: "Web Design & Development",
    href: "/Expertise/Web-Development",
    preview: "web",
    description:
      "Responsive sites and web experiences—from UX and UI through build and launch.",
  },
  {
    label: "Mobile Application Design & Development",
    href: "/contact",
    preview: "web",
    description:
      "Native-feel mobile apps with thoughtful flows, visuals, and performance.",
  },
  {
    label: "Management System Development",
    href: "/contact",
    preview: "web",
    description:
      "Custom internal tools and business systems that streamline how you work.",
  },
  {
    label: "IT & Digital Solutions",
    href: "/contact",
    preview: "marketing",
    description:
      "Consulting, integrations, and technical solutions for modern operations.",
  },
  {
    label: "SEO",
    href: "/Expertise/Digital-Marketing",
    preview: "marketing",
    description:
      "Search visibility, technical SEO, and content structure that ranks.",
  },
  {
    label: "Digital Marketing",
    href: "/Expertise/Digital-Marketing",
    preview: "marketing",
    description:
      "Campaigns, analytics, and channels that grow awareness and conversions.",
  },
  {
    label: "Branding & Identity",
    href: "/Expertise/Branding-n-Design",
    preview: "brand",
    description:
      "Strategy, visual identity, and guidelines that define how you show up.",
  },
];

/** Map UI service tag → legacy `worksData` tag strings for filtering */
export const SERVICE_TAG_ALIASES: Record<string, string[]> = {
  "Web Design & Development": [
    "Web Development",
    "Web Design and Development",
    "Web Design & Development",
  ],
  "Mobile Application Design & Development": [
    "Mobile Application Design & Development",
    "Mobile App",
  ],
  "Management System Development": [
    "Management System Development",
    "Management System",
  ],
  "IT & Digital Solutions": ["IT & Digital Solutions", "IT", "Digital Solutions"],
  SEO: ["SEO", "SEO and Content Marketing"],
  "Digital Marketing": [
    "Digital Marketing",
    "Social Media",
    "Social Media Management",
  ],
  "Branding & Identity": ["Branding & Design", "Branding & Desing", "Branding and Visual Identity"],
};
