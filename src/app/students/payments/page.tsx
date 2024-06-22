import Payments from "./_components/Payments";
import { get_my_students, get_class } from "~/server/queries";
export default async function StudentsPaymentsPage() {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const all_students = await get_my_students();
    const students = all_students.filter((student) => {
        const _class = get_class(student.class_id);
        if (_class.end_year < currentYear)
            return false;
        if (_class.end_year === currentYear && _class.end_month < currentMonth)
            return false;
        return true;
    }
    return (
        <main className="">
            <h1 className="text-4xl font-bold text-center">Students Payments</h1>
            <Payments students={students} />
        </main>
    );
}
