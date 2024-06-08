import "~/styles/globals.css";

export const dynamic = "force-dynamic";

import { StudentsActions } from "./_components/StudentsActions";

import { ClerkProvider } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
        <StudentsActions />
        {children}
        </>
    );
}
