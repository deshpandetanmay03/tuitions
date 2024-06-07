import "~/styles/globals.css";

import { Navbar } from "~/src/app/_components/navbar";

import { ClerkProvider } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";

export const metadata = {
    title: "Tuitions",
    description: "Tuitions app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
        <html lang="en" className={`${GeistSans.variable}`}>
        <body>
        <Navbar />
        {children}
        </body>
        </html>
        </ClerkProvider>
    );
}
