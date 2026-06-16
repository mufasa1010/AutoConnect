/* eslint-disable no-unused-vars */
import React from "react";
import MapIcon from "@mui/icons-material/Map";
import { MechCard } from "@/components/find-mechanics/MechanicsList";
import { useMechanics } from "@/components/find-mechanics/MechanicsContext";

export default function MapView() {
  const { filtered } = useMechanics();

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Map placeholder */}
      <div className="flex-1 bg-gray-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted">
            <MapIcon sx={{ fontSize: 60, opacity: 0.3 }} />
            <p className="text-sm mt-2">Map view (integrate Leaflet/Google Maps here)</p>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            $45 ⚡
          </div>
        </div>
      </div>

      {/* Side panel */}
      <div className="w-80 overflow-y-auto border-l border-border bg-white">
        <div className="p-4">
          <h3 className="font-heading font-bold text-sm">Mechanics near you</h3>
          <p className="text-xs text-muted">{filtered.length} available specialist{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex flex-col gap-3 px-4 pb-4">
          {filtered.map((m, i) => (
            <MechCard key={i} m={m} />
          ))}
        </div>
      </div>
    </div>
  );
}