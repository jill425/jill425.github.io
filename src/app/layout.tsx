import type { Metadata } from "next";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jill — AI Engineer · Backend & Data",
  description:
    "Jill builds products end to end and puts AI to work reliably: gate tests, isolated acceptance and eval thresholds.",
  openGraph: {
    title: "Jill — AI Engineer · Backend & Data",
    description: "Work, experience and writing by Jill.",
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
          <div className="crt" aria-hidden="true" />
          <SiteNav />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
