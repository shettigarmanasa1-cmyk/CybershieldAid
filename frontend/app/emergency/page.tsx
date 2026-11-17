
"use client";

import { useState } from "react";
import Link from "next/link";

const emergencyGuides = [
  {
    id: "financial",
    title: "Online Payment / Financial Fraud",
    icon: "💳",
    urgency: "Act immediately",
    steps: [
      "Contact your bank or payment provider immediately using its official support channel.",
      "If you are in India, call the national cybercrime helpline at 1930 to report financial cyber fraud.",
      "Report the incident at cybercrime.gov.in.",
      "Save transaction IDs, payment receipts and relevant screenshots.",
      "Change affected account passwords from a trusted device.",
    ],
  },
  {
    id: "hacking",
    title: "Social Media / Account Hacking",
    icon: "🔐",
    urgency: "Secure your accounts",
    steps: [
      "Use the platform's official account recovery process.",
      "Change your password from a trusted device if you still have access.",
      "Sign out of unfamiliar sessions and devices.",
      "Enable two-factor authentication.",
      "Warn your contacts about suspicious messages from your account.",
    ],
  },
  {
    id: "phishing",
    title: "Phishing / Suspicious Link",
    icon: "🎣",
    urgency: "Limit further exposure",
    steps: [
      "Do not enter any additional information into the suspicious website.",
      "If you entered a password, change it using the official website or app.",
      "Enable two-factor authentication on affected accounts.",
      "If you entered banking information, contact your bank immediately.",
      "Keep the suspicious message or URL as evidence without reopening it.",
    ],
  },
  {
    id: "identity",
    title: "Identity Theft / Impersonation",
    icon: "🪪",
    urgency: "Protect your identity",
    steps: [
      "Document the impersonating account or suspicious activity.",
      "Report the fake profile to the relevant platform.",
      "Secure affected accounts and enable two-factor authentication.",
      "Inform relevant contacts if someone is impersonating you.",
      "Report suspected cybercrime through the official reporting portal.",
    ],
  },
  {
    id: "harassment",
    title: "Cyberbullying / Online Harassment",
    icon: "🛡️",
    urgency: "Prioritize your safety",
    steps: [
      "Preserve threatening messages and screenshots safely.",
      "Use the platform's reporting and blocking features.",
      "Avoid responding to threats or sharing additional personal information.",
      "Tell someone you trust if you need support.",
      "If there is immediate physical danger, contact local emergency services.",
    ],
  },
  {
    id: "device",
    title: "Lost or Stolen Device",
    icon: "📱",
    urgency: "Protect your information",
    steps: [
      "Use the device manufacturer's official find-device service.",
      "Lock the device remotely if the feature is available.",
      "Contact your mobile operator to suspend the SIM if necessary.",
      "Secure important accounts accessible from the device.",
      "Report theft to the appropriate authorities.",
    ],
  },
];

export default function EmergencyPage() {
  const [selected, setSelected] = useState(emergencyGuides[0]);

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

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10 text-center">
          <span className="rounded-full border border-red-700 bg-red-950 px-4 py-2 text-sm text-red-300">
            Emergency Cyber First Aid
          </span>

          <h1 className="mt-6 text-4xl font-bold">
            Immediate Response Guidance
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Choose the type of cyber incident you are facing.
            Follow the recommended safety steps to help reduce
            further harm.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Incident Selection */}
          <div className="space-y-3">
            <h2 className="mb-4 text-xl font-semibold">
              Select Incident Type
            </h2>

            {emergencyGuides.map((guide) => (
              <button
                key={guide.id}
                onClick={() => setSelected(guide)}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  selected.id === guide.id
                    ? "border-cyan-500 bg-cyan-950"
                    : "border-slate-800 bg-slate-900 hover:border-slate-600"
                }`}
              >
                <span className="mr-3">{guide.icon}</span>
                <span className="font-medium">{guide.title}</span>
              </button>
            ))}
          </div>

          {/* Emergency Instructions */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
              <div className="mb-6">
                <p className="mb-2 text-sm font-semibold text-amber-400">
                  {selected.urgency}
                </p>

                <h2 className="text-2xl font-bold text-cyan-400">
                  {selected.icon} {selected.title}
                </h2>
              </div>

              <h3 className="mb-5 text-lg font-semibold">
                What You Should Do Now
              </h3>

              <ol className="space-y-4">
                {selected.steps.map((step, index) => (
                  <li
                    key={index}
                    className="flex gap-4 rounded-xl bg-slate-800 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500 font-bold text-slate-950">
                      {index + 1}
                    </span>

                    <p className="pt-1 text-slate-200">{step}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-8 rounded-xl border border-amber-800 bg-amber-950/30 p-5">
                <h3 className="mb-2 font-bold text-amber-300">
                  Important Safety Reminder
                </h3>

                <p className="text-sm text-slate-300">
                  Never share your password, OTP, PIN or recovery
                  codes with anyone claiming to help you. Use
                  official support channels only.
                </p>
              </div>

              <Link
                href="/report"
                className="mt-7 block rounded-xl bg-cyan-500 px-6 py-4 text-center font-bold text-slate-950 hover:bg-cyan-400"
              >
                Continue to Incident Reporting
              </Link>
            </div>
          </div>
        </div>

        {/* Official Resources */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-bold">
            Official Emergency Resources — India
          </h2>

          <p className="mb-3 text-slate-300">
            Financial cyber fraud helpline:{" "}
            <a href="tel:1930" className="font-bold text-cyan-400">
              1930
            </a>
          </p>

          <p className="text-slate-300">
            National Cyber Crime Reporting Portal:{" "}
            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-400 underline"
            >
              cybercrime.gov.in
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
