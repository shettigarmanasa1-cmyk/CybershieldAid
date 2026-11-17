
"use client";

import { useState } from "react";
import Link from "next/link";

type Assessment = {
  incident_category: string;
  matched_keywords: string[];
  classification_needs_review: boolean;
  risk_level: string;
  immediate_actions: string[];
  follow_up_actions: string[];
  needs_review: boolean;
};

// Demonstration data based on the AI module's output format.
// Replace with the backend API response during integration.
const demoAssessment: Assessment = {
  incident_category: "financial_fraud",
  matched_keywords: ["otp", "bank"],
  classification_needs_review: false,
  risk_level: "critical",
  immediate_actions: [
    "Contact your bank or payment provider immediately through its official app or verified phone number.",
    "If you are in India, report financial cyber fraud through the 1930 helpline.",
    "Secure affected banking accounts using official support channels.",
  ],
  follow_up_actions: [
    "Save transaction IDs, messages, receipts and relevant screenshots.",
    "Report the incident at cybercrime.gov.in.",
    "Monitor affected accounts for suspicious activity.",
  ],
  needs_review: false,
};

const categoryNames: Record<string, string> = {
  financial_fraud: "Financial Fraud",
  phishing: "Phishing Attack",
  social_media_hacking: "Social Media Account Hacking",
  email_compromise: "Email Account Compromise",
  identity_theft: "Identity Theft",
  online_harassment: "Online Harassment",
  lost_stolen_devices: "Lost or Stolen Device",
  unknown: "Unknown Incident",
};

export default function AssessmentPage() {
  const [assessment] = useState<Assessment>(demoAssessment);

  const riskColors: Record<string, string> = {
    critical: "border-red-600 bg-red-950 text-red-300",
    high: "border-orange-600 bg-orange-950 text-orange-300",
    medium: "border-yellow-600 bg-yellow-950 text-yellow-300",
    unassessed: "border-slate-600 bg-slate-800 text-slate-300",
  };

  const riskStyle =
    riskColors[assessment.risk_level] || riskColors.unassessed;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-slate-800 px-6 py-5 md:px-16">
        <Link href="/" className="text-2xl font-bold text-cyan-400">
          CyberFirstAid
        </Link>

        <Link href="/" className="text-slate-300 hover:text-cyan-400">
          Back to Home
        </Link>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Cyber Incident Assessment
          </h1>

          <p className="text-slate-400">
            Preliminary automated assessment and recommended
            safety actions for your cyber incident.
          </p>

          <p className="mt-3 text-sm text-amber-300">
            Demonstration assessment — not generated from your
            submitted incident yet.
          </p>
        </div>

        {/* Assessment Summary */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <h2 className="mb-3 text-sm font-semibold text-slate-400">
              Detected Incident Category
            </h2>

            <p className="text-2xl font-bold text-cyan-400">
              {categoryNames[assessment.incident_category] ||
                assessment.incident_category}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <h2 className="mb-3 text-sm font-semibold text-slate-400">
              Preliminary Risk Level
            </h2>

            <span
              className={`inline-block rounded-lg border px-5 py-2 font-bold uppercase ${riskStyle}`}
            >
              {assessment.risk_level}
            </span>
          </div>
        </div>

        {/* Immediate Actions */}
        <div className="mb-8 rounded-2xl border border-red-900 bg-slate-900 p-7">
          <h2 className="mb-5 text-2xl font-bold text-red-400">
            Immediate Safety Actions
          </h2>

          <ol className="space-y-4">
            {assessment.immediate_actions.map((action, index) => (
              <li
                key={index}
                className="flex gap-4 rounded-xl bg-slate-800 p-4"
              >
                <span className="font-bold text-red-400">
                  {index + 1}.
                </span>
                <p className="text-slate-200">{action}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Follow-up Actions */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-7">
          <h2 className="mb-5 text-2xl font-bold text-cyan-400">
            Follow-up Recovery Actions
          </h2>

          <ol className="space-y-4">
            {assessment.follow_up_actions.map((action, index) => (
              <li
                key={index}
                className="flex gap-4 rounded-xl bg-slate-800 p-4"
              >
                <span className="font-bold text-cyan-400">
                  {index + 1}.
                </span>
                <p className="text-slate-200">{action}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Keywords */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-7">
          <h2 className="mb-4 text-xl font-bold">
            Matched Keywords
          </h2>

          <div className="flex flex-wrap gap-3">
            {assessment.matched_keywords.length > 0 ? (
              assessment.matched_keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-cyan-950 px-4 py-2 text-sm text-cyan-300"
                >
                  {keyword}
                </span>
              ))
            ) : (
              <p className="text-slate-400">
                No keywords matched.
              </p>
            )}
          </div>
        </div>

        {/* Review Status */}
        {(assessment.needs_review ||
          assessment.classification_needs_review) && (
          <div className="mb-8 rounded-xl border border-amber-700 bg-amber-950/40 p-5 text-amber-200">
            This assessment requires further review.
            Automated classification may be uncertain.
          </div>
        )}

        {/* Disclaimer */}
        <p className="mb-8 text-sm text-slate-400">
          This is a preliminary rule-based assessment, not a
          verified determination of incident severity. Use
          official reporting and support channels when needed.
        </p>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/emergency"
            className="rounded-xl bg-red-600 px-6 py-4 font-bold text-white hover:bg-red-500"
          >
            Emergency Guidance
          </Link>

          <Link
            href="/report"
            className="rounded-xl border border-slate-600 px-6 py-4 font-semibold hover:bg-slate-800"
          >
            Report Another Incident
          </Link>
        </div>
      </section>
    </main>
  );
}
