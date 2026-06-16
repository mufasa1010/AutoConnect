import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Alert,
  Fade,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
  PersonOutlined,
  PhoneOutlined,
  PhotoCamera,
} from "@mui/icons-material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useAuth } from "../context/AuthContext";

/**
 * AuthPage Component (Linked to Supabase)
 * 
 * A unified page handling both Sign In and Sign Up flows.
 * Displays a centered modal-like card, uses search/path parameters to sync state,
 * contains a small sliding toggle switch to shift modes dynamically,
 * and includes a premium custom profile picture file selector to demonstrate Supabase Storage.
 */
export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login, signup } = useAuth();

  // 1. DETERMINE MODE FROM URL
  // If the path is "/signup", we display the Sign Up form, otherwise we display Sign In.
  const isSignUp = location.pathname === "/signup";

  // 2. INPUT STATE VARIABLES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("owner"); // "owner" or "mechanic"
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Custom Avatar Upload states
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // Helper UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  // 3. EFFECT: HANDLE URL QUERY PARAMS & REMEMBERED EMAIL
  useEffect(() => {
    // If onboarding sent a role selection, pre-select it
    const roleParam = searchParams.get("role");
    if (roleParam === "owner" || roleParam === "mechanic") {
      setRole(roleParam);
    }
  }, [searchParams]);

  useEffect(() => {
    // Fill in remembered email if returning for Login
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail && !isSignUp) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, [isSignUp]);

  // Clear errors when toggling modes
  useEffect(() => {
    setErrors({});
    setSubmitError("");
    setSuccess(false);
    setAvatarFile(null);
    setAvatarPreview("");
  }, [isSignUp]);

  // phone number validation
  const validatePhone = (phoneNumber) => {
    // Strip non-numeric characters
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    
    // Cameroonian numbers are typically 9 digits, starting with 6 (mobile) or 2 (landline)
    // If the number contains 237 (country code), it might be 12 digits (e.g. 237699...)
    const isNineDigits = digitsOnly.length === 9 && (digitsOnly.startsWith("6") || digitsOnly.startsWith("2"));
    const isCountryCodeFormat = digitsOnly.length === 12 && digitsOnly.startsWith("237");
    
    return isNineDigits || isCountryCodeFormat;
  };

  // 5. CLIENT-SIDE VALIDATION
  const validate = () => {
    const tempErrors = {};

    // Validate email format
    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    // Validate password length
    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    // Extra validations for Signup mode only
    if (isSignUp) {
      if (!name.trim()) {
        tempErrors.name = "Full name is required";
      }
      if (!phone) {
        tempErrors.phone = "Phone number is required";
      } else if (!validatePhone(phone)) {
        tempErrors.phone = "Must be a valid Cameroon phone number (9 digits)";
      }
      if (password !== confirmPassword) {
        tempErrors.confirmPassword = "Passwords do not match";
      }
      if (!agreeTerms) {
        tempErrors.agreeTerms = "You must agree to the Terms of Service";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // 6. FORM SUBMISSION (Async for live database operations)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    if (isSignUp) {
      // Run Sign Up Flow (passing form parameters and file upload)
      const result = await signup(name, email, phone, password, role, avatarFile);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate("/"), 1500);
      } else {
        setSubmitError(result.error);
      }
    } else {
      // Run Sign In Flow
      const result = await login(email, password);
      if (result.success) {
        setSuccess(true);
        // Manage "Remember Me" local storage
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        setTimeout(() => navigate("/"), 1500);
      } else {
        setSubmitError(result.error);
      }
    }
  };

  // 7. GOOGLE / FACEBOOK SIGN-IN MOCK
  // In a full Supabase build, these can be linked to supabase.auth.signInWithOAuth()
  const handleSocialSignIn = () => {
    alert("Social Login Callback: In production, configure Supabase OAuth credentials under Authentication -> Providers.");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F5F6F8] relative overflow-hidden py-12 px-4">
      
      {/* Visual Accent Backgrounds (Glow elements) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#1DB954]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#0D2B45]/20 blur-[120px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8 z-10 animate-fade-up">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0D2B45] flex items-center justify-center shadow-md mb-3">
            <DirectionsCarIcon className="text-[#1DB954]" sx={{ fontSize: 28 }} />
          </div>
          <span className="font-heading font-extrabold text-2xl text-[#0D2B45] tracking-tight">AutoConnect</span>
          <p className="text-gray-500 text-xs mt-1 text-center font-body">
            {isSignUp ? "Create a Cameroon Automotive account" : "Access your automotive control panel"}
          </p>
        </div>

        {/* Small Toggle / Switch Button to easily alternate between forms */}
        <div className="flex bg-[#F5F6F8] p-1 rounded-xl mb-6 relative border border-gray-200/50">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg z-10 transition-all duration-200 ${
              !isSignUp 
                ? "bg-white text-[#0D2B45] shadow-sm" 
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg z-10 transition-all duration-200 ${
              isSignUp 
                ? "bg-white text-[#0D2B45] shadow-sm" 
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Action Success Alert */}
        {success && (
          <Fade in={success}>
            <Alert severity="success" className="mb-4 font-body text-xs">
              {isSignUp ? "Account created successfully! Logging you in..." : "Sign in successful! Redirecting..."}
            </Alert>
          </Fade>
        )}

        {/* Submission Error Alert */}
        {submitError && (
          <Fade in={!!submitError}>
            <Alert severity="error" className="mb-4 font-body text-xs">
              {submitError}
            </Alert>
          </Fade>
        )}

        {/* AUTHENTICATION FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* SIGN UP ONLY FIELDS */}
          {isSignUp && (
            <>
              {/* Profile Image Avatar Selector (Supabase Storage upload) */}
              <div className="flex flex-col items-center gap-1.5 mb-2">
                <span className="text-[11px] font-heading font-bold text-gray-500 uppercase tracking-wide">
                  Avatar Image (Uploads to Storage)
                </span>
                <div className="relative">
                  <Avatar
                    src={avatarPreview || ""}
                    alt="Upload Preview"
                    sx={{
                      width: 80,
                      height: 80,
                      border: "2px solid #0D2B45",
                      bgcolor: "var(--color-surface)",
                      color: "#0D2B45",
                      fontSize: "2rem",
                      fontWeight: 700,
                    }}
                  >
                    {name ? name.charAt(0).toUpperCase() : "?"}
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#0D2B45] hover:bg-[#091e30] border-2 border-white flex items-center justify-center cursor-pointer shadow-md transition-colors"
                  >
                    <PhotoCamera sx={{ color: "white", fontSize: 16 }} />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setAvatarFile(file);
                        setAvatarPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>
              </div>

              {/* Account Role Toggle */}
              <div className="flex flex-col gap-1.5 mb-1">
                <span className="text-[11px] font-heading font-bold text-gray-500 uppercase tracking-wide">
                  Register As:
                </span>
                <ToggleButtonGroup
                  color="primary"
                  value={role}
                  exclusive
                  onChange={(e, val) => val && setRole(val)}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiToggleButton-root": {
                      py: 0.8,
                      textTransform: "none",
                      fontFamily: "var(--font-heading)",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                    },
                  }}
                >
                  <ToggleButton value="owner">Vehicle Owner</ToggleButton>
                  <ToggleButton value="mechanic">Mechanic Pro</ToggleButton>
                </ToggleButtonGroup>
              </div>

              {/* Full Name */}
              <TextField
                label="Full Name"
                type="text"
                size="small"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                placeholder="e.g. Samuel Eto'o"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlined sx={{ color: "var(--color-muted)", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Phone Number */}
              <TextField
                label="Phone Number"
                type="tel"
                size="small"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone || "e.g., 677 88 99 00"}
                placeholder="6XX XX XX XX"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlined sx={{ color: "var(--color-muted)", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}

          {/* COMMON FIELDS (Sign In & Sign Up) */}
          <TextField
            label="Email Address"
            type="email"
            size="small"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            placeholder="e.g. name@example.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined sx={{ color: "var(--color-muted)", fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            size="small"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            placeholder="Min. 6 characters"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined sx={{ color: "var(--color-muted)", fontSize: 18 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                    {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* SIGN UP ONLY: Confirm Password */}
          {isSignUp && (
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              size="small"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              placeholder="Re-enter password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ color: "var(--color-muted)", fontSize: 18 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">
                      {showConfirmPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}

          {/* TERMS OR REMEMBER ME SUB-SECTION */}
          {isSignUp ? (
            // Terms and Conditions checkbox for signup
            <div className="flex flex-col">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    color="primary"
                    size="small"
                  />
                }
                label={
                  <span className="font-body text-xs text-gray-650">
                    I agree to the{" "}
                    <a href="#" className="font-bold underline" onClick={(e) => e.preventDefault()}>Terms</a>{" "}
                    and{" "}
                    <a href="#" className="font-bold underline" onClick={(e) => e.preventDefault()}>Privacy</a>.
                  </span>
                }
              />
              {errors.agreeTerms && (
                <span className="text-[11px] text-[#E53935] ml-7 font-body">{errors.agreeTerms}</span>
              )}
            </div>
          ) : (
            // Remember me and Forgot password for signin
            <div className="flex items-center justify-between text-xs mt-1">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                    size="small"
                  />
                }
                label={
                  <span className="font-body text-xs text-gray-700">Remember me</span>
                }
              />
              <Link
                to="#"
                className="text-[#0D2B45] font-semibold hover:underline no-underline"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password recovery placeholder: In a production setup, this would trigger an email recovery flow.");
                }}
              >
                Forgot Password?
              </Link>
            </div>
          )}

          {/* MAIN ACTION BUTTON */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              py: 1.2,
              mt: 1,
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              textTransform: "none",
              backgroundColor: "#0D2B45",
              "&:hover": {
                backgroundColor: "#091e30",
              }
            }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        {/* SOCIAL LOGINS */}
        <div className="flex items-center gap-3 my-5">
          <div className="h-[1px] bg-gray-200 flex-1" />
          <span className="text-[10px] text-gray-400 font-heading uppercase tracking-wider">
            Or use social
          </span>
          <div className="h-[1px] bg-gray-200 flex-1" />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outlined"
            fullWidth
            size="small"
            onClick={handleSocialSignIn}
            sx={{
              py: 1,
              textTransform: "none",
              fontSize: "0.8rem",
              borderColor: "var(--color-border)",
              color: "var(--color-primary)",
              "&:hover": {
                borderColor: "var(--color-primary)",
                backgroundColor: "rgba(13, 43, 69, 0.02)",
              },
            }}
            startIcon={
              <svg className="w-4 h-4 mr-0.5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 14.98 1 12 1 7.35 1 3.37 3.68 1.43 7.62l3.85 2.99C6.2 7.63 8.88 5.04 12 5.04z"
                />
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.58l3.77 2.92c2.2-2.03 3.68-5.02 3.68-8.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.78c-.26-.78-.41-1.61-.41-2.48s.15-1.7.41-2.48L1.43 6.83C.52 8.68 0 10.74 0 12.92s.52 4.24 1.43 6.09l3.85-2.99c-.26-.78-.41-1.61-.41-2.48z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.77-2.92c-1.1.74-2.52 1.18-4.19 1.18-3.12 0-5.8-2.59-6.72-5.57l-3.85 2.99C3.37 20.32 7.35 23 12 23z"
                />
              </svg>
            }
          >
            Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            onClick={handleSocialSignIn}
            sx={{
              py: 1,
              textTransform: "none",
              fontSize: "0.8rem",
              borderColor: "var(--color-border)",
              color: "var(--color-primary)",
              "&:hover": {
                borderColor: "var(--color-primary)",
                backgroundColor: "rgba(13, 43, 69, 0.02)",
              },
            }}
            startIcon={
              <svg className="w-4 h-4 mr-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            }
          >
            Facebook
          </Button>
        </div>

        {/* Back Link to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-gray-500 hover:text-[#0D2B45] font-body transition-colors">
            ← Back to home page
          </Link>
        </div>

      </div>
    </div>
  );
}
