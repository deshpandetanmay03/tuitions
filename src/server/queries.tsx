import { db } from "~/server/db";
import 'server-only';
import { _class, student } from "~/server/db/schema";
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

export async function create_my_student(studentData) {

    const user = auth();

    if (!user.userId) throw new Error("You must be logged in to create a student");

    const student_id = await db.insert(student).values(studentData).returning({ id: student.id });
    return student_id;
}

export async function get_my_students() {

    const user = auth();

    if (!user.userId) throw new Error("You must be logged in to view your students");

    const teacherId = user.userId;

    const teacher_classes = await db.query._class.findMany({
        where: ( model, { eq }) => eq(model.user_id, teacherId),
    });

    const studentsList = [];

    for (const classData of teacher_classes) {
        const classStudents = await db.query.student.findMany({
            where: ( model, { eq }) => eq(model.class_id, classData.id),
        });
        studentsList.push(...classStudents);
    }


    return studentsList;
}
