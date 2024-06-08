import { StudentForm } from "./_components/StudentForm";
import { get_my_classes } from "~/server/queries";

export default async function CreateStudentPage() {
    const classes = await get_my_classes();
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <StudentForm classes={classes} />
        </main>
    );
}
