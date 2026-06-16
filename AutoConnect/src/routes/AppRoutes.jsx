/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import HomePage           from "../pages/HomePage";
import AboutPage          from "../pages/AboutPage";
import FindMechanics      from "../pages/FindMechanics";
import HowItWorks         from "../pages/HowItWorks";
import ContactPage        from "../pages/ContactPage";
import OnboardingPage     from "../pages/OnboardingPage";
import OwnerDashboard     from "../pages/dashboards/OwnerDashboard";
import MechanicDashboard  from "../pages/dashboards/MechanicDashboard";
import AdminDashboard     from "../pages/dashboards/AdminDashboard";
import Navbar             from "../components/common/Navbar";
import Footer             from "../components/common/Footer";

// Redirects unauthenticated users to /get-started
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/get-started" replace />;
}

// Redirects users who don't have the required role
function RoleRoute({ children, roles }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/get-started" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth / Onboarding — no layout */}
      <Route path="/get-started" element={<OnboardingPage />} />

      {/* Protected dashboards — no public Navbar/Footer */}
      <Route path="/dashboard/mechanic" element={
        <RoleRoute roles={["mechanic"]}>
          <MechanicDashboard />
        </RoleRoute>
      } />
      <Route path="/dashboard/owner" element={
        <RoleRoute roles={["owner"]}>
          <OwnerDashboard />
        </RoleRoute>
      } />
      <Route path="/dashboard/admin" element={
        <RoleRoute roles={["admin"]}>
          <AdminDashboard />
        </RoleRoute>
      } />

      {/* Public pages — shared Navbar + Footer layout */}
      <Route path="/*" element={
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/"               element={<HomePage />}      />
              <Route path="/about"          element={<AboutPage />}     />
              <Route path="/find-mechanics" element={<FindMechanics />} />
              <Route path="/how-it-works"   element={<HowItWorks />}    />
              <Route path="/contact"        element={<ContactPage />}   />
              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      } />
    </Routes>
  );
}