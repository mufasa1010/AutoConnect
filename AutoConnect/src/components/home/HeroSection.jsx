/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../utils/supabaseClient";

const mapStyle = {
  version: 8,
  sources: {
    "raster-tiles": {
      type: "raster",
      tiles: [
        "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap © CARTO"
    }
  },
  layers: [
    {
      id: "simple-tiles",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 20
    }
  ]
};

const keyLocations = [
  { name: "Molyko", coords: [9.2425, 4.1532] },
  { name: "Mile 17", coords: [9.2558, 4.1612] },
  { name: "Mile 16", coords: [9.2695, 4.1690] },
  { name: "Muea", coords: [9.2831, 4.1745] },
  { name: "Sandpit", coords: [9.2530, 4.1495] },
  { name: "Bokwai", coords: [9.2195, 4.1578] },
  { name: "Bounduma", coords: [9.2190, 4.1415] },
  { name: "Bokwango", coords: [9.2115, 4.1332] }
];

const LOCATION_COORDS = {
  "Molyko": "4.1532, 9.2425",
  "Mile 17": "4.1612, 9.2558",
  "Mile 16": "4.1690, 9.2695",
  "Muea": "4.1745, 9.2831",
  "Sandpit": "4.1495, 9.2530",
  "Bokwai": "4.1578, 9.2195",
  "Bounduma": "4.1415, 9.2190",
  "Bokwango": "4.1332, 9.2115",
  "Great Soppo": "4.1465, 9.2295",
  "Federal Quarters": "4.1378, 9.2225"
};

export default function HeroSection() {
  const { user } = useAuth();
  const [popupInfo, setPopupInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Profile form states
  const [specialty, setSpecialty] = useState("Engine Specialist");
  const [location, setLocation] = useState("Molyko");
  const [interviewDay, setInterviewDay] = useState("Monday");
  const [interviewTime, setInterviewTime] = useState("Morning (9 AM - 12 PM)");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [localProfileCompleted, setLocalProfileCompleted] = useState(
    user?.user_metadata?.profile_completed || false
  );

  useEffect(() => {
    if (user?.user_metadata?.profile_completed) {
      setLocalProfileCompleted(true);
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const coords = LOCATION_COORDS[location] || "4.1532, 9.2425";
      const { error: dbError } = await supabase
        .from("mechanic-profiles")
        .update({
          specialty_type: specialty,
          location_coordinates: coords
        })
        .eq("mechanic_id", user.user_id);
        
      if (dbError) {
        console.error("DB error updating mechanic profile:", dbError.message);
      }
      
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          profile_completed: true,
          specialty_type: specialty,
          location: location,
          interview_day: interviewDay,
          interview_time: interviewTime
        }
      });
      
      if (authError) {
        throw new Error(authError.message);
      }
      
      setSubmitSuccess(true);
      setLocalProfileCompleted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 3000);
    } catch (err) {
      alert("Error setting up profile: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

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
            {(!user || user.account_type === "mechanic") && (
              <Button
                variant={localProfileCompleted ? "contained" : "outlined"}
                size="large"
                disabled={localProfileCompleted}
                onClick={user ? () => setIsModalOpen(true) : undefined}
                component={user ? "button" : Link}
                to={user ? undefined : "/signup?role=mechanic"}
                sx={{
                  color: localProfileCompleted ? "#1DB954" : "#fff",
                  borderColor: localProfileCompleted ? "#1DB954" : "#fff",
                  backgroundColor: localProfileCompleted ? "rgba(29, 185, 84, 0.1)" : "transparent",
                  "&.Mui-disabled": {
                    color: "rgba(29, 185, 84, 0.8)",
                    borderColor: "rgba(29, 185, 84, 0.4)",
                    backgroundColor: "rgba(29, 185, 84, 0.05)"
                  },
                  "&:hover": {
                    borderColor: "#fff",
                    background: localProfileCompleted ? "rgba(29, 185, 84, 0.15)" : "rgba(255,255,255,0.08)"
                  }
                }}
              >
                {user 
                  ? (localProfileCompleted ? "Profile Under Review" : "Setup Profile")
                  : "Become a Mechanic"
                }
              </Button>
            )}
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

        {/* --- DYNAMIC MAPLIBRE MAP CONTAINER --- */}
        <div className="hidden md:flex justify-center">
          <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <Map
              initialViewState={{
                longitude: 9.2435,
                latitude: 4.1535,
                zoom: 13.0
              }}
              minZoom={12}
              maxZoom={18}
              maxBounds={[9.2000, 4.1250, 9.2900, 4.1850]}
              mapStyle={mapStyle}
              mapLib={maplibregl}
              style={{ width: "100%", height: "100%" }}
            >
              {keyLocations.map((loc) => (
                <Marker
                  key={loc.name}
                  longitude={loc.coords[0]}
                  latitude={loc.coords[1]}
                  anchor="center"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPopupInfo(loc);
                    }}
                    className="relative flex items-center justify-center cursor-pointer focus:outline-none"
                    style={{ width: "16px", height: "16px" }}
                  >
                    <span className="absolute inline-flex h-4 w-4 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-600 border-2 border-white shadow"></span>
                  </button>
                </Marker>
              ))}

              {popupInfo && (
                <Popup
                  longitude={popupInfo.coords[0]}
                  latitude={popupInfo.coords[1]}
                  anchor="bottom"
                  onClose={() => setPopupInfo(null)}
                  closeOnClick={false}
                  offset={10}
                >
                  <div className="p-1 font-body text-xs text-slate-800">
                    <strong className="font-heading font-bold text-sm block text-primary">{popupInfo.name}</strong>
                    <span>Mechanic Network Active</span>
                  </div>
                </Popup>
              )}
            </Map>
            
            {/* UI overlay element */}
            <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-2 shadow-lg z-[400] pointer-events-none">
              <span className="font-heading text-slate-900 text-sm font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Scanning Buea, CM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SETUP PROFILE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 overflow-hidden md:p-8">
            <div className="absolute top-0 right-0 p-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors text-lg"
              >
                ✕
              </button>
            </div>
            
            {submitSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-emerald-600 font-bold">✓</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-primary mb-2">Setup Complete!</h3>
                <p className="text-sm text-muted mb-4 font-body">
                  Your profile has been submitted successfully.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 text-left border border-border">
                  <div className="text-xs font-semibold text-primary mb-1">📅 Scheduled Interview:</div>
                  <div className="text-sm text-accent font-bold mb-2">{interviewDay} at {interviewTime}</div>
                  <p className="text-[11px] text-muted leading-relaxed">
                    Our admins will hold an interview with you on this day to verify your mechanic credentials and activate your profile on the map.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4 text-slate-800">
                <div>
                  <h3 className="font-heading font-bold text-xl text-primary mb-1">Setup Mechanic Profile</h3>
                  <p className="text-xs text-muted">Complete your verification details to begin taking requests.</p>
                </div>
                
                {/* Specialty Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-heading font-bold text-gray-500 uppercase tracking-wide">Specialty Type</label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  >
                    <option value="Engine Specialist">Engine Specialist</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Benskin Expert">Benskin Expert</option>
                    <option value="Bodywork & Paint">Bodywork & Paint</option>
                    <option value="Truck Specialist">Truck Specialist</option>
                  </select>
                </div>
                
                {/* Location Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-heading font-bold text-gray-500 uppercase tracking-wide">Location in Buea</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  >
                    <option value="Molyko">Molyko</option>
                    <option value="Mile 17">Mile 17</option>
                    <option value="Mile 16">Mile 16</option>
                    <option value="Muea">Muea</option>
                    <option value="Sandpit">Sandpit</option>
                    <option value="Bokwai">Bokwai</option>
                    <option value="Bounduma">Bounduma</option>
                    <option value="Bokwango">Bokwango</option>
                    <option value="Great Soppo">Great Soppo</option>
                    <option value="Federal Quarters">Federal Quarters</option>
                  </select>
                </div>
                
                {/* Interview Day Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-heading font-bold text-gray-500 uppercase tracking-wide">Select Interview Day</label>
                  <select
                    value={interviewDay}
                    onChange={(e) => setInterviewDay(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
                
                {/* Time Slot Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-heading font-bold text-gray-500 uppercase tracking-wide">Preferred Time Slot</label>
                  <select
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  >
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                  </select>
                </div>
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting}
                  fullWidth
                  sx={{
                    py: 1.2,
                    mt: 1,
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    textTransform: "none",
                    backgroundColor: "#0D2B45",
                    "&:hover": {
                      backgroundColor: "#091e30",
                    },
                  }}
                >
                  {submitting ? "Submitting..." : "Schedule Verification"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}