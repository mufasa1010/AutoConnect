/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BuildIcon from "@mui/icons-material/Build";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LockIcon from "@mui/icons-material/Lock";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <DirectionsCarIcon sx={{ color: "#0D2B45", fontSize: 30 }} />
        <span className="font-heading font-bold text-2xl text-primary">AutoConnect</span>
      </div>

      {/* Heading */}
      <div className="text-center mb-10 animate-fade-up">
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-3">
          Welcome to the future of car care
        </h1>
        <p className="text-muted text-base max-w-md mx-auto">
          Join thousands of users and professionals on the most reliable automotive
          service network. Choose your journey to continue.
        </p>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl animate-fade-up animate-delay-200">
        {/* Vehicle Owner */}
        <div className="card overflow-hidden flex flex-col">
          <div className="h-52 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop"
              alt="Car"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex flex-col items-center text-center gap-3 flex-1">
            <LocationOnIcon sx={{ color: "#0D2B45", fontSize: 32 }} />
            <h3 className="text-xl font-heading font-bold text-primary">
              Vehicle/Motorcycle Owner
            </h3>
            <p className="text-muted text-sm">
              I need assistance or maintenance. Access top-rated mechanics nearby instantly.
            </p>
            <Button variant="contained" color="primary" fullWidth component={Link} to="/" sx={{ mt: "auto" }}>
              Select Owner
            </Button>
          </div>
        </div>

        {/* Mechanic */}
        <div className="card overflow-hidden flex flex-col">
          <div className="h-52 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&auto=format&fit=crop"
              alt="Mechanic workshop"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex flex-col items-center text-center gap-3 flex-1">
            <BuildIcon sx={{ color: "#0D2B45", fontSize: 32 }} />
            <h3 className="text-xl font-heading font-bold text-primary">Mechanic</h3>
            <p className="text-muted text-sm">
              I want to provide services and find customers. Grow your business with our platform.
            </p>
            <Button variant="outlined" color="primary" fullWidth component={Link} to="/" sx={{ mt: "auto" }}>
              Select Mechanic
            </Button>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-8 text-sm text-muted animate-fade-up animate-delay-300">
        Already have an account?{" "}
        <Link to="/" className="text-primary font-semibold hover:underline">
          Sign In
        </Link>
      </div>
      <div className="flex items-center gap-5 mt-4 text-xs text-muted/70">
        <span className="flex items-center gap-1">
          <LockIcon sx={{ fontSize: 14 }} /> Secure SSL
        </span>
        <span className="flex items-center gap-1">
          <PrivacyTipIcon sx={{ fontSize: 14 }} /> Privacy Protected
        </span>
      </div>
    </div>
  );
}