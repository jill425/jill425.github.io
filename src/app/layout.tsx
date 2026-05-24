import type { Metadata } from "next";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jill — Software Engineer",
  description:
    "Personal portfolio and blog of Jill, a software engineer passionate about building great products.",
  openGraph: {
    title: "Jill — Software Engineer",
    description: "Portfolio, projects, and blog posts by Jill.",
    url: "https://jill425.github.io",
    siteName: "Jill's Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6JX1QH3HRY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6JX1QH3HRY');
          `}
        </Script>
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
