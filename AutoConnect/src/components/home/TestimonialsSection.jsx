/* eslint-disable no-unused-vars */
import React from "react";
import { Rating } from "@mui/material";

const testimonials = [
  { name: "Brendan T.", rating: 5, text: "Stuck on the expressway at 11 PM, got help in 15 minutes. Reliable and fast." },
  { name: "Amara S.",   rating: 5, text: "First time I've trusted a platform like this and they exceeded expectations."  },
  { name: "Michael K.", rating: 4, text: "No hidden fees, the payment system is fair and the system just works."         },
];

export default function TestimonialsSection() {
  return (
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
  );
}