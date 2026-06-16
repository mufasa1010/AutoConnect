/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Slider, Checkbox, FormControlLabel, Switch } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useMechanics } from "./MechanicsContext";

const specialties = ["Engine Specialist", "Electrician", "Benskin Expert", "Bodywork & Paint", "Truck Specialist"];
const vehicleTypes = [
  { label: "All",   icon: <DirectionsCarIcon sx={{ fontSize: 16 }} /> },
  { label: "Car",   icon: <DirectionsCarIcon sx={{ fontSize: 16 }} /> },
  { label: "Bike",  icon: <TwoWheelerIcon sx={{ fontSize: 16 }} />    },
  { label: "Truck", icon: <LocalShippingIcon sx={{ fontSize: 16 }} /> },
  { label: "Heavy", icon: <DirectionsCarIcon sx={{ fontSize: 16 }} /> },
];

export default function FiltersSidebar() {
  const {
    distance, setDistance,
    checkedSpecs, setCheckedSpecs,
    vehicle, setVehicle,
    verifiedOnly, setVerifiedOnly,
    availNow, setAvailNow,
  } = useMechanics();

  const toggleSpec = (s) =>
    setCheckedSpecs((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const handleReset = () => {
    setCheckedSpecs([]);
    setVehicle("All");
    setVerifiedOnly(false);
    setAvailNow(false);
    setDistance([0, 50]);
  };

  return (
    <aside className="hidden md:flex flex-col w-56 border-r border-border bg-white p-5 overflow-y-auto flex-shrink-0">
      <h3 className="font-heading font-bold text-base mb-5">Filters</h3>

      {/* Distance */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
          Distance: {distance[0]}–{distance[1]} km
        </p>
        <Slider
          value={distance}
          onChange={(_, v) => setDistance(v)}
          min={0} max={50}
          valueLabelDisplay="auto"
          sx={{ color: "#0D2B45" }}
        />
        <div className="flex justify-between text-xs text-muted">
          <span>0km</span><span>50km</span>
        </div>
      </div>

      {/* Specialties */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Specialties</p>
        {specialties.map((s) => (
          <FormControlLabel
            key={s}
            control={
              <Checkbox
                size="small"
                checked={checkedSpecs.includes(s)}
                onChange={() => toggleSpec(s)}
                sx={{ color: "#0D2B45", "&.Mui-checked": { color: "#0D2B45" } }}
              />
            }
            label={<span className="text-xs font-body">{s}</span>}
            sx={{ display: "flex", mb: 0.5 }}
          />
        ))}
      </div>

      {/* Vehicle type */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">Vehicle Type</p>
        <div className="grid grid-cols-2 gap-2">
          {vehicleTypes.map((vt) => (
            <button
              key={vt.label}
              onClick={() => setVehicle(vt.label)}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-xs font-medium transition-all
                ${vehicle === vt.label
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-muted border-border hover:border-primary"}`}
            >
              {vt.icon}{vt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-primary">Verified Only</span>
          <Switch
            size="small"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            sx={{ "& .MuiSwitch-thumb": { backgroundColor: verifiedOnly ? "#0D2B45" : "" } }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-primary">Available Now</span>
          <Switch
            size="small"
            checked={availNow}
            onChange={(e) => setAvailNow(e.target.checked)}
          />
        </div>
      </div>

      <Button variant="outlined" color="primary" size="small" fullWidth onClick={handleReset}>
        Reset Filters
      </Button>
    </aside>
  );
}