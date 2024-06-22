import { get_class } from "~/server/queries";
import { Modal } from "~/components/modal";
export default async function ClassModalPage({
    params: { id: classId },
}: {
        params: { id: string };
    }
) {
    const _class = await get_class(classId);
    const days = _class.days.slice(1, _class.days.length - 1).split(',');
    const days_map = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', 7: 'Sunday' };
    return (
        <Modal>
            <div className="text-center">
                <div className="flex flex-wrap w-screen gap-4 justify-center items-center">
                    <div className="w-1/4 p-4 border-2 border-gray-200 flex flex-col gap-4">
                        <div className="text-xl font-bold">
                            {_class.name}
                        </div>
                        <div className="text-xl">
                            <span className="font-bold">{ _class.start_h }:{ _class.start_m }</span>
                            <span className="margin-4"> - </span>
                            <span className="font-bold">{ _class.end_h }:{ _class.end_m }</span>
                        </div>
                        <div className="text-xl">
                            <span className="font-bold">{ _class.start_date }</span>
                            <span className="margin-4"> - </span>
                            <span className="font-bold">{ _class.end_date }</span>
                        </div>
                        <ul className="list-disc">
                            {days.map((day) => (
                                <li className="min-w-1/4 p-4 border-2 border-gray-200" key={day}>
                                    <span className="text-xl font-bold">{ days_map[day] }</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
