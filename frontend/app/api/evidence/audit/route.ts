import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const logPath = path.join(
      process.cwd(),
      "private_evidence",
      "logs",
      "audit.jsonl"
    );

    const content = await readFile(logPath, "utf8");

    const events = content
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .reverse();

    return NextResponse.json({
      totalEvents: events.length,
      events,
    });
  } catch {
    return NextResponse.json({
      totalEvents: 0,
      events: [],
    });
  }
}
