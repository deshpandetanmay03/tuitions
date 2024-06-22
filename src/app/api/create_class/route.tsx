import { NextResponse } from "next/server";
import { create_my_class } from "~/server/queries";
import { ratelimit } from "~/server/ratelimit";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const user = auth();
        if (!user.userId) throw new Error("You must be logged in to create a class");
        const {success} = await ratelimit.limit(user.userId);
        if (!success) throw new Error("You have reached your limit");
        const { name, start_h, start_m, end_h, end_m, days, start_date, end_date } = await req.json();

        const classData = {
            name,
            start_h: parseInt(start_h),
            start_m: parseInt(start_m),
            end_h: parseInt(end_h),
            end_m: parseInt(end_m),
            days: `{${days.join(',')}}`,  // Convert array to PostgreSQL array string
            start_date,
            end_date,
        };

        let classId = await create_my_class(classData);
        if (classId) {
            return NextResponse.json({ message: "Class created" + classId }, { status: 201 });
        } else {
            return NextResponse.json({ message: "Class not created" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
