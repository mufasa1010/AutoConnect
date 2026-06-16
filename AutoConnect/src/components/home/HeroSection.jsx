/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import L from "leaflet";

export default function HeroSection() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
  if (mapInstanceRef.current || !mapContainerRef.current) return;

  // 1. Define strict geographic boundaries for your specific zones
  // South-West corner (Bokwango/Bounduma side) to North-East corner (Mile 16/Muea side)
  const bueaZonesBounds = L.latLngBounds(
    [4.1250, 9.2000], // South-West boundary limit
    [4.1850, 9.2900]  // North-East boundary limit
  );

  // Center the camera right in the middle of Molyko / Mile 17 area
  const centerCluster = [4.1535, 9.2410];

  // 2. Initialize the map with strict restrictions
  mapInstanceRef.current = L.map(mapContainerRef.current, {
    zoomControl: false,
    attributionControl: false,
    minZoom: 13,                    // Prevents zooming out to the rest of Cameroon
    maxZoom: 18,                    // Prevents over-requesting hyper-detailed tiles
    maxBounds: bueaZonesBounds,     // Stops Leaflet from loading tiles outside this box
    maxBoundsViscosity: 1.0         // Hard-locks the dragging boundary
  }).setView(centerCluster, 14);     // Perfect zoom level to see Molyko to Mile 17 simultaneously

  // 3. Fast-loading, lightweight map style (CartoDB Positron - lighter than default OpenStreetMap)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(mapInstanceRef.current);

  // 4. Add customized coordinate markers for your key zones to display instantly
  const keyLocations = [
    { name: "Molyko", coords: [4.1532, 9.2425] },
    { name: "Mile 17", coords: [4.1612, 9.2558] },
    { name: "Mile 16", coords: [4.1690, 9.2695] },
    { name: "Muea", coords: [4.1745, 9.2831] },
    { name: "Sandpit", coords: [4.1495, 9.2530] },
    { name: "Bokwai", coords: [4.1578, 9.2195] },
    { name: "Bounduma", coords: [4.1415, 9.2190] },
    { name: "Bokwango", coords: [4.1332, 9.2115] }
  ];

  // Render quick, high-performance CircleMarkers instead of heavy external PNG images
  keyLocations.forEach(loc => {
    L.circleMarker(loc.coords, {
      radius: 5,
      color: '#3b82f6',
      fillColor: '#ffffff',
      fillOpacity: 1,
      weight: 2
    })
    .addTo(mapInstanceRef.current)
    .bindPopup(`<b>${loc.name}</b><br>Mechanic Network Active`);
  });

  // Cleanup on unmount
  return () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
  };
}, []);

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
            roadside help available at the tap of a button across Buea.
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
            {[["120+", "Buea Mechanics"], ["2k+", "Local Jobs Done"], ["4.9", "Avg Rating"]].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="text-2xl font-heading font-bold text-white">{val}</div>
                <div className="text-xs text-white/60 mt-0.5">{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* --- DYNAMIC LEAFLET MAP CONTAINER --- */}
        <div className="hidden md:flex justify-center">
          <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            {/* Target anchor for Leaflet Map engine manipulation */}
            <div ref={mapContainerRef} className="w-full h-full z-0" />
            
            {/* UI overlay element */}
            <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-2 shadow-lg z-[400]">
              <span className="font-heading text-slate-900 text-sm font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Scanning Buea, CM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}