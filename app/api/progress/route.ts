import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { studyActivities } from "../../../db/schema";

export async function GET() {
  try {
    const activities = await getDb().select().from(studyActivities).orderBy(desc(studyActivities.completedAt)).limit(100);
    const totalSeconds = activities.reduce((sum, item) => sum + item.durationSeconds, 0);
    const scored = activities.filter((item) => item.score !== null);
    const averageScore = scored.length ? Math.round(scored.reduce((sum, item) => sum + (item.score ?? 0), 0) / scored.length) : 0;
    return Response.json({ activities, summary: { totalSeconds, averageScore, completed: activities.length } });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Progress is temporarily unavailable" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { subject?: string; activityType?: string; durationSeconds?: number; score?: number | null; answer?: string };
    if (!body.subject?.trim()) return Response.json({ error: "subject is required" }, { status: 400 });
    const [activity] = await getDb().insert(studyActivities).values({ subject: body.subject.trim(), activityType: body.activityType ?? "lesson", durationSeconds: Math.max(0, Math.round(body.durationSeconds ?? 0)), score: body.score ?? null, answer: body.answer ?? "" }).returning();
    return Response.json({ activity }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Could not save progress" }, { status: 500 });
  }
}
