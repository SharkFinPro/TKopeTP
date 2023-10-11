import { ReactNode } from "react";
import "./fonts/fonts.css";
import "./global.css";

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}