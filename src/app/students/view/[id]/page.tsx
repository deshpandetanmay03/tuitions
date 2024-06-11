import { get_student } from "~/server/queries";
import { Modal } from "~/global_components/modal";
import Link from "next/link";
export default async function ClassModalPage({
    params: { id: studentId },
}: {
        params: { id: string };
    }
) {
    const student = await get_student(studentId);
    return (
        <div>
            <div className="text-center">
                <div className="flex flex-wrap w-screen gap-4 justify-center items-center">
                    <div className="w-1/4 p-4 border-2 border-gray-200 flex flex-col gap-4">
                        <div className="text-xl font-bold">
                            {student.name}
                        </div>
                        <div className="text-xl">
                            <div className="flex gap-4 items-center">
                                <span className="text-sm">Class:</span>
                                <Link href={`/classes/view/${student.class_id}`}>
                                    {student.class_id}
                                </Link>
                            </div>
                            <div className="flex gap-4 items-center">
                                <span className="text-sm">Paid till date:</span>
                                {student.paid}
                            </div>
                            <div className="flex gap-4 items-center">
                                <span className="text-sm">Payments:</span>
                                { student.payments.map((index, payment) => (
                                    <div key={index}>
                                        {payment}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
