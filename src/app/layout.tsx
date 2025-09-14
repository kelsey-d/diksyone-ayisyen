import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haitian Creole Dictionary",
  description:
    "Haitian Creole Dictionary, Diksyone Ayisyen, is an English to Haitian Creole dictionary with a poetic twist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#001669]`}
      >
        {/* Header */}
        <header
          className="text-white bg-[#001669] shadow-lg h-[25vh]"
          style={{
            backgroundImage: `url(./blue-fish.png)`,
            backgroundBlendMode: "multiply",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="h-full w-full container mx-auto px-4 py-8">
            <div className="h-full w-full flex justify-center items-center text-center space-y-4">
              <h1
                className="text-4xl font-bold text-[#BC0000]"
                style={{ fontFamily: "Ibarra Real Nova, serif" }}
              >
                Diksyonè Ayisyen
              </h1>
            </div>
          </div>
        </header>
        {children}
        {/* Footer */}
        <footer className="text-white mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <p className="text-lg">Fèt ak renmen pou kominote Ayisyen an</p>
              <p className="text-sm opacity-80">
                Pwomote lang Kreyòl Ayisyen an ak literati Ayisyen an
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
