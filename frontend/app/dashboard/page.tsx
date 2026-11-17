
"use client";

import Link from "next/link";
import { useState } from "react";

type Incident = {
  id: string;
  category: string;
  date: string;
  risk: "Critical" | "High" | "Medium" | "Low";
  status: string;
};

const demoIncidents: Incident[] = [
  {
    id: "CFA-001",
    category: "Financial Fraud",
    date: "2026-11-15",
    risk: "Critical",
    status: "Action Required",
  },
  {
    id: "CFA-002",
    category: "Phishing",
    date: "2026-11-14",
    risk: "High",
    status: "In Progress",
  },
  {
    id: "CFA-003",
    category: "Account Hacking",
    date: "2026-11-12",
    risk: "Medium",
    status: "Resolved",
  },
];

const quickActions = [
  {
    title: "Report Incident",
    description: "Submit details of a cyber incident.",
    icon: "📋",
    href: "/report",
  },
  {
    title: "AI Assessment",
    description: "View the automated risk assessment demo.",
    icon: "🧠",
    href: "/assessment",
  },
  {
    title: "Emergency Help",
    description: "Access immediate safety guidance.",
    icon: "🚨",
    href: "/emergency",
  },
  {
    title: "Preserve Evidence",
    description: "Generate SHA-256 fingerprints for evidence files.",
    icon: "🔒",
    href: "/evidence",
  },
  {
    title: "Recovery Tracker",
    description: "Manage your recovery checklist.",
    icon: "📊",
    href: "/recovery",
  },
];

function riskColor(risk: Incident["risk"]) {
  switch (risk) {
    case "Critical":
      return "bg-red-950 text-red-300";
    case "High":
      return "bg-orange-950 text-orange-300";
    case "Medium":
      return "bg-yellow-950 text-yellow-300";
    default:
      return "bg-green-950 text-green-300";
  }
}

