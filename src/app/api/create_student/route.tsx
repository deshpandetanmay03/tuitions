import { NextResponse } from "next/server";
import { create_my_student } from "~/server/queries";
import { ratelimit } from "~/server/ratelimit";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const user = auth();
        if (!user.userId) throw new Error("You must be logged in to create a student");
        const {success} = await ratelimit.limit(user.userId);
        if (!success) throw new Error("You have reached your limit");
        const { name, class_id, amount } = await req.json();

        const studentData = {
            name,
            class_id: class_id,
            paid: 0,
            amount
        };

        let studentId = await create_my_student(studentData);
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
