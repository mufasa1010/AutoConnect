/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Button, Rating } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";

const categories = [
  { icon: <BuildIcon />,               label: "Engine"        },
  { icon: <ElectricalServicesIcon />,  label: "Electronics"   },
  { icon: <DirectionsCarIcon />,       label: "Transmission"  },
  { icon: <BuildIcon />,               label: "Bodywork"      },
  { icon: <BuildIcon />,               label: "Oil Change"    },
  { icon: <AcUnitIcon />,              label: "AC Repair"     },
];

const mechanics = [
  { name: "Samuel Okoro",   specialty: "Engine Specialist",  rating: 4.9, reviews: 118, distance: "1.2 km", img: "https://i.pravatar.cc/80?img=11" },
  { name: "Fon Akintunde",  specialty: "Electrician",        rating: 4.8, reviews: 95,  distance: "2.0 km", img: "https://i.pravatar.cc/80?img=33" },
  { name: "Amstrong T.",    specialty: "Benskin Expert",     rating: 4.7, reviews: 74,  distance: "3.1 km", img: "https://i.pravatar.cc/80?img=8"  },
];

const testimonials = [
  { name: "Brendan T.",  rating: 5, text: "Stuck on the expressway at 11 PM, got help in 15 minutes. Reliable and fast." },
  { name: "Amara S.",    rating: 5, text: "First time I've trusted a platform like this and they exceeded expectations." },
  { name: "Michael K.",  rating: 4, text: "No hidden fees, the payment system is fair and the system just works." },
];

const steps = [
  { emoji: "📍", title: "Location",  desc: "Share your location so we can find you mechanics nearest to you."              },
  { emoji: "🔧", title: "Find",      desc: "Browse verified mechanics by specialty, ratings and real-time availability."    },
  { emoji: "🚗", title: "Repair",    desc: "Get the best fix for the right price, digital invoice in full every time."      },
  { emoji: "⭐", title: "Rate Back", desc: "Leave an honest review after each job and help us keep quality high."           },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="hero-gradient text-white py-20 px-4 min-h-[70vh] flex items-center relative overflow-hidden">
        {/* decorative circle */}
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute right-32 bottom-0 w-40 h-40 rounded-full bg-white/5" />

        <div className="container-app grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-4">
              Breakdown? Find Trusted Mechanics Near You in Minutes.
            </h1>
            <p className="text-white/80 text-base mb-8 leading-relaxed max-w-md">
              We connect drivers with skilled, verified mechanics. AutoConnect makes
              roadside help available at the tap of a button.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="contained" color="secondary" size="large" component={Link} to="/find-mechanics">
                Find Help
              </Button>
              <Button variant="outlined" sx={{ color: "#fff", borderColor: "#fff", "&:hover": { borderColor: "#fff", background: "rgba(255,255,255,0.08)" } }} size="large" component={Link} to="/get-started">
                Become a Mechanic
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[["520+", "Mechanics"], ["10k+", "Jobs Done"], ["4.9", "Avg Rating"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="text-2xl font-heading font-bold text-white">{val}</div>
                  <div className="text-xs text-white/60 mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Map mockup */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <GpsFixedIcon sx={{ fontSize: 60, color: "rgba(255,255,255,0.4)" }} />
              <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-2 shadow-lg">
                <span className="font-heading text-primary text-sm font-bold">Near You Now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-app">
          <h2 className="text-3xl font-extrabold text-center mb-2">How It Works</h2>
          <p className="text-center text-muted mb-12 max-w-md mx-auto">
            Simple steps to get you back on the road quickly and efficiently.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center text-3xl mb-1">
                  {s.emoji}
                </div>
                <h4 className="font-heading font-bold text-primary">{s.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specialist Categories ────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container-app">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold">Specialist Categories</h2>
            <Link to="/find-mechanics" className="text-sm text-primary font-semibold hover:underline">
              View All Categories →
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {categories.map((c, i) => (
              <button
                key={i}
                className="card p-4 flex flex-col items-center gap-2 cursor-pointer hover:-translate-y-1 transition-transform"
              >
                <span className="text-primary">{c.icon}</span>
                <span className="text-xs font-medium text-center text-primary">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Top Rated Near You ───────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-app">
          <h2 className="text-2xl font-extrabold mb-8">Top Rated Near You</h2>
          <div className="flex flex-col gap-5">
            {mechanics.map((m, i) => (
              <div key={i} className="card p-4 flex items-center gap-4">
                <img src={m.img} alt={m.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-primary text-sm">{m.name}</span>
                    <VerifiedIcon sx={{ color: "#1DB954", fontSize: 16 }} />
                  </div>
                  <div className="text-xs text-muted mb-1">{m.specialty}</div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                    <StarIcon sx={{ fontSize: 14, color: "#0D2B45" }} />
                    {m.rating}
                    <span className="text-muted font-normal ml-1">· {m.distance}</span>
                  </div>
                </div>
                <Button variant="contained" color="primary" size="small">
                  Request Service
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container-app">
          <h2 className="text-2xl font-extrabold text-center mb-2">What Drivers Say</h2>
          <p className="text-center text-muted text-sm mb-10">Real people, real experiences.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6 flex flex-col gap-3">
                <Rating value={t.rating} readOnly size="small" sx={{ color: "#0D2B45" }} />
                <p className="text-sm text-muted leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-xs text-primary">
                    {t.name[0]}
                  </div>
                  <span className="text-sm font-semibold text-primary">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Urgent CTA ───────────────────────────────────────── */}
      <section className="section hero-gradient text-white">
        <div className="container-app text-center">
          <WarningAmberIcon sx={{ fontSize: 48, mb: 2, color: "rgba(255,255,255,0.7)" }} />
          <h2 className="text-3xl font-extrabold text-white mb-3">Need urgent assistance?</h2>
          <p className="text-white/75 max-w-md mx-auto mb-8">
            Don't wait. Help is one click away. A professional is available 24/7 in your area.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="contained" color="secondary" size="large" component={Link} to="/find-mechanics">
              Find a Mechanic Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)", "&:hover": { borderColor: "#fff", background: "rgba(255,255,255,0.08)" } }}
            >
              Emergency Support
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}