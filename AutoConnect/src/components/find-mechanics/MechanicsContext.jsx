/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useMemo } from "react";
import { ALL_MECHANICS } from "./mechanicsData";

const MechanicsContext = createContext(null);

export function MechanicsProvider({ children }) {
  const [distance,     setDistance]     = useState([0, 50]);
  const [checkedSpecs, setCheckedSpecs] = useState([]);
  const [vehicle,      setVehicle]      = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availNow,     setAvailNow]     = useState(false);
  const [searchQuery,  setSearchQuery]  = useState("");

  const filtered = useMemo(() => {
    return ALL_MECHANICS.filter((m) => {
      if (m.dist < distance[0] || m.dist > distance[1]) return false;
      if (checkedSpecs.length > 0 && !checkedSpecs.includes(m.specialty)) return false;
      if (vehicle !== "All" && m.vehicle !== vehicle) return false;
      if (verifiedOnly && !m.verified) return false;
      if (availNow && !m.available) return false;
      if (searchQuery && !m.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [distance, checkedSpecs, vehicle, verifiedOnly, availNow, searchQuery]);

  return (
    <MechanicsContext.Provider value={{
      distance, setDistance,
      checkedSpecs, setCheckedSpecs,
      vehicle, setVehicle,
      verifiedOnly, setVerifiedOnly,
      availNow, setAvailNow,
      searchQuery, setSearchQuery,
      filtered,
    }}>
      {children}
    </MechanicsContext.Provider>
  );
}

export function useMechanics() {
  return useContext(MechanicsContext);
}