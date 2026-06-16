/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import BuildIcon from "@mui/icons-material/Build";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const categories = [
  { icon: <BuildIcon />,              label: "Engine"       },
  { icon: <ElectricalServicesIcon />, label: "Electronics"  },
  { icon: <DirectionsCarIcon />,      label: "Transmission" },
  { icon: <BuildIcon />,              label: "Bodywork"     },
  { icon: <BuildIcon />,              label: "Oil Change"   },
  { icon: <AcUnitIcon />,             label: "AC Repair"    },
];

export default function CategoriesSection() {
  return (
    <section className="section bg-surface">
      <div className="container-app">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold">Specialist Categories</h2>
          <Link to="/find-mechanics" className="text-sm text-primary font-semibold hover:underline">
            View All Categories →
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map((c, i) => (
            <button
              key={i}
              className="card p-4 flex flex-col items-center gap-2 cursor-pointer hover:-translate-y-1 transition-transform"
            >
              <span className="text-primary">{c.icon}</span>
              <span className="text-xs font-medium text-center text-primary">{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}