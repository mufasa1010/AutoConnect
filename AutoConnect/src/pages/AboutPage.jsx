/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FlashOnIcon from "@mui/icons-material/FlashOn";

const team = [
  { name: "Tande Lindy", role: "CEO & Co-founder",      img: "/WhatsApp Image 2026-06-16 at 14.22.44.jpeg" },
  { name: "Eyeni-Mbu Nyellie",        role: "Head of Product",       img: "/WhatsApp Image 2026-06-16 at 13.58.32.jpeg" },
  { name: "Abonkwe Princely",        role: "Chief Technology Officer",img: "/WhatsApp Image 2026-06-16 at 13.59.42.jpeg"},
  { name: "Amadou Mustapha",        role: "Operations Director",   img: "/WhatsApp Image 2026-06-16 at 14.03.03.jpeg" },
  { name: "Atem Davinel",        role: "Operations Director",   img: "/WhatsApp Image 2026-06-16 at 14.08.26.jpeg" },
  { name: "Mesape Delalune",        role: "General Overseer",   img: "/WhatsApp Image 2026-06-16 at 14.05.36.jpeg" },
];

const values = [
  { icon: <VerifiedUserIcon />, title: "Reliability",    desc: "We vet every specialist on our platform to ensure they meet strict professional requirements." },
  { icon: <MonetizationOnIcon />, title: "Transparency", desc: "Upfront pricing and honest reviews mean no surprises during an emergency."                   },
  { icon: <FlashOnIcon />,      title: "Efficiency",    desc: "Our smart dispatch system finds the closest available help to keep you moving faster."         },
];

const faqs = [
  {
    q: "How do you verify mechanics?",
    a: "Every specialist must pass a 3-step verification: identity confirmation, workshop physical inspection, and technical skill testing by our lead engineers. Only the top 20% of applicants are approved.",
  },
  { q: "How does payment work?",         a: "Payment is handled securely in-app. You receive a full itemised invoice before any job begins. No hidden fees." },
  { q: "What happens if a repair is unsuccessful?", a: "We have a service guarantee. Report within 48 hours and we will arrange a free follow-up or full refund." },
];

export default function AboutPage() {
  const [expanded, setExpanded] = useState("faq0");

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient text-white py-24 px-4 text-center">
        <div className="container-app max-w-2xl mx-auto animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Empowering Buea's Drivers and Specialists.
          </h1>
          <p className="text-white/75 text-base mb-8">
            Building the most trusted automotive ecosystem in Cameroon, one roadside connection at a time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="contained" color="secondary" size="large">Learn More</Button>
            <Button variant="outlined" sx={{ color: "#fff", borderColor: "#fff", "&:hover": { background: "rgba(255,255,255,0.08)" } }} size="large">
              Join Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section bg-white">
        <div className="container-app grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-label">Our Story</p>
            <h2 className="text-3xl font-extrabold mb-4">Born from a simple need for reliability.</h2>
            <p className="text-muted leading-relaxed text-sm">
              In the bustling streets of Buea, we saw a recurring problem: drivers stranded without a
              reliable way to find verified help. AutoConnect was founded in 2023 to bridge the gap
              between skilled mechanics and drivers in need, creating a transparent marketplace where
              quality service is just a tap away.
            </p>
            <div className="mt-6 rounded-xl overflow-hidden h-52">
              <img
                src="https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=600&auto=format&fit=crop"
                alt="Workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="card p-6 bg-primary text-white">
              <TrackChangesIcon sx={{ mb: 1 }} />
              <h4 className="font-heading font-bold mb-2">Our Mission</h4>
              <p className="text-sm text-white/75">
                To create a seamless, technology-driven platform that connects drivers with the highest
                quality automotive specialists, ensuring safety and trust on every journey.
              </p>
            </div>
            <div className="card p-6 bg-accent text-white">
              <VisibilityIcon sx={{ mb: 1 }} />
              <h4 className="font-heading font-bold mb-2">Our Vision</h4>
              <p className="text-sm text-white/75">
                To become the standard for automotive service across West Africa, empowered by
                transparency and professional excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section-dark">
        <div className="container-app">
          <h2 className="text-3xl font-extrabold text-white text-center mb-3">The Values that Drive Us</h2>
          <p className="text-white/60 text-center text-sm mb-12 max-w-md mx-auto">
            We hold ourselves to the highest standards because your safety and your vehicle deserve nothing less.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="text-center flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                  {v.icon}
                </div>
                <h4 className="font-heading font-bold text-white">{v.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-surface">
        <div className="container-app">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label">Our Team</p>
              <h2 className="text-3xl font-extrabold">The minds behind the machinery.</h2>
            </div>
            <Button variant="outlined" color="primary">View Careers →</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-200">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover grayscale" />
                </div>
                <div>
                  <div className="font-heading font-bold text-sm text-primary">{m.name}</div>
                  <div className="text-xs text-muted">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-app max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-2">Got Questions?</h2>
          <p className="text-muted text-center text-sm mb-10">
            Everything you need to know about our verification and security protocols.
          </p>
          {faqs.map((f, i) => (
            <Accordion
              key={i}
              expanded={expanded === `faq${i}`}
              onChange={() => setExpanded(expanded === `faq${i}` ? false : `faq${i}`)}
              sx={{ mb: 1, borderRadius: "12px !important", "&:before": { display: "none" }, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <span className="font-heading font-semibold text-sm text-primary">{f.q}</span>
              </AccordionSummary>
              <AccordionDetails>
                <p className="text-sm text-muted leading-relaxed">{f.a}</p>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </section>
    </>
  );
}