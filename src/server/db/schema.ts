import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  integer,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `tuitions_${name}`);

export const classes = createTable(
  "classes",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    start_h: integer("start_h"),
    start_m: integer("start_m"),
    end_h: integer("end_h"),
    end_m: integer("end_m"),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name),
  })
);
