import NavBar from "./components/NavBar";
import AuthContext from "./context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Test Clone Project",
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
  //we wrap everything in the AuthContext so that we can access the state
  return (
    <html lang="en">
      <body>
        <main className="bg-gray-100 min-h-screen w-screen">
          <AuthContext>
            <main className="max-w-screen-2xl m-auto bg-white">
              {/* NAVBAR */}
              <NavBar />
              {children}
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
