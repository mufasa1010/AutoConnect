/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Alert, Divider } from "@mui/material"
import AuthLayout from "../../components/auth/AuthLayout"
import AuthInput  from "../../components/auth/AuthInput"
import LocationOnIcon from "@mui/icons-material/LocationOn"

const empty = { name: "", email: "", password: "", confirm: "" }

export default function OwnerSignUp() {
  const navigate = useNavigate()
  const [form,   setForm]   = useState(empty)
  const [error,  setError]  = useState("")
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
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      navigate("/")
    }, 1200)
  }

  return (
    <AuthLayout role="owner" backTo="/get-started" backLabel="Back to role selection">

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <LocationOnIcon sx={{ color: "#0D2B45", fontSize: 22 }} />
        </div>
        <div>
          <p className="text-xs text-muted font-semibold uppercase tracking-wide">Vehicle Owner</p>
          <h1 className="text-2xl font-heading font-extrabold text-primary leading-tight">
            Create your account
          </h1>
        </div>
      </div>
      <p className="text-sm text-muted mb-8">
        Find verified mechanics near you in minutes.
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

        {/* Password hint */}
        <p className="text-xs text-muted -mt-1">
          Must be at least 8 characters.
        </p>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ py: 1.4, borderRadius: "12px", mt: 1, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
        >
          {loading ? "Creating account…" : "Create Account"}
        </Button>
      </form>

      <Divider sx={{ my: 3, fontSize: "0.75rem", color: "#6B7280" }}>or</Divider>

      <p className="text-sm text-center text-muted">
        Already have an account?{" "}
        <Link to="/owner/sign-in" className="text-primary font-semibold hover:underline no-underline">
          Sign In
        </Link>
      </p>

      <p className="text-xs text-center text-muted/60 mt-4">
        Are you a mechanic?{" "}
        <Link to="/mechanic/sign-up" className="text-muted hover:text-primary no-underline">
          Register as Mechanic
        </Link>
      </p>
    </AuthLayout>
  )
}