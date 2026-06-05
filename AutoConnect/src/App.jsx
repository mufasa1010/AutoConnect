/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage        from "./pages/HomePage";
import AboutPage       from "./pages/AboutPage";
import FindMechanics   from "./pages/FindMechanics";
import HowItWorks      from "./pages/HowItWorks";
import ContactPage     from "./pages/ContactPage";
import OnboardingPage  from "./pages/OnboardingPage";
import Navbar          from "./components/common/Navbar";
import Footer          from "./components/common/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Full-page route (no navbar/footer) */}
        <Route path="/get-started" element={<OnboardingPage />} />

        {/* Routes with shared layout */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"              element={<HomePage />}      />
          <Route path="/about"         element={<AboutPage />}     />
          <Route path="/find-mechanics" element={<FindMechanics />} />
          <Route path="/how-it-works"  element={<HowItWorks />}    />
          <Route path="/contact"       element={<ContactPage />}   />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}