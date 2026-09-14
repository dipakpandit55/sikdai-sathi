import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const studyActivities = sqliteTable("study_activities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  student: text("student").notNull().default("Narmada"),
  subject: text("subject").notNull(),
  activityType: text("activity_type").notNull().default("lesson"),
  durationSeconds: integer("duration_seconds").notNull().default(0),
  score: integer("score"),
  answer: text("answer").notNull().default(""),
  completedAt: text("completed_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
