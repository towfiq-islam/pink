import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import ToastProvider from "@/provider/ToastProvider";

// Metadata
export const metadata = {
  title: "Dr. Saffy",
  description: "A starter template for Next.js projects with Redux",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <ReduxProvider>
          <ToastProvider />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
