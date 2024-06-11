import { get_my_students } from "~/server/queries";
import Link from "next/link";

export default async function ViewClassPage() {
    const students = await get_my_students();
    return (
        <main className="flex flex-col items-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-8">View Students</h1>
                <div className="flex flex-wrap w-screen gap-4">
                    {students.map((studentData) => (
                        <div className="w-1/4 p-4 border-2 border-gray-200" key={studentData.id}>
                            <Link href={`/students/view/${studentData.id}`}>
                                <div className="text-xl font-bold">
                                    {studentData.name}
                                </div>
                                <div className="text-sm">{studentData.class_id}</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
