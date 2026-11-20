
"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const recoveryTasks = [
  { id: 1, title: "Secure Affected Accounts", description: "Change affected passwords using official websites or apps." },
  { id: 2, title: "Enable Two-Factor Authentication", description: "Add an extra security layer to your important accounts." },
  { id: 3, title: "Preserve Digital Evidence", description: "Save relevant screenshots, messages and transaction records." },
  { id: 4, title: "Report the Cyber Incident", description: "Report suspected cybercrime through the appropriate official channel." },
  { id: 5, title: "Review Account Activity", description: "Check for unauthorized transactions or unfamiliar login sessions." },
  { id: 6, title: "Monitor and Follow Up", description: "Monitor affected accounts and follow up on reports or recovery requests." },
];

function RecoveryContent() {
  const searchParams = useSearchParams();
  const incidentId = searchParams.get("incident_id");

  const [completed, setCompleted] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resolved, setResolved] = useState(false);

  const progress = Math.round((completed.length / recoveryTasks.length) * 100);

  function toggleTask(id: number) {
    setCompleted((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  async function resolveCase() {
    if (!incidentId || !/^\d+$/.test(incidentId)) {
      setMessage("Please open the Recovery Tracker from a valid incident assessment.");
      return;
    }

    if (!window.confirm("Have you completed the recovery actions and confirmed that the situation is under control?")) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/incidents/${incidentId}/resolve`,
        { method: "PUT" }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "Could not resolve the incident.");
      }

      setResolved(true);
      setMessage(`Incident #${incidentId} has been marked as resolved.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Backend connection failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between border-b border-slate-800 px-6 py-5 md:px-16">
        <Link href="/" className="text-2xl font-bold text-cyan-400">CyberFirstAid</Link>
        <Link href="/dashboard" className="text-slate-300 hover:text-cyan-400">Dashboard</Link>
      </nav>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold">Recovery Tracker</h1>
          <p className="text-slate-400">Complete your recovery actions and track your progress.</p>
          {incidentId ? (
            <p className="mt-3 text-cyan-400">Incident ID: #{incidentId}</p>
          ) : (
            <p className="mt-3 text-amber-400">Open this page from an incident assessment to select a case.</p>
          )}
        </div>

        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-7">
          <div className="mb-5 flex justify-between">
            <h2 className="text-xl font-bold">Recovery Progress</h2>
            <span className="text-2xl font-bold text-cyan-400">{progress}%</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-slate-700">
            <div className="h-full rounded-full bg-cyan-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-4 text-sm text-slate-400">{completed.length} of {recoveryTasks.length} tasks completed</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-bold">Your Recovery Checklist</h2>

          <div className="space-y-4">
            {recoveryTasks.map((task) => (
              <label key={task.id} className={`flex cursor-pointer items-start gap-4 rounded-xl border p-5 ${completed.includes(task.id) ? "border-green-700 bg-green-950/30" : "border-slate-700 bg-slate-800"}`}>
                <input
                  type="checkbox"
                  checked={completed.includes(task.id)}
                  disabled={resolved}
                  onChange={() => toggleTask(task.id)}
                  className="mt-1 h-5 w-5 accent-cyan-500"
                />
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{task.description}</p>
                </div>
              </label>
            ))}
          </div>

          {progress === 100 && !resolved && (
            <div className="mt-7 rounded-xl border border-green-700 bg-green-950/30 p-5">
              <h3 className="font-bold text-green-400">All checklist tasks marked complete</h3>
              <p className="mt-2 text-sm text-slate-300">
                Only confirm resolution if the situation is genuinely under control. Completing the checklist alone does not guarantee recovery.
              </p>
              <button
                onClick={resolveCase}
                disabled={loading || !incidentId}
                className="mt-5 rounded-xl bg-green-600 px-6 py-3 font-bold hover:bg-green-500 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Confirm and Resolve Case"}
              </button>
            </div>
          )}

          {resolved && (
            <div className="mt-7 rounded-xl border border-green-700 bg-green-950/40 p-5 text-green-300">
              <h3 className="text-xl font-bold">Case Resolved!</h3>
              <p className="mt-2">{message}</p>
            </div>
          )}

          {message && !resolved && <p role="alert" className="mt-5 text-amber-300">{message}</p>}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/emergency" className="rounded-xl bg-red-600 px-6 py-4 font-semibold">Emergency Help</Link>
          <Link href="/dashboard" className="rounded-xl border border-cyan-500 px-6 py-4 font-semibold text-cyan-400">View Dashboard</Link>
        </div>
      </section>
    </main>
  );
}

export default function RecoveryPage() {
  return (
    <Suspense fallback={<div>Loading Recovery Tracker...</div>}>
      <RecoveryContent />
    </Suspense>
  );
}
