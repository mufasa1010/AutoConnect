/* eslint-disable no-unused-vars */
import React from "react";

const steps = [
  { emoji: "📍", title: "Location",  desc: "Share your location so we can find you mechanics nearest to you."           },
  { emoji: "🔧", title: "Find",      desc: "Browse verified mechanics by specialty, ratings and real-time availability." },
  { emoji: "🚗", title: "Repair",    desc: "Get the best fix for the right price, digital invoice in full every time."   },
  { emoji: "⭐", title: "Rate Back", desc: "Leave an honest review after each job and help us keep quality high."        },
];

export default function HowItWorksSection() {
  return (
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
  );
}