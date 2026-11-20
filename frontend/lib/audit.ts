import { appendFile, mkdir } from "fs/promises";
import path from "path";

export type AuditEvent = {
  evidenceId: string;
  event: "UPLOAD" | "VERIFICATION";
  result: string;
  timestamp: string;
};

export async function recordAuditEvent(event: AuditEvent) {
  const logDirectory = path.join(
    process.cwd(),
    "private_evidence",
    "logs"
  );

  await mkdir(logDirectory, { recursive: true });

  const logPath = path.join(logDirectory, "audit.jsonl");

  await appendFile(
    logPath,
    JSON.stringify(event) + "\n",
    { encoding: "utf8", flag: "a" }
  );
}
