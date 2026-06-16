/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Alert, Divider } from "@mui/material"
import AuthLayout from "../../components/auth/AuthLayout"
import AuthInput  from "../../components/auth/AuthInput"
import BuildIcon from "@mui/icons-material/Build"

const empty = { name: "", email: "", password: "", confirm: "" }

export default function MechanicSignUp() {
  const navigate = useNavigate()
  const [form,    setForm]    = useState(empty)
  const [error,   setError]   = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (form.password !== form.confirm) {
      setError("Passwords do not match.")
      return
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate("/")
    }, 1200)
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
            Join as a Specialist
          </h1>
        </div>
      </div>
      <p className="text-sm text-muted mb-8">
        Reach more customers and grow your automotive business.
      </p>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <AuthInput
          label="Confirm Password"
          name="confirm"
          type="password"
          value={form.confirm}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <p className="text-xs text-muted -mt-1">
          Must be at least 8 characters.
        </p>

        {/* Terms note */}
        <p className="text-xs text-muted bg-surface rounded-xl px-4 py-3 border border-border">
          By creating an account you agree to our{" "}
          <Link to="#" className="text-primary font-semibold no-underline hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link to="#" className="text-primary font-semibold no-underline hover:underline">Privacy Policy</Link>.
          Mechanics are subject to a verification process before going live.
        </p>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ py: 1.4, borderRadius: "12px", mt: 1, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
        >
          {loading ? "Creating account…" : "Create Mechanic Account"}
        </Button>
      </form>

      <Divider sx={{ my: 3, fontSize: "0.75rem", color: "#6B7280" }}>or</Divider>

      <p className="text-sm text-center text-muted">
        Already have an account?{" "}
        <Link to="/mechanic/sign-in" className="text-primary font-semibold hover:underline no-underline">
          Sign In
        </Link>
      </p>

      <p className="text-xs text-center text-muted/60 mt-4">
        Are you a vehicle owner?{" "}
        <Link to="/owner/sign-up" className="text-muted hover:text-primary no-underline">
          Register as Owner
        </Link>
      </p>
    </AuthLayout>
  )
}