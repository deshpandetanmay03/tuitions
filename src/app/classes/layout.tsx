import "~/styles/globals.css";

export const dynamic = "force-dynamic";

import { ClassesActions } from "./_components/ClassesActions";

import { ClerkProvider } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
        <ClassesActions />
        {children}
        </>
    );
}
