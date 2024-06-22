import { NextResponse } from "next/server";
import { add_payment } from "~/server/queries";
import { ratelimit } from "~/server/ratelimit";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const user = auth();
        if (!user.userId) throw new Error("You must be logged in to add a payment");
        const {success} = await ratelimit.limit(user.userId);
        if (!success) throw new Error("You have reached your limit");

        const { student_id, amount } = await req.json();
        const res = await add_payment(student_id, amount);

        if (res) {
            return NextResponse.json({ message: "Payment added" }, { status: 201 });
        } else {
            return NextResponse.json({ message: "Payment not added" }, { status: 400 });
        }

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
