import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kahoot by Elias",
  description: "Fun quiz game powered by Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="h-16 px-2 bg-slate-400 border-b border-gray-200"></header>
      <div className="flex">
        <nav className="border-r border-r-gray-200">
          <h1>Kahoot by Elias</h1>
          <ul>
            <li className="">
              <Link
                className="flex items-center h-12 w-52 hover:bg-gray-100"
                href="/host/dashboard"
              >
                <div className="px-2">
                  <svg
                    aria-label="Hem"
                    fill="currentColor"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <title>Start</title>
                    <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
                  </svg>
                </div>
                <div className="flex-grow">Start</div>
              </Link>
            </li>
            <li className="">
              <Link
                className="flex items-center h-12 w-52 hover:bg-gray-100"
                href="/host/dashboard"
              >
                <div className="px-2">
                  <svg
                    aria-label="Utforska"
                    fill="currentColor"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <title>Upptäck</title>
                    <polygon
                      fill="none"
                      points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    ></polygon>
                    <polygon
                      fill-rule="evenodd"
                      points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
                    ></polygon>
                    <circle
                      cx="12.001"
                      cy="12.005"
                      fill="none"
                      r="10.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    ></circle>
                  </svg>
                </div>
                <div className="flex-grow">Upptäck</div>
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-grow p-2">{children}</main>
      </div>
    </>
  );
}
