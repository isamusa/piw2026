import "./globals.css";

export const metadata = {
  title: "Plateau State Innovation Week 2026 | Ideas Today. Impact Tomorrow.",
  description:
    "Plateau State Innovation Week 2026 is a November 2026 innovation festival in Jos convened by meHub to empower Northern Nigeria through technology, entrepreneurship, and collaboration.",
  keywords: [
    "Plateau State Innovation Week 2026",
    "Jos Hackathon",
    "meHub Jos",
    "Plateau Tech Talent Directory",
    "Innovation Week Nigeria",
    "Plateau State Government Tech",
    "UNIJOS Technology",
    "Northern Nigeria Startup Incubator"
  ],
  alternates: {
    canonical: "https://plateauinnovationweek.ng",
  },
  openGraph: {
    title: "Plateau State Innovation Week 2026 | Jos, Nigeria",
    description:
      "A week-long innovation festival in Jos designed to unite government, universities, hubs, startups, and investors under one platform.",
    url: "https://plateauinnovationweek.ng",
    siteName: "Plateau State Innovation Week",
    images: [
      {
        url: "/plateau-innovation-week-2026-banner.jpeg",
        width: 1200,
        height: 630,
        alt: "Plateau State Innovation Week 2026 Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plateau State Innovation Week 2026",
    description:
      "Empowering Northern Nigeria through technology, entrepreneurship, and collaboration. Jos, November 2026.",
    images: ["/plateau-innovation-week-2026-banner.jpeg"],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Plateau State Innovation Week 2026",
    "description": "Plateau State Innovation Week 2026 is a week-long innovation festival in Jos convened by meHub to empower Northern Nigeria through technology, entrepreneurship, and collaboration.",
    "startDate": "2026-11-16T09:00:00+01:00",
    "endDate": "2026-11-20T18:00:00+01:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Jos, Plateau State, Nigeria",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "No. 84, Maryam Plaza, Dogon Agogo, Bauchi Road",
        "addressLocality": "Jos",
        "addressRegion": "Plateau State",
        "addressCountry": "NG"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "meHub",
      "url": "https://mehub.ng"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Digital+Numbers&family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Rubik+80s+Fade&family=Rubik+Glitch&family=Syne+Mono&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
