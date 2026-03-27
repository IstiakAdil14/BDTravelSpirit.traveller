"use client";

import Link from "next/link";

const TOP_DESTINATIONS = [
  { label: "Cox's Bazar", href: "/tours?region=chittagong" },
  { label: "Sundarbans", href: "/tours?region=khulna" },
  { label: "Sylhet", href: "/tours?region=sylhet" },
  { label: "Bandarban", href: "/tours?region=chittagong" },
  { label: "Saint Martin", href: "/tours?region=chittagong" },
  { label: "Sreemangal", href: "/tours?region=sylhet" },
  { label: "Rangamati", href: "/tours?region=chittagong" },
  { label: "Kuakata", href: "/tours?region=barisal" },
  { label: "Dhaka", href: "/tours?region=dhaka" },
  { label: "Jaflong", href: "/tours?region=sylhet" },
  { label: "Nijhum Dwip", href: "/tours?region=barisal" },
  { label: "Sajek", href: "/tours?region=chittagong" },
];

const TOP_OPERATORS = [
  { label: "BD Travel Spirit", href: "/operators" },
  { label: "Local Guides", href: "/operators" },
  { label: "Eco Tours BD", href: "/operators" },
  { label: "Heritage Travel", href: "/operators" },
  { label: "Adventure Bangladesh", href: "/operators" },
  { label: "Explore Bengal", href: "/operators" },
];

const TOP_ADVENTURE_STYLES = [
  { label: "Beach", href: "/tours" },
  { label: "Wildlife", href: "/tours" },
  { label: "Hiking & Trekking", href: "/tours" },
  { label: "Cultural", href: "/tours" },
  { label: "River Cruise", href: "/tours" },
  { label: "Family", href: "/tours" },
  { label: "Photography", href: "/tours" },
  { label: "Eco Tourism", href: "/tours" },
];

export default function DashboardDirectoryLinks() {
  return (
    <section className="mt-10 pt-8 border-t border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Destinations */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Top Destinations</h3>
          <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm">
            {TOP_DESTINATIONS.map((d) => (
              <Link
                key={d.label}
                href={d.href}
                className="text-slate-600 hover:text-blue-600 transition-colors truncate block"
              >
                {d.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Top Operators */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Top Operators</h3>
          <div className="flex flex-col gap-2">
            {TOP_OPERATORS.map((o) => (
              <Link
                key={o.label}
                href={o.href}
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                {o.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Top Adventure Styles */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Top Adventure Styles</h3>
          <div className="flex flex-col gap-2">
            {TOP_ADVENTURE_STYLES.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
