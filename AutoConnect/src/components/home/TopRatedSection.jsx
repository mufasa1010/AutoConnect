/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";

const mechanics = [
  { name: "Samuel Okoro",  specialty: "Engine Specialist", rating: 4.9, distance: "1.2 km", img: "https://i.pravatar.cc/80?img=11" },
  { name: "Fon Akintunde", specialty: "Electrician",       rating: 4.8, distance: "2.0 km", img: "https://i.pravatar.cc/80?img=33" },
  { name: "Amstrong T.",   specialty: "Benskin Expert",    rating: 4.7, distance: "3.1 km", img: "https://i.pravatar.cc/80?img=8"  },
];

export default function TopRatedSection() {
  return (
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
  );
}