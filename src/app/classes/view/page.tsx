import { get_my_classes } from "~/server/queries";

export default async function ViewClassPage() {
    const classes = await get_my_classes();
    return (
        <main className="flex flex-col items-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold">View Classes</h1>
                <div className="flex flex-wrap w-screen gap-4">
                    {classes.map((classData) => (
                        <div className="w-1/4 p-4 border-2 border-gray-200" key={classData.id}>
                            <a href={`/classes/view/${classData.id}`}>
                                <div className="text-xl font-bold">
                                    {classData.name}
                                </div>
                                <div className="text-sm">{classData.start_h}:{classData.start_m} - {classData.end_h}:{classData.end_m}</div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
