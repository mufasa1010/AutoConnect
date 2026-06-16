/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useMechanics } from "./MechanicsContext";

export default function SearchBar() {
  const { setSearchQuery } = useMechanics();
  const [input, setInput] = useState("");

  const handleSearch = () => setSearchQuery(input);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="px-4 py-3 bg-white border-b border-border flex gap-3">
      <div className="relative flex-1">
        <GpsFixedIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          sx={{ fontSize: 18 }}
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by location (e.g. Buea, Douala...)"
          className="input-base pl-9"
        />
      </div>
      <Button variant="contained" color="primary" startIcon={<SearchIcon />} onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}