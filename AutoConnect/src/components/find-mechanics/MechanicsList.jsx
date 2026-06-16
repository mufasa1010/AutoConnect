/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NearMeIcon from "@mui/icons-material/NearMe";
import { useMechanics } from "@/components/find-mechanics/MechanicsContext";

export function MechCard({ m, full }) {
  return (
    <div className="card p-4">
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <img src={m.img} alt={m.name} className="w-14 h-14 rounded-xl object-cover" />
          {m.verified && (
            <VerifiedIcon
              sx={{ position: "absolute", bottom: -4, right: -4, fontSize: 18, color: "#1DB954", background: "#fff", borderRadius: "50%" }}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-heading font-bold text-sm text-primary">{m.name}</span>
            <span className="flex items-center gap-0.5 text-xs font-bold text-primary">
              <StarIcon sx={{ fontSize: 14, color: "#0D2B45" }} />{m.rating}
            </span>
          </div>
          <div className="text-xs text-accent font-semibold mb-1">{m.specialty}</div>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="flex items-center gap-1"><AccessTimeIcon sx={{ fontSize: 12 }} />{m.exp} Yrs Exp</span>
            <span className="flex items-center gap-1"><NearMeIcon    sx={{ fontSize: 12 }} />{m.dist} km</span>
          </div>
          <div className="text-xs text-muted mt-0.5">📍 {m.location}</div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button variant="outlined"  color="primary" size="small" fullWidth>{full ? "Profile" : "View Profile"}</Button>
        <Button variant="contained" color="primary" size="small" fullWidth>Contact</Button>
      </div>
    </div>
  );
}

export default function MechanicsList() {
  const { filtered } = useMechanics();

  return (
    <div className="p-4">
      <p className="text-sm text-muted mb-4">{filtered.length} mechanic{filtered.length !== 1 ? "s" : ""} found</p>
      {filtered.length === 0 ? (
        <div className="text-center text-muted py-16">
          <p className="text-sm">No mechanics match your filters.</p>
          <p className="text-xs mt-1">Try adjusting distance, specialty, or location.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-lg mx-auto md:mx-0">
          {filtered.map((m, i) => (
            <MechCard key={i} m={m} full />
          ))}
        </div>
      )}
    </div>
  );
}