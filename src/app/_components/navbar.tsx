import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Navbar() {
    return (
        <nav className="bg-[#2e026d] text-white">
        <div className="container mx-auto flex items-center justify-between h-16">
        <div className="flex items-center">
        <a href="/" className="text-xl font-bold">
        Tuitions
        </a>
        </div>

        <SignedIn>
        <UserButton />
        <div className="flex items-center space-x-4">
        <a href="/classes" className="text-sm font-bold">
        Classes
        </a>
        <a href="/students" className="text-sm font-bold">
        Students
        </a>
        </div>
        </SignedIn>
        <SignedOut>
        <SignInButton />
        </SignedOut>
        </div>
        </nav>
    );
}
