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
        days: varchar("days"),
        start_date: varchar("start_date", { length: 256 }),
        end_date: varchar("end_date", { length: 256 }),
        user_id: varchar("user_id"),
    },
    (table) => ({
        class_nameIndex: index("class_name_idx").on(table.name),
        class_startIndex: index("class_start_idx").on(table.start_h, table.start_m),
        class_endIndex: index("class_end_idx").on(table.end_h, table.end_m),
        class_daysIndex: index("class_days_idx").on(table.days),
    })
);

export const student = createTable(
    "student",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 256 }),
        class_id: integer("class_id").references(() => _class.id),
        paid: integer("paid"),
        amount: integer("amount"),
    },
    (table) => ({
        student_classIdIndex: index("student_class_id_idx").on(table.class_id),
        student_nameIndex: index("student_name_idx").on(table.name),
        student_idIndex: index("student_id_idx").on(table.id),
    })
);
