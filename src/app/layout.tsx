import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata: Metadata = {
  title: "Yangyan Li (李扬彦)",
  description:
    "Senior Researcher at Ant Group Research Institute. Research in Computer Graphics, Computer Vision, 3D Vision, and Spatial Intelligence.",
  keywords: [
    "Yangyan Li",
    "李扬彦",
    "Computer Vision",
    "Computer Graphics",
    "3D Vision",
    "PointCNN",
    "Spatial Intelligence",
    "Ant Group",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Yangyan Li (李扬彦)",
    description:
      "Senior Researcher at Ant Group Research Institute. Research in Computer Graphics, Computer Vision, and Spatial Intelligence.",
    url: "https://yangyan.li",
    type: "website",
    images: [
      {
        url: "https://yangyan.li/portrait.jpg",
        width: 200,
        height: 200,
        alt: "Yangyan Li",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Yangyan Li (李扬彦)",
    description:
      "Senior Researcher at Ant Group Research Institute. Research in Computer Graphics, Computer Vision, and Spatial Intelligence.",
    images: ["https://yangyan.li/portrait.jpg"],
  },
  robots: "index, follow",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Yangyan Li",
  "alternateName": "李扬彦",
  "url": "https://yangyan.li",
  "image": "https://yangyan.li/portrait.jpg",
  "jobTitle": "Senior Researcher",
  "worksFor": {
    "@type": "Organization",
    "name": "Ant Group Research Institute"
  },
  "alumniOf": [
    {
      "@type": "CollegeOrUniversity",
      "name": "Stanford University"
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "Tel Aviv University"
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "University of Chinese Academy of Sciences"
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "Sichuan University"
    }
  ],
  "sameAs": [
    "https://scholar.google.com/citations?user=9RxI7UAAAAAJ&hl=en",
    "https://github.com/yangyanli"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var resolved = stored && stored !== 'system' ? stored : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  if (resolved === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
