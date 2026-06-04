/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import {
  Button, Slider, Checkbox, FormControlLabel, Switch, ToggleButton, ToggleButtonGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MapIcon from "@mui/icons-material/Map";
import ListIcon from "@mui/icons-material/FormatListBulleted";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NearMeIcon from "@mui/icons-material/NearMe";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const mechanics = [
  { name: "Amstrong T.",  specialty: "Master Engine Technician", rating: 4.9, exp: "8 Yrs", dist: "1.2 km", img: "https://i.pravatar.cc/80?img=8"  },
  { name: "Samuel J.",    specialty: "Benskin & Electrician",    rating: 4.7, exp: "5 Yrs", dist: "2.5 km", img: "https://i.pravatar.cc/80?img=11" },
  { name: "Kingsley N.",  specialty: "Truck Specialist",         rating: 5.0, exp: "12 Yrs",dist: "4.0 km", img: "https://i.pravatar.cc/80?img=33" },
];

const specialties = ["Engine Specialist", "Electrician", "Benskin Expert", "Bodywork & Paint"];
const vehicleTypes = [
  { label: "Car",   icon: <DirectionsCarIcon sx={{ fontSize: 16 }} /> },
  { label: "Bike",  icon: <TwoWheelerIcon sx={{ fontSize: 16 }} />    },
  { label: "Truck", icon: <LocalShippingIcon sx={{ fontSize: 16 }} />  },
  { label: "Heavy", icon: <DirectionsCarIcon sx={{ fontSize: 16 }} />  },
];

export default function FindMechanics() {
  const [view,         setView]         = useState("list");
  const [distance,     setDistance]     = useState([0, 50]);
  const [checkedSpecs, setCheckedSpecs] = useState(["Engine Specialist"]);
  const [vehicle,      setVehicle]      = useState("Car");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [availNow,     setAvailNow]     = useState(false);

  const toggleSpec = (s) =>
    setCheckedSpecs((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* ── Sidebar Filters ──────────────────────── */}
      <aside className="hidden md:flex flex-col w-56 border-r border-border bg-white p-5 overflow-y-auto flex-shrink-0">
        <h3 className="font-heading font-bold text-base mb-5">Filters</h3>

        {/* Distance */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">Distance (km)</p>
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
                  ${vehicle === vt.label ? "bg-primary text-white border-primary" : "bg-white text-muted border-border hover:border-primary"}`}
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
            <Switch size="small" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} sx={{ "& .MuiSwitch-thumb": { backgroundColor: verifiedOnly ? "#0D2B45" : "" } }} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary">Available Now</span>
            <Switch size="small" checked={availNow}    onChange={(e) => setAvailNow(e.target.checked)} />
          </div>
        </div>

        <Button variant="outlined" color="primary" size="small" fullWidth
          onClick={() => { setCheckedSpecs([]); setVehicle("Car"); setVerifiedOnly(false); setAvailNow(false); setDistance([0,50]); }}>
          Reset Filters
        </Button>
      </aside>

      {/* ── Main Content ─────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="p-4 border-b border-border bg-white flex flex-wrap items-center gap-3">
          {/* Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 flex-1 min-w-0">
            {["Filters", "Cars", "Bikes", "Verified", "Available"].map((c, i) => (
              <button key={c} className={`chip whitespace-nowrap ${i === 0 ? "chip-active" : ""}`}>{c}</button>
            ))}
          </div>
          {/* View toggle */}
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, v) => v && setView(v)}
            size="small"
            sx={{ "& .MuiToggleButton-root": { px: 2, py: 0.5, borderColor: "#E5E7EB" } }}
          >
            <ToggleButton value="list"><ListIcon sx={{ fontSize: 18 }} /></ToggleButton>
            <ToggleButton value="map"><MapIcon  sx={{ fontSize: 18 }} /></ToggleButton>
          </ToggleButtonGroup>
        </div>

        {/* Search bar */}
        <div className="px-4 py-3 bg-white border-b border-border flex gap-3">
          <div className="relative flex-1">
            <GpsFixedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" sx={{ fontSize: 18 }} />
            <input
              type="text"
              placeholder="Buea, Cameroon..."
              defaultValue="Buea, Cameroon..."
              className="input-base pl-9"
            />
          </div>
          <Button variant="contained" color="primary" startIcon={<SearchIcon />}>Search</Button>
        </div>

        {/* Body */}
        <div className={`flex-1 overflow-hidden ${view === "map" ? "flex gap-0" : "overflow-y-auto"}`}>
          {/* Map view */}
          {view === "map" && (
            <div className="flex flex-1 overflow-hidden">
              {/* Map placeholder */}
              <div className="flex-1 bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-muted">
                    <MapIcon sx={{ fontSize: 60, opacity: 0.3 }} />
                    <p className="text-sm mt-2">Map view (integrate Leaflet/Google Maps here)</p>
                  </div>
                </div>
                {/* Price pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    $45 ⚡
                  </div>
                </div>
              </div>

              {/* List panel */}
              <div className="w-80 overflow-y-auto border-l border-border bg-white">
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-sm">Mechanics near you</h3>
                    <p className="text-xs text-muted">12 available specialists</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 px-4 pb-4">
                  {mechanics.map((m, i) => (
                    <MechCard key={i} m={m} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* List view */}
          {view === "list" && (
            <div className="p-4">
              <p className="text-sm text-muted mb-4">12 mechanics near you</p>
              <div className="flex flex-col gap-4 max-w-lg mx-auto md:mx-0">
                {mechanics.map((m, i) => (
                  <MechCard key={i} m={m} full />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MechCard({ m, full }) {
  return (
    <div className="card p-4">
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <img src={m.img} alt={m.name} className="w-14 h-14 rounded-xl object-cover" />
          <VerifiedIcon sx={{ position: "absolute", bottom: -4, right: -4, fontSize: 18, color: "#1DB954", background: "#fff", borderRadius: "50%" }} />
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
            <span className="flex items-center gap-1"><AccessTimeIcon sx={{ fontSize: 12 }} />{m.exp} Exp</span>
            <span className="flex items-center gap-1"><NearMeIcon    sx={{ fontSize: 12 }} />{m.dist}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button variant="outlined" color="primary" size="small" fullWidth>
          {full ? "Profile" : "View Profile"}
        </Button>
        <Button variant="contained" color="primary" size="small" fullWidth>
          Contact
        </Button>
      </div>
    </div>
  );
}