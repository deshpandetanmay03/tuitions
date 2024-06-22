import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Navbar() {
    return (
        <nav className="bg-[#2e026d] text-white">
            <div className="container mx-auto flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link href="/" className="text-xl font-bold">
                        Tuitions
                    </Link>
                </div>

                <SignedIn>
                    <UserButton />
                    <div className="flex items-center space-x-4">
                        <Link href="/classes" className="text-sm font-bold">
                            Classes
                        </Link>
                        <Link href="/students" className="text-sm font-bold">
                            Students
                        </Link>
                    </div>
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </div>
        </nav>
    );
}
