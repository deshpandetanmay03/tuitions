import { db } from "~/server/db";
import 'server-only';
import { _class } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function get_my_classes() {

    const user = auth();

    if (!user.userId) {
        throw new Error("You must be logged in to view your classes");
    }

    const classes = await db.query._class.findMany({
        where: ( model, { eq }) => eq(model.user_id, user.userId),
    });
    return classes;
}

export async function create_my_class(classData) {

    const user = auth();

    if (!user.userId) {
        throw new Error("You must be logged in to create a class");
    }

    classData.user_id = user.userId;

    const class_id = await db.insert(_class).values(classData).returning({ id: _class.id });
    return class_id;
}
