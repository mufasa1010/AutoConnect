/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, IconButton, Drawer, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const links = [
  { label: "Home",          to: "/"               },
  { label: "About Us",      to: "/about"          },
  { label: "Find Mechanics",to: "/find-mechanics" },
  { label: "How It Works",  to: "/how-it-works"   },
  { label: "Contact",       to: "/contact"        },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
          scrolled ? "shadow-card" : "border-b border-border"
        }`}
      >
        <div className="container-app flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <DirectionsCarIcon sx={{ color: "#0D2B45", fontSize: 26 }} />
            <span className="font-heading font-bold text-xl text-primary tracking-tight">
              AutoConnect
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-link ${pathname === l.to ? "nav-link-active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="contained" color="primary" component={Link} to="/get-started">
              Find Help
            </Button>
            <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://i.pravatar.cc/36?img=12"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Mobile hamburger */}
          <IconButton className="md:hidden" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="w-64 p-4">
          <div className="flex items-center justify-between mb-6">
            <span className="font-heading font-bold text-lg text-primary">AutoConnect</span>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <List disablePadding>
            {links.map((l) => (
              <ListItem key={l.to} disablePadding className="mb-1">
                <Link
                  to={l.to}
                  onClick={() => setDrawerOpen(false)}
                  className={`w-full px-3 py-2 rounded-lg font-body text-sm transition-colors no-underline
                    ${pathname === l.to
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted hover:bg-surface"
                    }`}
                >
                  {l.label}
                </Link>
              </ListItem>
            ))}
          </List>
          <div className="mt-6 flex flex-col gap-3">
            <Button variant="contained" color="primary" fullWidth component={Link} to="/get-started" onClick={() => setDrawerOpen(false)}>
              Find Help
            </Button>
            <Button variant="outlined" color="error" fullWidth>
              Emergency
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}