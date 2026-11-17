
import Link from "next/link";

const features = [
  {
    title: "Incident Reporting",
    description:
      "Describe a cyber incident and receive structured guidance on what to do next.",
    href: "/report",
    icon: "📋",
    status: "Available",
  },
  {
    title: "Emergency Response",
    description:
      "Get immediate safety instructions for financial fraud, hacked accounts, phishing and other cyber incidents.",
    href: "/emergency",
    icon: "🚨",
    status: "Available",
  },
  {
    title: "Evidence Preservation",
    description:
      "Select digital evidence, view file details and generate SHA-256 fingerprints to support later integrity checks.",
    href: "/evidence",
    icon: "🔒",
    status: "Available",
  },
  {
    title: "AI Risk Assessment",
    description:
      "View a preliminary automated assessment, incident category, risk level and recommended safety actions.",
    href: "/assessment",
    icon: "🧠",
    status: "Demo Available",
  },
  {
    title: "Recovery Assistance",
    description:
      "Follow recommended recovery actions to help secure affected accounts and reduce further harm.",
    href: "/recovery",
    icon: "🛠️",
    status: "Available",
  },
  {
    title: "Recovery Tracking",
    description:
      "Track completed recovery tasks, monitor your progress and manage your cybersecurity recovery checklist.",
    href: "/recovery",
    icon: "📊",
    status: "Available",
  },
];

