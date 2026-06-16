import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BuildIcon from "@mui/icons-material/Build";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useAuth } from "../../context/AuthContext";

const publicLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Find Mechanics", to: "/find-mechanics" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Contact", to: "/contact" },
];

function getDashboardPath(role) {
  if (role === "mechanic") return "/dashboard/mechanic";
  if (role === "admin") return "/dashboard/admin";
  return null;
}

function getRoleLabel(role) {
  if (role === "mechanic") return "Mechanic Pro";
  if (role === "admin") return "Administrator";
  return "Vehicle Owner";
}

function getRoleColor(role) {
  if (role === "mechanic") return "#e65100";
  if (role === "admin") return "#6a1b9a";
  return "#0D2B45";
}

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuOpen = Boolean(anchorEl);
  const dashboardPath = user ? getDashboardPath(user.role) : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate("/");
  };

  const closeDrawer = () => setDrawerOpen(false);

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
            {publicLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-link ${pathname === l.to ? "nav-link-active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
            {dashboardPath && (
              <Link
                to={dashboardPath}
                className={`nav-link ${pathname === dashboardPath ? "nav-link-active" : ""}`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Button
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    textTransform: "none",
                    color: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: 0.5,
                    px: 1.5,
                    borderRadius: 3,
                    "&:hover": { backgroundColor: "var(--color-surface)" },
                  }}
                >
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    sx={{
                      width: 34,
                      height: 34,
                      border: "2px solid var(--color-border)",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        color: "var(--color-primary)",
                      }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: getRoleColor(user.role),
                        fontSize: "0.7rem",
                        fontWeight: 600,
                      }}
                    >
                      {getRoleLabel(user.role)}
                    </Typography>
                  </Box>
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={() => setAnchorEl(null)}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 220,
                      borderRadius: 3,
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                      border: "1px solid var(--color-border)",
                      p: 1,
                    },
                  }}
                >
                  {/* User info header */}
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 1,
                      }}
                    >
                      <Avatar
                        src={user.avatar}
                        alt={user.name}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 800 }}
                        >
                          {user.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "var(--color-muted)",
                            fontSize: "0.72rem",
                          }}
                        >
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={getRoleLabel(user.role)}
                      size="small"
                      sx={{
                        fontSize: "0.68rem",
                        backgroundColor: `${getRoleColor(user.role)}18`,
                        color: getRoleColor(user.role),
                        fontWeight: 700,
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 0.5 }} />

                  {dashboardPath && (
                    <MenuItem
                      component={Link}
                      to={dashboardPath}
                      onClick={() => setAnchorEl(null)}
                      sx={{
                        borderRadius: 2,
                        fontSize: "0.85rem",
                        gap: 1,
                        my: 0.25,
                      }}
                    >
                      <DashboardIcon fontSize="small" /> Dashboard
                    </MenuItem>
                  )}

                  <MenuItem
                    component={Link}
                    to="/account"
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      borderRadius: 2,
                      fontSize: "0.85rem",
                      gap: 1,
                      my: 0.25,
                    }}
                  >
                    <PersonIcon fontSize="small" /> Account Settings
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />

                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      borderRadius: 2,
                      fontSize: "0.85rem",
                      color: "var(--color-danger)",
                      gap: 1,
                    }}
                  >
                    <ExitToAppIcon fontSize="small" /> Sign Out
                  </MenuItem>
                </Menu>
              </>
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

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{ sx: { width: 280, borderRadius: "0 16px 16px 0" } }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: 2,
          }}
        >
          {/* Drawer header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DirectionsCarIcon sx={{ color: "#0D2B45", fontSize: 22 }} />
              <Typography
                sx={{ fontWeight: 800, fontSize: "1rem", color: "#0D2B45" }}
              >
                AutoConnect
              </Typography>
            </Box>
            <IconButton onClick={closeDrawer} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* User profile card (if logged in) */}
          {user && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1.5,
                mb: 2,
                borderRadius: 3,
                backgroundColor: "#f5f7fa",
                border: "1px solid var(--color-border)",
              }}
            >
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{ width: 44, height: 44 }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: "#0D2B45",
                  }}
                  noWrap
                >
                  {user.name}
                </Typography>
                <Typography
                  sx={{ fontSize: "0.72rem", color: "var(--color-muted)" }}
                  noWrap
                >
                  {user.email}
                </Typography>
                <Chip
                  label={getRoleLabel(user.role)}
                  size="small"
                  sx={{
                    mt: 0.5,
                    fontSize: "0.62rem",
                    height: 18,
                    backgroundColor: `${getRoleColor(user.role)}18`,
                    color: getRoleColor(user.role),
                    fontWeight: 700,
                  }}
                />
              </Box>
            </Box>
          )}

          <Divider sx={{ mb: 1.5 }} />

          {/* Nav links */}
          <List disablePadding sx={{ flex: 1 }}>
            {publicLinks.map((l) => {
              const active = pathname === l.to;
              return (
                <ListItem key={l.to} disablePadding sx={{ mb: 0.5 }}>
                  <Link
                    to={l.to}
                    onClick={closeDrawer}
                    style={{ textDecoration: "none", width: "100%" }}
                  >
                    <Box
                      sx={{
                        px: 2,
                        py: 1.2,
                        borderRadius: 2,
                        backgroundColor: active ? "#0D2B4512" : "transparent",
                        color: active ? "#0D2B45" : "#555",
                        fontWeight: active ? 700 : 500,
                        fontSize: "0.9rem",
                        transition: "background 0.15s",
                        "&:hover": { backgroundColor: "#f0f2f5" },
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      {l.label}
                    </Box>
                  </Link>
                </ListItem>
              );
            })}

            {/* Dashboard link — mechanic & admin only */}
            {dashboardPath && (
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <Link
                  to={dashboardPath}
                  onClick={closeDrawer}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 1.2,
                      borderRadius: 2,
                      backgroundColor:
                        pathname === dashboardPath
                          ? "#0D2B4512"
                          : "transparent",
                      color: pathname === dashboardPath ? "#0D2B45" : "#555",
                      fontWeight: pathname === dashboardPath ? 700 : 500,
                      fontSize: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <DashboardIcon fontSize="small" /> Dashboard
                  </Box>
                </Link>
              </ListItem>
            )}

            {/* Account settings — logged in only */}
            {user && (
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <Link
                  to="/account"
                  onClick={closeDrawer}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 1.2,
                      borderRadius: 2,
                      backgroundColor:
                        pathname === "/account" ? "#0D2B4512" : "transparent",
                      color: pathname === "/account" ? "#0D2B45" : "#555",
                      fontWeight: pathname === "/account" ? 700 : 500,
                      fontSize: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <PersonIcon fontSize="small" /> Account Settings
                  </Box>
                </Link>
              </ListItem>
            )}
          </List>

          <Divider sx={{ my: 1.5 }} />

          {/* Bottom actions */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {user ? (
              <Button
                variant="outlined"
                color="error"
                fullWidth
                startIcon={<ExitToAppIcon />}
                onClick={() => {
                  closeDrawer();
                  handleLogout();
                }}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  component={Link}
                  to="/login"
                  onClick={closeDrawer}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={Link}
                  to="/get-started"
                  onClick={closeDrawer}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Get Started
                </Button>
              </>
            )}
            <Button
              variant="outlined"
              color="error"
              fullWidth
              startIcon={<WarningAmberIcon />}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
            >
              Emergency
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
