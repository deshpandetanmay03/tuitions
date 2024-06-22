import Link from "next/link";
export function ClassesActions() {
    return (
        <nav className="">
            <div className="container mx-auto flex items-center justify-between h-12">
                <div className="flex items-center space-x-4">
                    <Link href="/classes/view" className="text-sm font-bold">
                        View Classes
                    </Link>
                    <Link href="/classes/create" className="text-sm font-bold">
                        Create Class
                    </Link>
                </div>
            </div>
        </nav>
    );
}
