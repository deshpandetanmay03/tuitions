import Link from "next/link";
export function StudentsActions() {
    return (
        <nav className="">
            <div className="container mx-auto flex items-center justify-between h-12">
                <div className="flex items-center space-x-4">
                    <Link href="/students/view" className="text-sm font-bold">
                        View Students
                    </Link>
                    <Link href="/students/create" className="text-sm font-bold">
                        Create Student
                    </Link>
                    <Link href="/students/payments" className="text-sm font-bold">
                        Add Payment
                    </Link>
                </div>
            </div>
        </nav>
    );
}
