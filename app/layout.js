import "./globals.css";

export const metadata = {
  title: "Plateau State Innovation Week 2026 | Ideas Today. Impact Tomorrow.",
  description:
    "Plateau State Innovation Week 2026 is a November 2026 innovation festival in Jos convened by meHub to empower Northern Nigeria through technology, entrepreneurship, and collaboration.",
  keywords:
    "Plateau State, Innovation Week, Jos, Nigeria, Technology, Hackathon, Startups, meHub, PIW 2026",
  openGraph: {
    title: "Plateau State Innovation Week 2026",
    description:
      "A week-long innovation festival in Jos designed to unite government, universities, hubs, startups, and investors under one platform.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Digital+Numbers&family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Rubik+80s+Fade&family=Rubik+Glitch&family=Syne+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
