/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import MapIcon from "@mui/icons-material/Map";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import { MechCard } from "@/components/find-mechanics/MechanicsList";
import { useMechanics } from "@/components/find-mechanics/MechanicsContext";

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

export default function MapView() {
  const { filtered } = useMechanics();
  const [popupMech, setPopupMech] = useState(null);
  const mapRef = useRef(null);

  const handleSelectMechanic = (m) => {
    setPopupMech(m);
    if (mapRef.current && m.coords) {
      mapRef.current.flyTo({
        center: [m.coords[0], m.coords[1]],
        zoom: 15.0,
        essential: true
      });
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden h-full w-full">
      {/* Map container */}
      <div className="flex-1 bg-gray-100 relative h-full">
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: 9.2435,
            latitude: 4.1535,
            zoom: 13.0
          }}
          minZoom={11}
          maxZoom={18}
          maxBounds={[9.1800, 4.1100, 9.3100, 4.2000]}
          mapStyle={mapStyle}
          mapLib={maplibregl}
          style={{ width: "100%", height: "100%" }}
        >
          <NavigationControl position="top-right" showCompass={false} />

          {filtered.map((m, i) => (
            m.coords && (
              <Marker
                key={m.name + i}
                longitude={m.coords[0]}
                latitude={m.coords[1]}
                anchor="bottom"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectMechanic(m);
                  }}
                  className="group relative flex items-center justify-center cursor-pointer focus:outline-none transition-transform duration-200 hover:scale-110"
                  style={{ width: "36px", height: "36px" }}
                >
                  {/* Glowing dynamic ring */}
                  <span className={`absolute inline-flex h-10 w-10 rounded-full opacity-40 animate-pulse
                    ${m.available ? "bg-emerald-400" : "bg-gray-400"}`}></span>
                  
                  {/* Customized avatar marker with status ring */}
                  <div className={`relative w-8 h-8 rounded-full border-2 bg-white shadow-md flex items-center justify-center overflow-hidden
                    ${m.available ? "border-emerald-500" : "border-gray-300"}`}>
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Small badge overlay */}
                  <div className={`absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border border-white flex items-center justify-center text-[7px] font-bold text-white shadow-sm
                    ${m.available ? "bg-emerald-500" : "bg-gray-400"}`}>
                    {m.available ? "⚡" : "💤"}
                  </div>
                </button>
              </Marker>
            )
          ))}

          {popupMech && (
            <Popup
              longitude={popupMech.coords[0]}
              latitude={popupMech.coords[1]}
              anchor="bottom"
              offset={12}
              onClose={() => setPopupMech(null)}
              closeOnClick={false}
            >
              <div className="p-2 font-body text-slate-800 text-xs min-w-[200px]">
                <div className="flex items-start gap-2.5 mb-2">
                  <img src={popupMech.img} alt={popupMech.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-heading font-bold text-sm text-primary truncate">{popupMech.name}</span>
                      {popupMech.verified && <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1 rounded flex-shrink-0">✓</span>}
                    </div>
                    <div className="text-[11px] text-accent font-semibold truncate">{popupMech.specialty}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-muted border-t border-b border-border py-1 mb-2">
                  <span>⭐ {popupMech.rating}</span>
                  <span>⚙️ {popupMech.exp} Yrs</span>
                  <span>📍 {popupMech.dist} km</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-2 py-1 text-center border border-primary text-primary hover:bg-primary hover:text-white rounded text-[10px] font-medium transition-colors">
                    Profile
                  </button>
                  <button className="flex-1 px-2 py-1 text-center bg-primary text-white hover:bg-primary-dark rounded text-[10px] font-medium transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            </Popup>
          )}
        </Map>
      </div>

      {/* Side panel */}
      <div className="w-80 overflow-y-auto border-l border-border bg-white hidden md:block">
        <div className="p-4">
          <h3 className="font-heading font-bold text-sm">Mechanics near you</h3>
          <p className="text-xs text-muted">{filtered.length} available specialist{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex flex-col gap-3 px-4 pb-4">
          {filtered.map((m, i) => (
            <div
              key={i}
              onClick={() => handleSelectMechanic(m)}
              className={`cursor-pointer rounded-xl transition-all duration-150 hover:bg-slate-50 border border-transparent
                ${popupMech?.name === m.name ? "border-primary/25 bg-slate-50/70" : ""}`}
            >
              <MechCard m={m} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}