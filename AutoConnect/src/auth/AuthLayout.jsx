/* eslint-disable no-unused-vars */
import React from "react"
import { Link } from "react-router-dom"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import ArrowBackIcon     from "@mui/icons-material/ArrowBack"

export default function AuthLayout({ children, role, backTo, backLabel }) {
  return (
    <div className="min-h-screen bg-surface flex">

      {/* ── Left panel (decorative) — hidden on mobile ─── */}
      <div className="hidden lg:flex lg:w-5/12 hero-gradient flex-col justify-between p-12 relative overflow-hidden">

        {/* decorative circles */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute bottom-20 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/3" />

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline relative z-10">
          <DirectionsCarIcon sx={{ color: "#fff", fontSize: 28 }} />
          <span className="font-heading font-bold text-xl text-white">AutoConnect</span>
        </Link>

        {/* Quote */}
        <div className="relative z-10">
          <p className="text-white/90 text-2xl font-heading font-bold leading-snug mb-4">
            {role === "mechanic"
              ? "Grow your business.\nReach more customers.\nGet paid faster."
              : "Breakdown? Get help\nin minutes. Anywhere\nin Buea."}
          </p>
          <p className="text-white/55 text-sm">
            {role === "mechanic"
              ? "Join 520+ verified specialists already earning more with AutoConnect."
              : "Trusted by 10,000+ drivers across Cameroon."}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex gap-8 relative z-10">
          {role === "mechanic"
            ? [["520+", "Active Mechanics"], ["4.9★", "Avg Rating"], ["10k+", "Jobs Done"]].map(([v, l]) => (
                <div key={l}>
                  <div className="text-white font-heading font-bold text-xl">{v}</div>
                  <div className="text-white/50 text-xs mt-0.5">{l}</div>
                </div>
              ))
            : [["10k+", "Happy Drivers"], ["520+", "Mechanics"], ["15min", "Avg Response"]].map(([v, l]) => (
                <div key={l}>
                  <div className="text-white font-heading font-bold text-xl">{v}</div>
                  <div className="text-white/50 text-xs mt-0.5">{l}</div>
                </div>
              ))
          }
        </div>
      </div>

      {/* ── Right panel (form) ───────────────────────── */}
      <div className="flex-1 flex flex-col">

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-border bg-white">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <DirectionsCarIcon sx={{ color: "#0D2B45", fontSize: 22 }} />
            <span className="font-heading font-bold text-lg text-primary">AutoConnect</span>
          </Link>
          <Link
            to={backTo}
            className="flex items-center gap-1 text-xs text-muted hover:text-primary no-underline transition-colors"
          >
            <ArrowBackIcon sx={{ fontSize: 14 }} /> {backLabel}
          </Link>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">

            {/* Back link — desktop */}
            <Link
              to={backTo}
              className="hidden lg:inline-flex items-center gap-1 text-sm text-muted hover:text-primary no-underline transition-colors mb-8"
            >
              <ArrowBackIcon sx={{ fontSize: 16 }} /> {backLabel}
            </Link>

            {children}
          </div>
        </div>
      </div>
    </div>
  )
}