export default function DashboardPage() {
  const [incidents] = useState<Incident[]>(demoIncidents);

  const totalIncidents = incidents.length;

  const activeIncidents = incidents.filter(
    (incident) => incident.status !== "Resolved"
  ).length;

  const criticalIncidents = incidents.filter(
    (incident) => incident.risk === "Critical"
  ).length;

  const resolvedIncidents = incidents.filter(
    (incident) => incident.status === "Resolved"
  ).length;

  const stats = [
    {
      title: "Total Incidents",
      value: totalIncidents,
      icon: "📋",
      color: "text-cyan-400",
    },
    {
      title: "Active Incidents",
      value: activeIncidents,
      icon: "⚠️",
      color: "text-yellow-400",
    },
    {
      title: "Critical Risk",
      value: criticalIncidents,
      icon: "🚨",
      color: "text-red-400",
    },
    {
      title: "Resolved",
      value: resolvedIncidents,
      icon: "✅",
      color: "text-green-400",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-6 py-5 md:px-16">
        <Link
          href="/"
          className="text-2xl font-bold text-cyan-400"
        >
          CyberFirstAid
        </Link>

        <div className="flex flex-wrap gap-5 text-sm">
          <Link
            href="/"
            className="text-slate-300 hover:text-cyan-400"
          >
            Home
          </Link>

          <Link
            href="/report"
            className="text-slate-300 hover:text-cyan-400"
          >
            Report
          </Link>

          <Link
            href="/evidence"
            className="text-slate-300 hover:text-cyan-400"
          >
            Evidence
          </Link>

          <Link
            href="/recovery"
            className="text-slate-300 hover:text-cyan-400"
          >
            Recovery
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <span className="rounded-full border border-amber-800 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-300">
            Demo Dashboard
          </span>

          <h1 className="mt-5 text-4xl font-bold">
            CyberFirstAid Dashboard
          </h1>

          <p className="mt-3 text-slate-400">
            An overview of cyber incidents, risk levels,
            and available recovery tools.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="mb-4 text-3xl">{stat.icon}</div>

              <p className="text-sm text-slate-400">
                {stat.title}
              </p>

              <p
                className={`mt-2 text-4xl font-bold ${stat.color}`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">
            Quick Actions
          </h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500 hover:bg-slate-800"
              >
                <div className="mb-4 text-3xl">
                  {action.icon}
                </div>

                <h3 className="mb-2 text-lg font-bold text-cyan-400">
                  {action.title}
                </h3>

                <p className="text-sm text-slate-400">
                  {action.description}
                </p>

                <p className="mt-5 text-sm font-semibold text-cyan-400">
                  Open Feature →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Incidents */}
        <section className="mb-12 rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">
              Recent Incidents
            </h2>

            <Link
              href="/report"
              className="rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-400"
            >
              + Report New Incident
            </Link>
          </div>

          <p className="mb-5 text-sm text-amber-300">
            Sample incidents shown for demonstration only.
            These are not real reports or saved user records.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="border-b border-slate-700 text-sm text-slate-400">
                <tr>
                  <th className="px-4 py-4">Incident ID</th>
                  <th className="px-4 py-4">Category</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Risk Level</th>
                  <th className="px-4 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {incidents.map((incident) => (
                  <tr
                    key={incident.id}
                    className="border-b border-slate-800 text-sm"
                  >
                    <td className="px-4 py-5 font-semibold text-cyan-400">
                      {incident.id}
                    </td>

                    <td className="px-4 py-5">
                      {incident.category}
                    </td>

                    <td className="px-4 py-5 text-slate-300">
                      {incident.date}
                    </td>

                    <td className="px-4 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${riskColor(
                          incident.risk
                        )}`}
                      >
                        {incident.risk}
                      </span>
                    </td>

                    <td className="px-4 py-5 text-slate-300">
                      {incident.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recovery and Evidence */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <div className="mb-4 text-4xl">🛠️</div>

            <h2 className="mb-3 text-2xl font-bold">
              Recovery Progress
            </h2>

            <p className="mb-5 text-slate-400">
              Use your recovery checklist to mark completed
              actions and track your progress.
            </p>

            <p className="mb-6 text-sm text-amber-300">
              Checklist progress is currently maintained
              only within the Recovery Tracker page.
            </p>

            <Link
              href="/recovery"
              className="inline-block rounded-xl bg-cyan-500 px-6 py-3 font-bold text-slate-950 hover:bg-cyan-400"
            >
              Open Recovery Tracker
            </Link>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <div className="mb-4 text-4xl">🔐</div>

            <h2 className="mb-3 text-2xl font-bold">
              Evidence Preservation
            </h2>

            <p className="mb-5 text-slate-400">
              Select screenshots, documents and other
              evidence files to generate SHA-256
              fingerprints.
            </p>

            <p className="mb-6 text-sm text-amber-300">
              Evidence files and fingerprints are not
              currently saved to the backend.
            </p>

            <Link
              href="/evidence"
              className="inline-block rounded-xl bg-cyan-500 px-6 py-3 font-bold text-slate-950 hover:bg-cyan-400"
            >
              Open Evidence Preservation
            </Link>
          </section>
        </div>

        {/* Emergency Help */}
        <section className="rounded-2xl border border-red-900 bg-red-950/20 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-red-400">
            Need Immediate Cyber Assistance?
          </h2>

          <p className="mx-auto mb-6 max-w-2xl text-slate-300">
            If you are experiencing financial fraud or
            another active cyber incident, take immediate
            protective action. In India, financial cyber
            fraud can be reported through helpline 1930.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/emergency"
              className="rounded-xl bg-red-600 px-6 py-3 font-bold hover:bg-red-500"
            >
              Emergency Guidance
            </Link>

            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-red-500 px-6 py-3 font-bold text-red-300 hover:bg-red-950"
            >
              Official Cybercrime Portal
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          CyberFirstAid | Academic Prototype
          <p className="mt-2">
            Dashboard information is demonstration data
            until backend integration is completed.
          </p>
        </footer>
      </div>
    </main>
  );
}
