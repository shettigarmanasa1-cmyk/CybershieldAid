
"use client";

import { useRef, useState } from "react";
import Link from "next/link";

type EvidenceFile = {
  id: string;
  file: File;
  status: "pending" | "verified";
  hash?: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const allowedExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".pdf",
  ".txt",
];

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function EvidencePage() {
  const [files, setFiles] = useState<EvidenceFile[]>([]);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelection(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = Array.from(
      event.target.files || []
    );

    setError("");

    const validFiles: EvidenceFile[] = [];
    const errors: string[] = [];

    for (const file of selectedFiles) {
      const extension = file.name
        .slice(file.name.lastIndexOf("."))
        .toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        errors.push(`${file.name}: unsupported file type`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: exceeds 10 MB limit`);
        continue;
      }

      validFiles.push({
        id: crypto.randomUUID(),
        file,
        status: "pending",
      });
    }

    setFiles((previous) => [...previous, ...validFiles]);

    if (errors.length > 0) {
      setError(errors.join(". "));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function calculateHash(file: File) {
    const buffer = await file.arrayBuffer();

    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      buffer
    );

    const hashArray = Array.from(
      new Uint8Array(hashBuffer)
    );

    return hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  async function verifyEvidence() {
    if (files.length === 0 || processing) {
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const updatedFiles = await Promise.all(
        files.map(async (item) => {
          if (item.status === "verified") {
            return item;
          }

          const hash = await calculateHash(item.file);

          return {
            ...item,
            hash,
            status: "verified" as const,
          };
        })
      );

      setFiles(updatedFiles);
    } catch {
      setError("Unable to calculate file hashes.");
    } finally {
      setProcessing(false);
    }
  }

  function removeFile(id: string) {
    setFiles((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-slate-800 px-6 py-5 md:px-16">
        <Link
          href="/"
          className="text-2xl font-bold text-cyan-400"
        >
          CyberFirstAid
        </Link>

        <Link
          href="/"
          className="text-slate-300 hover:text-cyan-400"
        >
          Back to Home
        </Link>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-14">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Digital Evidence Preservation
          </h1>

          <p className="mx-auto max-w-2xl text-slate-400">
            Select digital evidence related to your cyber
            incident. Generate SHA-256 fingerprints to help
            identify whether files change.
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-8 rounded-2xl border-2 border-dashed border-cyan-800 bg-slate-900 p-10 text-center">
          <div className="mb-4 text-5xl">📁</div>

          <h2 className="mb-3 text-2xl font-bold">
            Select Evidence Files
          </h2>

          <p className="mb-6 text-slate-400">
            Supported: PNG, JPG, JPEG, PDF, TXT
            <br />
            Maximum file size: 10 MB per file
          </p>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".png,.jpg,.jpeg,.pdf,.txt"
            onChange={handleFileSelection}
            className="hidden"
            id="evidence-upload"
          />

          <label
            htmlFor="evidence-upload"
            className="inline-block cursor-pointer rounded-xl bg-cyan-500 px-8 py-4 font-bold text-slate-950 hover:bg-cyan-400"
          >
            Choose Files
          </label>
        </div>

        {/* Privacy Notice */}
        <div className="mb-8 rounded-xl border border-amber-800 bg-amber-950/30 p-5 text-sm text-amber-200">
          Files are processed locally in your browser for this
          prototype. They are not uploaded to a server or saved
          permanently. Avoid selecting highly sensitive files.
        </div>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-700 bg-red-950/40 p-4 text-red-300"
          >
            {error}
          </div>
        )}

        {/* Selected Files */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">
              Selected Evidence
            </h2>

            <span className="text-sm text-slate-400">
              {files.length} file(s) selected
            </span>
          </div>

          {files.length === 0 ? (
            <div className="rounded-xl bg-slate-800 p-8 text-center text-slate-400">
              No evidence files selected yet.
            </div>
          ) : (
            <div className="space-y-4">
              {files.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-700 bg-slate-800 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="break-all font-semibold">
                        {item.file.name}
                      </h3>

                      <p className="mt-2 text-sm text-slate-400">
                        Size: {formatFileSize(item.file.size)}
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Status:{" "}
                        <span
                          className={
                            item.status === "verified"
                              ? "text-green-400"
                              : "text-amber-400"
                          }
                        >
                          {item.status === "verified"
                            ? "SHA-256 calculated"
                            : "Pending"}
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={() => removeFile(item.id)}
                      disabled={processing}
                      className="rounded-lg border border-red-700 px-4 py-2 text-sm text-red-400 hover:bg-red-950 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>

                  {item.hash && (
                    <div className="mt-5 rounded-lg bg-slate-950 p-4">
                      <p className="mb-2 text-sm font-semibold text-cyan-400">
                        SHA-256 Fingerprint
                      </p>

                      <p className="break-all font-mono text-xs text-slate-300">
                        {item.hash}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={verifyEvidence}
            disabled={files.length === 0 || processing}
            className="mt-7 w-full rounded-xl bg-cyan-500 px-6 py-4 font-bold text-slate-950 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing
              ? "Calculating SHA-256..."
              : "Generate Evidence Fingerprints"}
          </button>
        </div>

        {/* Explanation */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-xl font-bold">
            What Is SHA-256?
          </h2>

          <p className="text-slate-300">
            SHA-256 generates a digital fingerprint of a file.
            If the file content changes, its fingerprint will
            usually change. This can help with later integrity
            comparisons, but generating a fingerprint alone
            does not prove authenticity or establish a complete
            chain of custody.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/recovery"
            className="rounded-xl bg-cyan-500 px-6 py-4 font-bold text-slate-950 hover:bg-cyan-400"
          >
            Go to Recovery Tracker
          </Link>

          <Link
            href="/report"
            className="rounded-xl border border-slate-600 px-6 py-4 font-semibold hover:bg-slate-800"
          >
            Report Incident
          </Link>
        </div>
      </section>
    </main>
  );
}
