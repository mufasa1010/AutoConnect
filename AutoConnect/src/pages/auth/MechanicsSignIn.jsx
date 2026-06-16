/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Alert, Divider, Checkbox, FormControlLabel } from "@mui/material"
import AuthLayout from "../../components/auth/AuthLayout"
import AuthInput  from "../../components/auth/AuthInput"
import BuildIcon from "@mui/icons-material/Build"

const empty = { email: "", password: "" }

export default function MechanicSignIn() {
  const navigate  = useNavigate()
  const [form,     setForm]     = useState(empty)
  const [error,    setError]    = useState("")
  const [remember, setRemember] = useState(false)
  const [loading,  setLoading]  = useState(false)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!form.email || !form.password) {
      setError("Please fill in all fields.")
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate("/")
    }, 1000)
  }

  return (
    <AuthLayout role="mechanic" backTo="/get-started" backLabel="Back to role selection">

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <BuildIcon sx={{ color: "#1DB954", fontSize: 22 }} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1DB954" }}>
            Mechanic
          </p>
          <h1 className="text-2xl font-heading font-extrabold text-primary leading-tight">
            Welcome back
          </h1>
        </div>
      </div>
      <p className="text-sm text-muted mb-8">
        Sign in to manage your jobs and connect with customers.
      </p>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <AuthInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between -mt-1">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                sx={{ color: "#1DB954", "&.Mui-checked": { color: "#1DB954" } }}
              />
            }
            label={<span className="text-xs text-muted">Remember me</span>}
          />
          <Link
            to="/forgot-password"
            className="text-xs text-primary font-semibold hover:underline no-underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ py: 1.4, borderRadius: "12px", mt: 1, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
        >
          {loading ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      <Divider sx={{ my: 3, fontSize: "0.75rem", color: "#6B7280" }}>or</Divider>

      <p className="text-sm text-center text-muted">
        Don't have an account?{" "}
        <Link to="/mechanic/sign-up" className="text-primary font-semibold hover:underline no-underline">
          Create Account
        </Link>
      </p>

      <p className="text-xs text-center text-muted/60 mt-4">
        Are you a vehicle owner?{" "}
        <Link to="/owner/sign-in" className="text-muted hover:text-primary no-underline">
          Sign in as Owner
        </Link>
      </p>
    </AuthLayout>
  )
}