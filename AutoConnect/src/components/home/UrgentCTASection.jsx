/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function UrgentCTASection() {
  return (
    <section className="section hero-gradient text-white">
      <div className="container-app text-center">
        <WarningAmberIcon sx={{ fontSize: 48, mb: 2, color: "rgba(255,255,255,0.7)" }} />
        <h2 className="text-3xl font-extrabold text-white mb-3">Need urgent assistance?</h2>
        <p className="text-white/75 max-w-md mx-auto mb-8">
          Don't wait. Help is one click away. A professional is available 24/7 in your area.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="contained" color="secondary" size="large" component={Link} to="/find-mechanics">
            Find a Mechanic Now
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)", "&:hover": { borderColor: "#fff", background: "rgba(255,255,255,0.08)" } }}
          >
            Emergency Support
          </Button>
        </div>
      </div>
    </section>
  );
}