import { NextResponse } from "next/server";
import { add_payment } from "~/server/queries";

export async function POST(req: Request) {
    try {
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
