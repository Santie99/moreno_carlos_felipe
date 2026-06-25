import type { Metadata, Viewport } from "next";
import "./globals.css";
import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata(),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: siteConfig.title,
    template: "%s · Santie Bernal"
  },
  authors: [{ name: "Santie Bernal" }],
  creator: siteConfig.creator,
  applicationName: siteConfig.name,
  category: "technology"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#020617"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO">
      <body>{children}</body>
    </html>
  );
}
