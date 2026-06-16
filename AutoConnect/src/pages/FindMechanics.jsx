/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MechanicsProvider } from "@/components/find-mechanics/MechanicsContext";
import FiltersSidebar from "@/components/find-mechanics/FiltersSidebar";
import SearchBar      from "@/components/find-mechanics/SearchBar";
import ViewToggle     from "@/components/find-mechanics/ViewToggle";
import MechanicsList  from "@/components/find-mechanics/MechanicsList";
import MapView        from "@/components/find-mechanics/MapView";

export default function FindMechanics() {
  const [view, setView] = useState("list");

  return (
    <MechanicsProvider>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <FiltersSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ViewToggle view={view} onChange={setView} />
          <SearchBar />
          <div className={`flex-1 overflow-hidden ${view === "map" ? "flex gap-0" : "overflow-y-auto"}`}>
            {view === "map" ? <MapView /> : <MechanicsList />}
          </div>
        </div>
      </div>
    </MechanicsProvider>
  );
}