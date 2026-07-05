// PURPOSE: Root layout for the App Router. Wraps EVERY page in the
//          app. It defines the <html>/<body> shell and imports the
//          global stylesheet exactly once.
// ══════════════════════════════════════════════════════
import "./globals.css";

export const metadata = {
  title: "Nova Tasks — Midnight Task Manager",
  description: "A dark, focused task manager built with Next.js 16 & React 19.",
};

// The root layout must render <html> and <body>. `children` is whatever
// page is currently active (here, page.js). Passing it through as a prop
// is how Next.js injects the page content into the shell.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* antialiased smooths font rendering; min-h-screen guarantees the
          dark background fills the viewport even when there are few tasks. */}
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