const steps = [
  {
    number: "01",
    title: "Report",
    description:
      "Describe the cyber incident you experienced.",
  },
  {
    number: "02",
    title: "Assess",
    description:
      "Receive a preliminary automated incident assessment.",
  },
  {
    number: "03",
    title: "Respond",
    description:
      "Follow immediate safety and recovery guidance.",
  },
  {
    number: "04",
    title: "Recover",
    description:
      "Track your recovery tasks and follow-up actions.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation Bar */}
      <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-6 py-5 md:px-16">
        <Link
          href="/"
          className="text-2xl font-bold text-cyan-400"
        >
          CyberFirstAid
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-slate-300 hover:text-cyan-400"
          >
            Dashboard
          </Link>

          <Link
            href="/evidence"
            className="text-sm font-semibold text-slate-300 hover:text-cyan-400"
          >
            Evidence
          </Link>

          <Link
            href="/recovery"
            className="text-sm font-semibold text-slate-300 hover:text-cyan-400"
          >
            Recovery Tracker
          </Link>

          <Link
            href="/emergency"
            className="text-sm font-semibold text-slate-300 hover:text-red-400"
          >
            Emergency Help
          </Link>

          <Link
            href="/report"
            className="rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Report Incident
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
        <span className="mb-6 rounded-full border border-cyan-700 bg-cyan-950 px-4 py-2 text-sm text-cyan-300">
          Your Digital Safety Companion
        </span>

        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
          Cyber Incident?
          <br />
          <span className="text-cyan-400">
            Get Help. Stay Safe. Recover.
          </span>
        </h1>

        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-300">
          CyberFirstAid is an intelligent cyber incident response,
          digital evidence preservation and recovery assistance
          platform designed to help people facing online scams,
          hacked accounts, phishing attacks, identity theft and
          other cyber incidents.
        </p>

        {/* Main Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/report"
            className="rounded-xl bg-cyan-500 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-400"
          >
            Get Cyber First Aid
          </Link>

          <a
            href="#features"
            className="rounded-xl border border-slate-600 px-8 py-4 font-semibold transition hover:bg-slate-800"
          >
            Explore Features
          </a>

          <Link
            href="/dashboard"
            className="rounded-xl border border-blue-500 px-8 py-4 font-semibold text-blue-400 transition hover:bg-blue-950"
          >
            Dashboard
          </Link>

          <Link
            href="/assessment"
            className="rounded-xl border border-cyan-500 px-8 py-4 font-semibold text-cyan-400 transition hover:bg-cyan-950"
          >
            AI Assessment
          </Link>

          <Link
            href="/emergency"
            className="rounded-xl border border-red-500 px-8 py-4 font-semibold text-red-400 transition hover:bg-red-950"
          >
            Emergency Help
          </Link>

          <Link
            href="/recovery"
            className="rounded-xl border border-green-500 px-8 py-4 font-semibold text-green-400 transition hover:bg-green-950"
          >
            Recovery Tracker
          </Link>

          <Link
            href="/evidence"
            className="rounded-xl border border-purple-500 px-8 py-4 font-semibold text-purple-400 transition hover:bg-purple-950"
          >
            Evidence Preservation
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="mx-auto max-w-6xl px-6 py-16"
      >
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            How CyberFirstAid Helps You
          </h2>

          <p className="mx-auto max-w-2xl text-slate-400">
            From identifying a cyber incident to taking immediate
            action and tracking recovery, CyberFirstAid provides
            structured guidance throughout the process.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-7 transition hover:border-cyan-600"
            >
              <div className="mb-5 text-4xl">
                {feature.icon}
              </div>

              <h3 className="mb-3 text-xl font-bold text-cyan-400">
                {feature.title}
              </h3>

              <p className="mb-5 flex-grow leading-relaxed text-slate-300">
                {feature.description}
              </p>

              <div className="mb-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    feature.status === "Available"
                      ? "bg-green-950 text-green-400"
                      : feature.status === "Demo Available"
                        ? "bg-amber-950 text-amber-300"
                        : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {feature.status}
                </span>
              </div>

              {feature.href ? (
                <Link
                  href={feature.href}
                  className="font-semibold text-cyan-400 hover:underline"
                >
                  Open Feature →
                </Link>
              ) : (
                <span className="font-semibold text-slate-500">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-y border-slate-800 bg-slate-900/50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            How It Works
          </h2>

          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center"
              >
                <p className="mb-4 text-3xl font-bold text-cyan-400">
                  {step.number}
                </p>

                <h3 className="mb-3 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-slate-400">
            The automated assessment and recovery workflow
            are currently being integrated with the backend.
          </p>
        </div>
      </section>

      {/* Evidence Preservation Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-purple-800 bg-purple-950/20 p-8 text-center">
          <div className="mb-4 text-5xl">🔐</div>

          <h2 className="mb-4 text-2xl font-bold text-purple-300">
            Preserve Your Digital Evidence
          </h2>

          <p className="mx-auto mb-6 max-w-2xl text-slate-300">
            Digital evidence such as screenshots, messages,
            documents and transaction records can be important
            when reporting cybercrime. Select evidence files
            and generate SHA-256 fingerprints for later
            integrity comparisons.
          </p>

          <Link
            href="/evidence"
            className="inline-block rounded-xl bg-purple-600 px-8 py-4 font-bold text-white hover:bg-purple-500"
          >
            Open Evidence Preservation
          </Link>

          <p className="mt-4 text-sm text-slate-400">
            Prototype: fingerprints are calculated locally.
            Files are not yet uploaded or permanently stored.
          </p>
        </div>
      </section>

      {/* Emergency Information */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-red-900 bg-red-950/20 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-red-400">
            Facing an Active Cyber Incident?
          </h2>

          <p className="mx-auto mb-6 max-w-2xl text-slate-300">
            If you suspect financial fraud, account compromise
            or another cyber incident, take immediate safety
            precautions. Do not wait for an automated assessment
            before contacting official support services.
          </p>

          <Link
            href="/emergency"
            className="inline-block rounded-xl bg-red-600 px-8 py-4 font-bold text-white hover:bg-red-500"
          >
            Get Emergency Guidance
          </Link>
        </div>
      </section>

      {/* Official Safety Information */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-amber-800 bg-amber-950/30 p-7 text-center">
          <h2 className="mb-4 text-xl font-bold text-amber-300">
            Your Digital Safety Comes First
          </h2>

          <p className="mb-4 text-slate-300">
            Never share passwords, OTPs, banking PINs,
            recovery codes or other sensitive credentials
            with anyone claiming to provide cybersecurity help.
          </p>

          <p className="text-slate-300">
            For financial cyber fraud in India, call{" "}
            <a
              href="tel:1930"
              className="font-bold text-cyan-400"
            >
              1930
            </a>{" "}
            or visit the{" "}
            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-400 underline"
            >
              National Cyber Crime Reporting Portal
            </a>
            .
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-10 text-center">
        <h2 className="mb-3 text-xl font-bold text-cyan-400">
          CyberFirstAid
        </h2>

        <p className="text-sm text-slate-400">
          Intelligent Cyber Incident Response, Digital Evidence
          Preservation and Recovery Assistance Platform
        </p>

        <p className="mt-3 text-sm text-slate-500">
          Academic Prototype | Cybersecurity Awareness and Assistance
        </p>

        <p className="mt-3 text-xs text-slate-500">
          Automated assessments are preliminary and do not
          replace official cybersecurity or law enforcement assistance.
        </p>
      </footer>
    </main>
  );
}
