import { sql } from "drizzle-orm";
import {
    index,
    pgTableCreator,
    serial,
    integer,
    varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `tuitions_${name}`);

export const _class = createTable(
    "class",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 256 }),
        start_h: integer("start_h"),
        start_m: integer("start_m"),
        end_h: integer("end_h"),
        end_m: integer("end_m"),
        days: integer("days").array(),
        start_date: varchar("start_date", { length: 256 }),
        end_date: varchar("end_date", { length: 256 }),
    },
    (table) => ({
        class_nameIndex: index("class_name_idx").on(table.name),
        class_startIndex: index("class_start_idx").on(table.start_h, table.start_m),
        class_endIndex: index("class_end_idx").on(table.end_h, table.end_m),
        class_daysIndex: index("class_days_idx").on(table.days),
    })
);

export const students = createTable(
    "student",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 256 }),
        class_id: integer("class_id").references("classes.id").array(),
        paid: integer("paid"),
        payments: integer("payments").array(),
    },
    (table) => ({
        student_classIdIndex: index("student_class_id_idx").on(table.class_id),
        student_nameIndex: index("student_name_idx").on(table.name),
        student_idIndex: index("student_id_idx").on(table.id),
    })
);

export const attendance = createTable(
    "attendance",
    {
        id: serial("id").primaryKey(),
        student_id: integer("student_id").references("students.id").array(),
        class_id: integer("class_id").references("classes.id").array(),
        date: varchar("date", { length: 256 }),
    },
    (table) => ({
        attenndance_studentIdIndex: index("attenndance_student_id_idx").on(table.student_id),
        attenndance_classIdIndex: index("attenndance_class_id_idx").on(table.class_id),
        attenndance_dateIndex: index("attenndance_date_idx").on(table.date),
    })
);
