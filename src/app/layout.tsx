import "~/styles/globals.css";

import { Navbar } from "./_components/navbar";

import { ClerkProvider } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";

export const metadata = {
    title: "Tuitions",
    description: "Tuitions app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
    modal,
}: {
        children: React.ReactNode;
        modal: React.ReactNode;
    }) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${GeistSans.variable}`}>
                <body>
                    <Navbar />
                    {children}
                    {modal}
                    <div id="modal-root"></div>
                </body>
            </html>
        </ClerkProvider>
    );
}
