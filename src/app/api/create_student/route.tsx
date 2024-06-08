import { NextResponse } from "next/server";
import { create_my_student } from "~/server/queries";

export async function POST(req: Request) {
    try {
        const { name, class_id } = await req.json();

        const studentData = {
            name,
            class_id: class_id,
            paid: 0,
            payments: [],
        };

        let studentId = create_my_student(studentData);
        if (studentId) {
            return NextResponse.json({ message: "Student created" }, { status: 201 });
        } else {
            return NextResponse.json({ message: "Student not created" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
