import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  Menu, 
  MenuItem, 
  Avatar, 
  Box, 
  Typography 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../../context/AuthContext";

const links = [
  { label: "Home",          to: "/"               },
  { label: "About Us",      to: "/about"          },
  { label: "Find Mechanics",to: "/find-mechanics" },
  { label: "How It Works",  to: "/how-it-works"   },
  { label: "Contact",       to: "/contact"        },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

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

          {/* CTA & User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleAvatarClick}
                  sx={{
                    textTransform: "none",
                    color: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: 0.5,
                    px: 1.5,
                    borderRadius: 3,
                    "&:hover": {
                      backgroundColor: "var(--color-surface)",
                    }
                  }}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  <Avatar 
                    src={user.avatar} 
                    alt={user.name} 
                    sx={{ width: 34, height: 34, border: "2px solid var(--color-border)" }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--color-primary)" }}>
                      {user.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "var(--color-muted)", fontSize: "0.7rem", textTransform: "capitalize" }}>
                      {user.role === "mechanic" ? "Mechanic Pro" : "Vehicle Owner"}
                    </Typography>
                  </Box>
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 200,
                      borderRadius: 3,
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                      border: "1px solid var(--color-border)",
                      p: 1
                    }
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{user.name}</Typography>
                    <Typography variant="body2" sx={{ color: "var(--color-muted)", fontSize: "0.75rem" }}>{user.email}</Typography>
                    <Typography variant="body2" sx={{ color: "var(--color-muted)", fontSize: "0.75rem", mt: 0.5 }}>{user.phoneNumber}</Typography>
                  </Box>
                  <ListItem disablePadding sx={{ my: 0.5 }} />
                  <MenuItem onClick={handleClose} component={Link} to="/get-started" sx={{ borderRadius: 2, fontSize: "0.85rem", gap: 1 }}>
                    <PersonIcon fontSize="small" /> Account Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ borderRadius: 2, fontSize: "0.85rem", color: "var(--color-danger)", gap: 1 }}>
                    <ExitToAppIcon fontSize="small" /> Sign Out
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button 
                  variant="text" 
                  color="primary" 
                  component={Link} 
                  to="/login"
                  sx={{ fontWeight: 600 }}
                >
                  Sign In
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  component={Link} 
                  to="/get-started"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <IconButton className="md:hidden" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="w-64 p-4 flex flex-col h-full justify-between">
          <div>
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
          </div>

          <div className="mt-auto pt-6 border-t border-border flex flex-col gap-3">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-2 mb-2">
                  <Avatar src={user.avatar} alt={user.name} sx={{ width: 40, height: 40 }} />
                  <div>
                    <Typography variant="body2" sx={{ fontWeight: 750, color: "var(--color-primary)" }}>
                      {user.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "var(--color-muted)", textTransform: "capitalize" }}>
                      {user.role}
                    </Typography>
                  </div>
                </div>
                <Button 
                  variant="outlined" 
                  color="error" 
                  fullWidth 
                  onClick={handleLogout}
                  startIcon={<ExitToAppIcon />}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outlined" 
                  color="primary" 
                  fullWidth 
                  component={Link} 
                  to="/login"
                  onClick={() => setDrawerOpen(false)}
                >
                  Sign In
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  component={Link} 
                  to="/get-started"
                  onClick={() => setDrawerOpen(false)}
                >
                  Get Started
                </Button>
              </div>
            )}
            <Button variant="outlined" color="error" fullWidth sx={{ mt: 1 }}>
              Emergency
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}