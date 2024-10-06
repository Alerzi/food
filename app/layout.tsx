import type { Metadata } from "next";
import "./globals.css";
import {Body} from "@/components";

export const metadata: Metadata = {
  title: "Food",
  description: "Generated by create next app",
};

export default function RootLayout({ children, }: Readonly<{children: React.ReactNode;}>) {
  
  return (
    <html lang="en">
      <body>
          <Body page={children} />
      </body>
    </html>
  );
}
