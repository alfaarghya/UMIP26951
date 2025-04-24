import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "alfaarghya.dev - Shape Ideas with Technology",
  description:
    "A personal portfolio created by Arghya Das (alfaarghya), a full-stack software developer, focused on crafting meaningful web applications with creativity and technical expertise, turning intricate ideas into real-world digital solutions, one line of code at a time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.className} bg-[#0A0A0A] h-full p-2`}>
        {children}
      </body>
    </html>
  );
}
