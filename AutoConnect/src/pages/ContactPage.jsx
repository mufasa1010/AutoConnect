/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon      from "@mui/icons-material/Email";
import PhoneIcon      from "@mui/icons-material/Phone";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="hero-gradient text-white py-20 px-4 text-center">
        <div className="container-app max-w-xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-3">Contact Us</h1>
          <p className="text-white/75">Have a question or feedback? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-app grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Info */}
          <div>
            <h3 className="text-xl font-extrabold mb-6">Get in Touch</h3>
            <div className="flex flex-col gap-5">
              {[
                { Icon: LocationOnIcon, label: "Address", val: "University Street, Molyko, Buea, SW Region, Cameroon" },
                { Icon: EmailIcon,      label: "Email",   val: "hello@autoconnect.cm"  },
                { Icon: PhoneIcon,      label: "Phone",   val: "+237 6XX XXX XXX"      },
              ].map(({ Icon, label, val }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Icon sx={{ fontSize: 20 }} />
                  </div>
                  <div>
                    <div className="text-xs text-muted font-semibold uppercase tracking-wide">{label}</div>
                    <div className="text-sm text-primary font-medium mt-0.5">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="card p-8">
            <h3 className="text-xl font-extrabold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <TextField label="Full Name"      variant="outlined" size="small" fullWidth required />
              <TextField label="Email Address"  variant="outlined" size="small" fullWidth required type="email" />
              <TextField label="Subject"        variant="outlined" size="small" fullWidth />
              <TextField label="Message"        variant="outlined" size="small" fullWidth required multiline rows={4} />
              <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Snackbar open={sent} autoHideDuration={4000} onClose={() => setSent(false)}>
        <Alert severity="success" onClose={() => setSent(false)}>Message sent! We'll get back to you soon.</Alert>
      </Snackbar>
    </>
  );
}