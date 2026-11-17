
"use client";

import { useState } from "react";
import Link from "next/link";

type RecoveryTask = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const initialTasks: RecoveryTask[] = [
  {
    id: 1,
    title: "Secure Affected Accounts",
    description:
      "Change affected passwords using official websites or apps.",
    completed: false,
  },
  {
    id: 2,
    title: "Enable Two-Factor Authentication",
    description:
      "Add an extra security layer to your important accounts.",
    completed: false,
  },
  {
    id: 3,
    title: "Preserve Digital Evidence",
    description:
      "Save relevant screenshots, messages and transaction records.",
    completed: false,
  },
  {
    id: 4,
    title: "Report the Cyber Incident",
    description:
      "Report suspected cybercrime through the appropriate official channel.",
    completed: false,
  },
  {
    id: 5,
    title: "Review Account Activity",
    description:
      "Check for unauthorized transactions or unfamiliar login sessions.",
    completed: false,
  },
  {
    id: 6,
    title: "Monitor and Follow Up",
    description:
      "Monitor affected accounts and follow up on reports or recovery requests.",
    completed: false,
  },
];

export default function RecoveryPage() {
  const [tasks, setTasks] = useState(initialTasks);

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const progress = Math.round(
    (completedCount / tasks.length) * 100
  );

  function toggleTask(id: number) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function resetTasks() {
    setTasks(initialTasks);
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

      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Recovery Tracker
          </h1>

          <p className="text-slate-400">
            Track your cybersecurity recovery actions and
            monitor your progress step by step.
          </p>
        </div>

        {/* Progress Summary */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Recovery Progress
            </h2>

            <span className="text-2xl font-bold text-cyan-400">
              {progress}%
            </span>
          </div>

          <div
            role="progressbar"
            aria-label="Recovery checklist progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-4 overflow-hidden rounded-full bg-slate-700"
          >
            <div
              className="h-full rounded-full bg-cyan-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-4 text-sm text-slate-400">
            {completedCount} of {tasks.length} tasks completed
          </p>
        </div>

        {/* Recovery Checklist */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-bold">
            Your Recovery Checklist
          </h2>

          <div className="space-y-4">
            {tasks.map((task) => (
              <label
                key={task.id}
                className={`flex cursor-pointer items-start gap-4 rounded-xl border p-5 transition ${
                  task.completed
                    ? "border-green-700 bg-green-950/30"
                    : "border-slate-700 bg-slate-800"
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="mt-1 h-5 w-5 accent-cyan-500"
                />

                <div>
                  <h3
                    className={`font-semibold ${
                      task.completed
                        ? "text-green-400 line-through"
                        : "text-white"
                    }`}
                  >
                    {task.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {task.description}
                  </p>
                </div>
              </label>
            ))}
          </div>

          {/* Completion Message */}
          {progress === 100 && (
            <div
              role="status"
              className="mt-7 rounded-xl border border-green-700 bg-green-950/40 p-5 text-center"
            >
              <h3 className="text-xl font-bold text-green-400">
                Checklist Completed!
              </h3>

              <p className="mt-2 text-slate-300">
                You have marked all recovery tasks as
                completed. Continue monitoring your accounts
                and following official guidance when needed.
              </p>
            </div>
          )}

          <button
            onClick={resetTasks}
            className="mt-7 rounded-xl border border-slate-600 px-6 py-3 font-semibold hover:bg-slate-800"
          >
            Reset Checklist
          </button>
        </div>

        {/* Additional Navigation */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/emergency"
            className="rounded-xl bg-red-600 px-6 py-4 font-semibold hover:bg-red-500"
          >
            Emergency Help
          </Link>

          <Link
            href="/assessment"
            className="rounded-xl border border-cyan-500 px-6 py-4 font-semibold text-cyan-400 hover:bg-cyan-950"
          >
            View Assessment
          </Link>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Prototype checklist: progress is stored only in
          this page's current session and will reset on reload.
          Completing this checklist does not guarantee that
          an incident has been fully resolved.
        </p>
      </section>
    </main>
  );
}
