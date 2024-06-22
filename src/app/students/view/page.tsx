import { get_my_students, get_class } from "~/server/queries";
import Link from "next/link";
import { remaining } from "~/tools/payments";

export default async function ViewClassPage() {
    const all_students = await get_my_students();
    const student_classes = await Promise.all(
        all_students.map( async (student) => ({
            student,
            _class: await get_class(student.class_id)
        }))
    );
    return (
        <main className="flex flex-col items-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-8">View Students</h1>
                <div className="flex flex-wrap w-screen gap-4">
                    {student_classes.map(({ student, _class }) => (
                        <div className="w-1/4 p-4 border-2 border-gray-200" key={student.id}>
                            <Link href={`/students/view/${student.id}`}>
                                <div className="text-xl font-bold">
                                    {student.name}
                                </div>
                                <div className="text-sm">class {student.class_id}</div>
                                <div className="text-sm">{remaining(student, _class)}</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
