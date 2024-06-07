import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function ClassesPage() {

    const classes = await db.query._class.findMany();

    return (
        <main className="">
        <div className="flex flex-wrap">
        {classes.map((classData) => (
            <div className="w-1/2 p-4" key={classData.id}>
            <div className="text-xl font-bold">{classData.name}</div>
            <div className="text-sm">{classData.start_h}:{classData.start_m} - {classData.end_h}:{classData.end_m}</div>
            </div>
        ))}
        </div>
        </main>
    );
}
