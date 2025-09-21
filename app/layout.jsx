import "./globals.css";

export const metadata = {
  title: "TerminalX",
  description: "A web-based terminal application built with Next.js and DaisyUI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className="h-full">
      <body className="antialiased h-full bg-base-300">
        {children}
      </body>
    </html>
  );
}