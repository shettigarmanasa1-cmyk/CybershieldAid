
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ReportIncident() {
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [isOngoing, setIsOngoing] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Temporary frontend demonstration.
    // Backend integration will be added later.
    setSubmitted(true);
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
          className="text-sm text-slate-300 hover:text-cyan-400"
        >
          Back to Home
        </Link>
      </nav>

      {/* Form */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Report a Cyber Incident
          </h1>

          <p className="text-slate-400">
            Tell us what happened so CyberFirstAid can help
            you understand the situation and identify your
            next safety steps.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-10"
        >
          {/* Incident Type */}
          <div>
            <label
              htmlFor="incidentType"
              className="mb-2 block font-semibold"
            >
              Type of Cyber Incident
            </label>

            <select
              id="incidentType"
              required
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            >
              <option value="">Select incident type</option>
              <option value="financial_fraud">
                Online Payment / Financial Fraud
              </option>
              <option value="account_hacking">
                Social Media / Account Hacking
              </option>
              <option value="phishing">
                Phishing / Suspicious Link
              </option>
              <option value="identity_theft">
                Identity Theft / Impersonation
              </option>
              <option value="harassment">
                Cyberbullying / Online Harassment
              </option>
              <option value="lost_device">
                Lost or Stolen Device
              </option>
              <option value="other">
                Other Cyber Incident
              </option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block font-semibold"
            >
              Describe What Happened
            </label>

            <textarea
              id="description"
              required
              rows={5}
              maxLength={2000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain what happened in simple words. Do not include passwords, OTPs, PINs or other sensitive details."
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white placeholder:text-slate-400"
            />
          </div>

          {/* Incident Date */}
          <div>
            <label
              htmlFor="incidentDate"
              className="mb-2 block font-semibold"
            >
              When Did It Happen?
            </label>

            <input
              id="incidentDate"
              type="date"
              required
              value={incidentDate}
              max="2099-12-31"
              onChange={(e) => setIncidentDate(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          {/* Ongoing Incident */}
          <div>
            <label
              htmlFor="isOngoing"
              className="mb-2 block font-semibold"
            >
              Is the Incident Still Ongoing?
            </label>

            <select
              id="isOngoing"
              required
              value={isOngoing}
              onChange={(e) => setIsOngoing(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="unsure">Not Sure</option>
            </select>
          </div>

          {/* Privacy Notice */}
          <div className="rounded-lg border border-amber-800 bg-amber-950/40 p-4 text-sm text-amber-200">
            Never share passwords, OTPs, banking PINs,
            recovery codes or sensitive personal information.
            This prototype does not yet submit reports to
            a backend.
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-500 py-4 font-bold text-slate-950 transition hover:bg-cyan-400"
          >
            Submit Incident Report
          </button>

          {submitted && (
            <div
              role="status"
              className="rounded-lg border border-cyan-700 bg-cyan-950 p-4 text-center text-cyan-200"
            >
              Form completed successfully! This is a frontend
              demonstration. Your report has not been sent
              or saved yet.
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
