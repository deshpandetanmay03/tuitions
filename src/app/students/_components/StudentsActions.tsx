export function StudentsActions() {
    return (
        <nav className="">
        <div className="container mx-auto flex items-center justify-between h-12">
        <div className="flex items-center space-x-4">
        <a href="/students/view" className="text-sm font-bold">
        View Students
        </a>
        <a href="/students/create" className="text-sm font-bold">
        Create Student
        </a>
        </div>
        </div>
    </nav>
   );
}
