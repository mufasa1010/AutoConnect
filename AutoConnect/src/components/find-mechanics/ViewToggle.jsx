/* eslint-disable no-unused-vars */
import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import ListIcon from "@mui/icons-material/FormatListBulleted";
import { useMechanics } from "@/components/find-mechanics/MechanicsContext";

export default function ViewToggle({ view, onChange }) {
  const {
    vehicle, setVehicle,
    verifiedOnly, setVerifiedOnly,
    checkedSpecs, setCheckedSpecs,
  } = useMechanics();

  const chips = [
    {
      label: "All",
      active: vehicle === "All" && !verifiedOnly && checkedSpecs.length === 0,
      onClick: () => { setVehicle("All"); setVerifiedOnly(false); setCheckedSpecs([]); },
    },
    {
      label: "Cars",
      active: vehicle === "Car",
      onClick: () => setVehicle(vehicle === "Car" ? "All" : "Car"),
    },
    {
      label: "Bikes",
      active: vehicle === "Bike",
      onClick: () => setVehicle(vehicle === "Bike" ? "All" : "Bike"),
    },
    {
      label: "Verified",
      active: verifiedOnly,
      onClick: () => setVerifiedOnly((v) => !v),
    },
    {
      label: "Available",
      active: checkedSpecs.includes("available"),
      onClick: () => setVehicle(vehicle === "Heavy" ? "All" : "Heavy"),
    },
  ];

  return (
    <div className="p-4 border-b border-border bg-white flex flex-wrap items-center gap-3">
      <div className="flex gap-2 overflow-x-auto pb-1 flex-1 min-w-0">
        {chips.map((c) => (
          <button
            key={c.label}
            onClick={c.onClick}
            className={`chip whitespace-nowrap transition-all ${c.active ? "chip-active" : ""}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(_, v) => v && onChange(v)}
        size="small"
        sx={{ "& .MuiToggleButton-root": { px: 2, py: 0.5, borderColor: "#E5E7EB" } }}
      >
        <ToggleButton value="list"><ListIcon sx={{ fontSize: 18 }} /></ToggleButton>
        <ToggleButton value="map"><MapIcon   sx={{ fontSize: 18 }} /></ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}