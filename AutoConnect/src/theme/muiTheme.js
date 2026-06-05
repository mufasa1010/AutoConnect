import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  palette: {
    primary:   { main: "#0D2B45", dark: "#091e30", light: "#1a4a6e", contrastText: "#fff" },
    secondary: { main: "#1DB954", dark: "#17a348", contrastText: "#fff" },
    error:     { main: "#E53935" },
    background:{ default: "#F5F6F8", paper: "#FFFFFF" },
    text:      { primary: "#0D2B45", secondary: "#6B7280" },
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h1: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 },
    h2: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 },
    h4: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 },
    h5: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 },
    button: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, textTransform: "none" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": { boxShadow: "0 4px 14px rgba(0,0,0,0.15)" },
        },
        containedPrimary: {
          background: "#0D2B45",
          "&:hover": { background: "#091e30" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          "&:hover": { boxShadow: "0 8px 28px rgba(0,0,0,0.14)" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 99, fontFamily: "'DM Sans', sans-serif" },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: "0 1px 0 #E5E7EB", background: "#ffffff", color: "#0D2B45" },
      },
    },
  },
});

export default muiTheme;