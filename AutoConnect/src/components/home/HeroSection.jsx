/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

export default function HeroSection() {
  return (
    <section className="hero-gradient text-white py-20 px-4 min-h-[70vh] flex items-center relative overflow-hidden">
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
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/get-started"
              sx={{ color: "#fff", borderColor: "#fff", "&:hover": { borderColor: "#fff", background: "rgba(255,255,255,0.08)" } }}
            >
              Become a Mechanic
            </Button>
          </div>

          <div className="flex gap-8 mt-10">
            {[["520+", "Mechanics"], ["10k+", "Jobs Done"], ["4.9", "Avg Rating"]].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="text-2xl font-heading font-bold text-white">{val}</div>
                <div className="text-xs text-white/60 mt-0.5">{lbl}</div>
              </div>
            ))}
          </div>
        </div>

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
  );
}