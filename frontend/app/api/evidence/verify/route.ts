import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { readFile } from "fs/promises";
import path from "path";
import { recordAuditEvent } from "../../../../lib/audit";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = body.id;

    if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) {
      return NextResponse.json({ error: "Invalid evidence ID" }, { status: 400 });
    }

    const baseDirectory = path.join(process.cwd(), "private_evidence");
    const metadataPath = path.join(baseDirectory, "metadata", `${id}.json`);
    const metadata = JSON.parse(await readFile(metadataPath, "utf8"));

    if (metadata.id !== id) {
      return NextResponse.json({ error: "Evidence not found" }, { status: 404 });
    }

    const extension = path.extname(metadata.originalName).toLowerCase();
    const filePath = path.join(baseDirectory, "files", `${id}${extension}`);
    const buffer = await readFile(filePath);
    const currentHash = createHash("sha256").update(buffer).digest("hex");
    const isIntact = currentHash === metadata.sha256;

    await recordAuditEvent({
      evidenceId: id,
      event: "VERIFICATION",
      result: isIntact ? "VERIFIED" : "MODIFIED",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      id,
      integrity: isIntact ? "VERIFIED" : "MODIFIED",
      originalHash: metadata.sha256,
      currentHash,
      message: isIntact
        ? "Evidence integrity verified successfully"
        : "Evidence file has been modified",
    });
  } catch (error) {
    console.error("Evidence verification failed:", error);
    return NextResponse.json(
      { error: "Evidence not found or could not be verified" },
      { status: 404 }
    );
  }
}
