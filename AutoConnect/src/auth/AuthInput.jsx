/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import VisibilityIcon    from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

export default function AuthInput({ type = "text", label, name, value, onChange, required, autoComplete }) {
  const [show, setShow] = useState(false)
  const isPassword = type === "password"

  return (
    <TextField
      label={label}
      name={name}
      type={isPassword ? (show ? "text" : "password") : type}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
      variant="outlined"
      size="small"
      fullWidth
      InputProps={
        isPassword
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShow((s) => !s)} edge="end" size="small">
                    {show ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9rem",
        },
        "& .MuiInputLabel-root": {
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9rem",
        },
      }}
    />
  )
}