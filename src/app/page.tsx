import Link from "next/link";

const mockClasses = [
    {
        id: 1,
        name: "Math",
        start: {
            hour: 9,
            minute: 0,
        },
        end: {
            hour: 10,
            minute: 0,
        },
    },
    {
        id: 2,
        name: "English",
        start: {
            hour: 10,
            minute: 0,
        },
        end: {
            hour: 11,
            minute: 0,
        },
    },
    {
        id: 3,
        name: "Science",
        start: {
            hour: 16,
            minute: 0,
        },
        end: {
            hour: 18,
            minute: 0,
        },
    },
    {
        id: 4,
        name: "History",
        start: {
            hour: 18,
            minute: 0,
        },
        end: {
            hour: 19,
            minute: 0,
        },
    }
];
export default function HomePage() {
  return (
    <main className="">
        <div className="flex flex-wrap">
            {mockClasses.map((classData) => (
                <div className="w-1/2 p-4" key={classData.id}>
                    <div className="text-xl font-bold">{classData.name}</div>
                    <div className="text-sm">{classData.start.hour}:{classData.start.minute} - {classData.end.hour}:{classData.end.minute}</div>
                </div>
            ))}
        </div>
    </main>
  );
}
