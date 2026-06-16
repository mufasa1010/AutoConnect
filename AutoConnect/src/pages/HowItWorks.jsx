/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import LocationOnIcon   from "@mui/icons-material/LocationOn";
import SearchIcon       from "@mui/icons-material/Search";
import BuildIcon        from "@mui/icons-material/Build";
import StarIcon         from "@mui/icons-material/Star";

const steps = [
  { icon: <LocationOnIcon sx={{ fontSize: 36 }} />, step: "01", title: "Share Your Location", desc: "Allow location access or type your address. Our system instantly maps verified mechanics around you." },
  { icon: <SearchIcon    sx={{ fontSize: 36 }} />, step: "02", title: "Browse & Filter",      desc: "Filter by specialty, rating, vehicle type, or availability. Compare profiles, reviews, and pricing." },
  { icon: <BuildIcon     sx={{ fontSize: 36 }} />, step: "03", title: "Book & Get Repaired",  desc: "Confirm your booking in one tap. The mechanic arrives at your location or you drop off your vehicle." },
  { icon: <StarIcon      sx={{ fontSize: 36 }} />, step: "04", title: "Rate & Review",        desc: "After the job is done, leave an honest review. Help the community and keep quality standards high." },
];

export default function HowItWorks() {
  return (
    <>
      <section className="hero-gradient text-white py-20 px-4 text-center">
        <div className="container-app max-w-xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-3">How AutoConnect Works</h1>
          <p className="text-white/75">From breakdown to back on the road in 4 simple steps.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-app max-w-4xl mx-auto">
          <div className="flex flex-col gap-16">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="flex-shrink-0 w-36 h-36 rounded-3xl bg-primary/8 flex items-center justify-center text-primary">
                  {s.icon}
                </div>
                <div>
                  <div className="section-label mb-1">Step {s.step}</div>
                  <h3 className="text-2xl font-extrabold mb-3">{s.title}</h3>
                  <p className="text-muted leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button variant="contained" color="primary" size="large" component={Link} to="/find-mechanics">
              Find a Mechanic Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}