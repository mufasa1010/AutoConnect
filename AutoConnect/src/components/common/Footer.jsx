/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const quickLinks = [
  { label: "Home",           to: "/"               },
  { label: "About Us",       to: "/about"          },
  { label: "Find Mechanics", to: "/find-mechanics" },
  { label: "How It Works",   to: "/how-it-works"   },
  { label: "Contact",        to: "/contact"        },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-app py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <DirectionsCarIcon sx={{ fontSize: 22 }} />
            <span className="font-heading font-bold text-lg">AutoConnect</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed max-w-xs">
            Redefining roadside assistance for the modern era. Join thousands of
            drivers who trust us for their journey.
          </p>
          <div className="flex gap-3 mt-5">
            {[FacebookIcon, TwitterIcon, InstagramIcon].map((Icon, i) => (
              <button
                key={i}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center 
                           justify-center hover:bg-white/10 transition-colors"
              >
                <Icon sx={{ fontSize: 18 }} />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="font-heading font-semibold text-sm mb-4 text-white/90 uppercase tracking-wider">
            Quick Links
          </h6>
          <ul className="space-y-2">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-white/70 hover:text-white no-underline transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h6 className="font-heading font-semibold text-sm mb-4 text-white/90 uppercase tracking-wider">
            Contact Us
          </h6>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-white/70">
              <LocationOnIcon sx={{ fontSize: 18, mt: 0.1 }} />
              University Street, Molyko, Buea, SW Region, Cameroon
            </li>
            <li className="flex items-center gap-2 text-sm text-white/70">
              <EmailIcon sx={{ fontSize: 18 }} />
              hello@autoconnect.cm
            </li>
            <li className="flex items-center gap-2 text-sm text-white/70">
              <PhoneIcon sx={{ fontSize: 18 }} />
              +237 6XX XXX XXX
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="container-app flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span>© 2024 AutoConnect. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/80 no-underline transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/80 no-underline transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}