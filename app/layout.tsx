import NavBar from "./components/NavBar";
import "./globals.css";

export const metadata = {
  title: "My Testaurant App",
  description: "",
  icons: [
    {
      url: "/favicon.ico",
      sizes: "16x16",
      type: "image/x-icon",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //children is the JSX of the page WE ARE CURRENTLY ON
  return (
    <html lang="en">
      <body>
        <main className="bg-gray-100 min-h-screen w-screen">
          <main className="max-w-screen-2xl m-auto bg-white">
            {/* NAVBAR */}
            <NavBar />
            {children}
          </main>
        </main>
      </body>
    </html>
  );
}
