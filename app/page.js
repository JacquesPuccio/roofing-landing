"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const APPS_SCRIPT_URL = "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT";
const FORMSPREE       = "https://formspree.io/f/meevgapa";
const PHONE_HREF      = "tel:+14074769166";
const PHONE           = "(407) 476-9166";
const WA_HREF         = "https://wa.me/14074769166?text=Hi%2C%20I%20need%20a%20roofing%20estimate.";

function Stars() {
  return (
    <span className="text-yellow-400 text-lg">★★★★★</span>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 inline mr-1">
      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
    </svg>
  );
}

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-accent font-bold mt-0.5">✓</span>
      <span>{children}</span>
    </li>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left font-semibold text-white/90 hover:text-white"
      >
        <span>{q}</span>
        <span className={`faq-chevron text-accent text-xl transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && <p className="pb-4 text-white/70 text-sm leading-relaxed">{a}</p>}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [sending, setSending] = useState(false);
  const countersStarted = useRef(false);

  useEffect(() => {
    // UTM tracking
    const params = new URLSearchParams(window.location.search);
    const source   = params.get("utm_source")   || "direct";
    const medium   = params.get("utm_medium")   || "";
    const campaign = params.get("utm_campaign") || "";
    const val = [source, medium, campaign].filter(Boolean).join("|");
    setTimeout(() => {
      const el = document.getElementById("source");
      if (el) el.value = val;
    }, 300);

    // Scroll fade-in
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

    // Counter animation
    const counterObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted.current) {
          countersStarted.current = true;
          document.querySelectorAll("[data-count]").forEach((el) => {
            const target = parseInt(el.dataset.count, 10);
            const duration = 1800;
            const step = Math.ceil(target / (duration / 16));
            let current = 0;
            const timer = setInterval(() => {
              current = Math.min(current + step, target);
              el.textContent = current + (el.dataset.suffix || "");
              if (current >= target) clearInterval(timer);
            }, 16);
          });
        }
      },
      { threshold: 0.3 }
    );
    const statsSection = document.getElementById("stats-section");
    if (statsSection) counterObserver.observe(statsSection);

    return () => { observer.disconnect(); counterObserver.disconnect(); };
  }, []);

  function trackCall() {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "call_click", { event_category: "engagement", event_label: "call_now_button" });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    const form = e.target;
    const data = new FormData(form);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "form_submit", { event_category: "lead", event_label: "roofing_form" });
    }

    try {
      await fetch(FORMSPREE, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
    } catch (_) {}

    if (APPS_SCRIPT_URL !== "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT") {
      const params = new URLSearchParams();
      data.forEach((v, k) => params.append(k, v));
      try {
        await fetch(APPS_SCRIPT_URL, { method: "POST", mode: "no-cors", body: params });
      } catch (_) {}
    }

    setSending(false);
    setFormSent(true);
  }

  const faqs = [
    { q: "How quickly can you respond to an emergency leak?", a: "We offer same-day emergency service in the Orlando metro area. Call us at " + PHONE + " and we'll dispatch a team within hours." },
    { q: "Do you work with insurance companies?", a: "Yes — we work directly with Citizens, State Farm, Allstate, Heritage, Universal, and Farmers. We handle the paperwork and inspections so you don't have to." },
    { q: "What areas do you serve?", a: "We serve all of Orlando and Central Florida including Kissimmee, Sanford, Altamonte Springs, Oviedo, Winter Park, Maitland, Apopka, Clermont, Lake Mary, Longwood, and more." },
    { q: "Is your company licensed and insured?", a: "Absolutely. We are fully licensed (License #C1332825) and insured in the State of Florida. We are also GAF Master Elite certified and BBB accredited." },
    { q: "How much does a roof repair cost?", a: "Costs vary by damage type and scope. We provide free, no-obligation estimates. Most minor repairs range from $300–$900. Call or fill out the form for a precise quote." },
  ];

  return (
    <>
      {/* WhatsApp FAB */}
      <a
        id="wa-btn"
        href={WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-5 z-50 bg-green-500 hover:bg-green-400 text-white rounded-full shadow-lg shadow-green-500/40 w-14 h-14 flex items-center justify-center text-2xl"
        aria-label="WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7">
          <path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.8 6.4L3 29l6.8-1.8A13 13 0 0016 29c7.2 0 13-5.8 13-13S23.2 3 16 3zm6.4 18.1c-.3.8-1.5 1.5-2.1 1.6-.5.1-1.2.1-1.9-.1-.5-.2-1.1-.4-1.9-.8-3.3-1.4-5.4-4.8-5.6-5-.2-.2-1.4-1.9-1.4-3.6s.9-2.5 1.2-2.9c.3-.3.7-.4 1-.4h.7c.2 0 .5-.1.8.6l1 2.5c.1.2.1.5 0 .7l-.5.7-.3.4c.2.3.9 1.4 2 2.4 1.3 1.1 2.4 1.5 2.7 1.6.3.1.4 0 .6-.2l.7-.9c.2-.3.4-.2.7-.1l2.2 1c.3.1.5.2.5.3s.2.5-.1 1.2z" />
        </svg>
      </a>

      {/* Mobile sticky bottom bar */}
      <div id="sticky-bar" className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 gap-0 shadow-2xl">
        <a
          href={PHONE_HREF}
          onClick={trackCall}
          className="bg-accent text-white py-4 text-center font-bold text-sm flex items-center justify-center gap-2"
        >
          <PhoneIcon /> Call Now
        </a>
        <a
          href="#form"
          className="bg-brand text-white py-4 text-center font-bold text-sm flex items-center justify-center gap-2"
        >
          Free Quote
        </a>
      </div>

      {/* Mobile nav overlay */}
      <div id="mobile-nav" className={`fixed inset-0 z-50 bg-brand-dark flex flex-col items-center justify-center gap-8 text-xl font-semibold ${menuOpen ? "open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-5 text-white text-3xl">✕</button>
        {["#services", "#gallery", "#why-us", "#faq", "#form"].map((href) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-white hover:text-accent capitalize">
            {href.replace("#", "").replace("-", " ")}
          </a>
        ))}
        <a href={PHONE_HREF} onClick={trackCall} className="bg-accent text-white px-8 py-4 rounded-xl">
          <PhoneIcon />{PHONE}
        </a>
      </div>

      {/* Top bar */}
      <div className="bg-brand-dark text-white/80 text-xs py-2 px-4 text-center hidden md:block">
        <span className="blink text-green-400 font-semibold mr-2">●</span>
        Emergency Roofing Available 24/7 — Call <a href={PHONE_HREF} onClick={trackCall} className="font-bold text-white hover:text-accent">{PHONE}</a>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-brand shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top">
            <div className="bg-white rounded-lg px-3 py-1.5">
              <Image src="/logo-dark.2504111458271.png" alt="Icon Roofing Group" width={140} height={40} className="object-contain" />
            </div>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-white/80">
            <a href="#services" className="hover:text-accent">Services</a>
            <a href="#gallery" className="hover:text-accent">Gallery</a>
            <a href="#why-us" className="hover:text-accent">Why Us</a>
            <a href="#faq" className="hover:text-accent">FAQ</a>
          </div>
          <a href={PHONE_HREF} onClick={trackCall} className="hidden md:flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-bold text-sm">
            <PhoneIcon />{PHONE}
          </a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden text-white text-2xl p-2">☰</button>
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="bg-gradient-to-br from-brand-dark to-brand text-white pt-16 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-3">Orlando&apos;s #1 Rated Roofing Company</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Roof Repair in Orlando — <span className="text-accent">Done Fast. Done Right.</span>
            </h1>
            <p className="mt-5 text-white/80 text-lg leading-relaxed">
              Leaks, storm damage, or urgent roof issues? We respond within hours. Licensed, insured, and trusted by hundreds of Orlando homeowners.
            </p>
            <ul className="mt-6 space-y-2 text-white/90 text-sm">
              <CheckItem>Same-Day Emergency Service Available</CheckItem>
              <CheckItem>Free Roof Inspection & Written Estimate</CheckItem>
              <CheckItem>Works With All Major Insurance Companies</CheckItem>
              <CheckItem>GAF Master Elite + BBB Accredited</CheckItem>
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href={PHONE_HREF} onClick={trackCall} className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl font-bold text-lg text-center shadow-lg shadow-accent/30">
                <PhoneIcon />Call Now — Free Estimate
              </a>
              <a href="#form" className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg text-center">
                Get Written Quote
              </a>
            </div>
            <p className="mt-4 text-xs text-white/50">License #C1332825 • Serving Orlando & Central Florida</p>
          </div>

          {/* Form */}
          <div id="form" className="bg-white text-gray-800 rounded-2xl shadow-2xl p-8 fade-up">
            {formSent ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-brand mb-2">Request Sent!</h3>
                <p className="text-gray-600">We&apos;ll call you within 30 minutes. For immediate help:</p>
                <a href={PHONE_HREF} onClick={trackCall} className="mt-4 inline-block bg-accent text-white px-6 py-3 rounded-xl font-bold">
                  <PhoneIcon />{PHONE}
                </a>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-brand mb-1">Get Your Free Roof Estimate</h2>
                <p className="text-gray-500 text-sm mb-6">Response within 30 minutes • No obligation</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input type="hidden" name="source" id="source" />
                  <input type="text" name="name" placeholder="Full Name *" required className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
                  <input type="tel" name="phone" placeholder="Phone Number *" required className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
                  <input type="email" name="email" placeholder="Email Address" className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
                  <input type="text" name="address" placeholder="Property Address" className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
                  <select name="service" className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/30">
                    <option value="">Select Service...</option>
                    <option>Roof Leak Repair</option>
                    <option>Storm Damage Repair</option>
                    <option>Shingle Replacement</option>
                    <option>Full Roof Replacement</option>
                    <option>Free Inspection</option>
                    <option>Insurance Claim Help</option>
                  </select>
                  <textarea name="message" placeholder="Describe the issue (optional)" rows={3} className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
                  <button type="submit" disabled={sending} className="bg-accent hover:bg-accent-dark text-white py-4 rounded-xl font-bold text-lg disabled:opacity-60">
                    {sending ? "Sending…" : "Request Free Estimate →"}
                  </button>
                  <p className="text-center text-xs text-gray-400">No spam. We call you — no obligation.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 opacity-80">
          <Image src="/gaf.png" alt="GAF Certified" width={80} height={40} className="h-10 w-auto object-contain" />
          <Image src="/certainteed.png" alt="CertainTeed" width={120} height={40} className="h-10 w-auto object-contain" />
          <Image src="/bbb.png" alt="BBB Accredited" width={60} height={40} className="h-10 w-auto object-contain" />
          <Image src="/master.png" alt="Master Certified" width={80} height={40} className="h-10 w-auto object-contain" />
          <Image src="/gafcertified.png" alt="GAF Certified Contractor" width={80} height={40} className="h-10 w-auto object-contain" />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-4 bg-brand-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">What We Fix</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand">Our Roofing Services</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "💧", title: "Roof Leak Repair", desc: "Stop leaks fast before they cause structural damage. We find the source and fix it right the first time." },
              { icon: "🌩️", title: "Storm Damage Repair", desc: "Hurricane, hail, or wind damage? We restore your roof quickly and help you file your insurance claim." },
              { icon: "🏠", title: "Shingle Replacement", desc: "Missing, cracked, or curling shingles? We replace them with high-quality materials that last 20+ years." },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow fade-up">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold text-brand mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                <a href="#form" className="mt-5 inline-block text-accent font-semibold text-sm hover:underline">Get a Free Quote →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance companies strip */}
      <section className="bg-brand py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-6">We Work With Your Insurance</p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-white font-bold text-lg opacity-80">
            {["Citizens", "State Farm", "Allstate", "Heritage", "Universal", "Farmers"].map((ins) => (
              <span key={ins} className="bg-white/10 rounded-lg px-5 py-2 text-sm">{ins}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">Our Work</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand">Recent Projects in Orlando</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { src: "https://placehold.co/600x400/1e3a5f/ffffff?text=Roof+Repair+1", alt: "Roof leak repair Orlando" },
              { src: "https://placehold.co/600x400/0d1f35/ffffff?text=Storm+Damage+2", alt: "Storm damage repair Orlando" },
              { src: "https://placehold.co/600x400/1e3a5f/ffffff?text=Shingle+Replace+3", alt: "Shingle replacement Orlando" },
            ].map((img) => (
              <div key={img.src} className="gallery-card rounded-2xl overflow-hidden shadow-lg fade-up">
                <img src={img.src} alt={img.alt} className="gallery-img w-full h-56 object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="py-20 px-4 bg-brand-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand">The Icon Roofing Difference</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⚡", title: "Same-Day Response", desc: "We dispatch within hours. Your roof emergency is our priority." },
              { icon: "🛡️", title: "Licensed & Insured", desc: "Fully licensed in Florida (#C1332825). You're fully protected." },
              { icon: "⭐", title: "5-Star Rated", desc: "Hundreds of 5-star reviews from Orlando homeowners." },
              { icon: "📋", title: "Free Estimates", desc: "No-obligation written estimates with transparent pricing." },
            ].map((w) => (
              <div key={w.title} className="bg-white rounded-2xl p-6 shadow-md text-center fade-up">
                <div className="text-4xl mb-3">{w.icon}</div>
                <h3 className="font-bold text-brand mb-2">{w.title}</h3>
                <p className="text-gray-600 text-sm">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2 fade-up">Simple Process</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand mb-12 fade-up">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Call or Fill the Form", desc: "Contact us by phone or the quote form. We respond in under 30 minutes." },
              { step: "2", title: "Free Inspection", desc: "We visit your property, assess the damage, and give you a written estimate at no cost." },
              { step: "3", title: "We Fix It Right", desc: "Our certified crew repairs your roof fast with quality materials and a workmanship warranty." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center fade-up">
                <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-extrabold mb-4 shadow-lg">{s.step}</div>
                <h3 className="font-bold text-brand text-lg mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-brand text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">Reviews</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">What Orlando Homeowners Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Maria G.", city: "Orlando, FL", text: "Called Icon Roofing after a huge storm. They were at my house within 2 hours and fixed the leak same day. Amazing service!" },
              { name: "Carlos R.", city: "Kissimmee, FL", text: "They handled everything with my insurance company. Zero stress. My roof looks brand new and the price was fair." },
              { name: "Jennifer T.", city: "Winter Park, FL", text: "Professional, fast, and honest. They gave me a detailed estimate and did exactly what they promised. Highly recommend!" },
            ].map((t) => (
              <div key={t.name} className="bg-white/10 rounded-2xl p-6 fade-up">
                <Stars />
                <p className="mt-3 text-white/80 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-4 font-bold text-sm">{t.name} <span className="text-white/50 font-normal">— {t.city}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="py-16 px-4 bg-brand-light">
        <div className="max-w-5xl mx-auto text-center fade-up">
          <h2 className="text-2xl font-extrabold text-brand mb-6">Serving All of Central Florida</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Orlando", "Kissimmee", "Sanford", "Altamonte Springs", "Oviedo", "Winter Park", "Maitland", "Apopka", "Clermont", "Lake Mary", "Longwood", "Deltona", "Daytona Beach", "Ocala", "St. Cloud"].map((city) => (
              <span key={city} className="bg-white rounded-full px-4 py-1.5 text-sm text-brand font-semibold shadow-sm">{city}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA with counters */}
      <section className="py-20 px-4 bg-accent text-white" id="stats-section">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 fade-up">Don&apos;t Let a Small Leak Become a Big Problem</h2>
          <p className="text-white/80 mb-10 fade-up">Every hour a leak goes unfixed, the damage gets worse. Call now for same-day service.</p>
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="fade-up">
              <p className="text-4xl font-extrabold" data-count="500" data-suffix="+">0+</p>
              <p className="text-white/80 text-sm mt-1">Roofs Repaired</p>
            </div>
            <div className="fade-up">
              <p className="text-4xl font-extrabold" data-count="98" data-suffix="%">0%</p>
              <p className="text-white/80 text-sm mt-1">Customer Satisfaction</p>
            </div>
            <div className="fade-up">
              <p className="text-4xl font-extrabold" data-count="24" data-suffix="/7">0/7</p>
              <p className="text-white/80 text-sm mt-1">Emergency Service</p>
            </div>
          </div>
          <a href={PHONE_HREF} onClick={trackCall} className="inline-block bg-white text-accent px-10 py-5 rounded-2xl font-extrabold text-xl shadow-xl hover:bg-brand-light">
            <PhoneIcon />Call {PHONE}
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand">Frequently Asked Questions</h2>
          </div>
          {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <div className="bg-white rounded-lg p-3 inline-block mb-4">
              <Image src="/logo-dark.2504111458271.png" alt="Icon Roofing Group" width={140} height={40} className="object-contain" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Orlando&apos;s trusted roofing experts. Licensed, insured, and certified. We fix roofs fast and right.
            </p>
            <p className="text-white/40 text-xs mt-3">License #C1332825</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>Roof Leak Repair</li>
              <li>Storm Damage Repair</li>
              <li>Shingle Replacement</li>
              <li>Full Roof Replacement</li>
              <li>Insurance Claim Assistance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <p className="text-white/60 text-sm mb-2">Orlando & Central Florida</p>
            <a href={PHONE_HREF} onClick={trackCall} className="text-accent font-bold text-lg hover:text-white block mb-2">
              <PhoneIcon />{PHONE}
            </a>
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="text-green-400 text-sm hover:text-white">
              WhatsApp →
            </a>
            <div className="flex flex-wrap gap-4 mt-6 opacity-70">
              <Image src="/gaf.png" alt="GAF" width={50} height={28} className="h-7 w-auto object-contain" />
              <Image src="/bbb.png" alt="BBB" width={40} height={28} className="h-7 w-auto object-contain" />
              <Image src="/master.png" alt="Master" width={50} height={28} className="h-7 w-auto object-contain" />
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-white/40 text-xs">
          © 2026 Icon Roofing Group — orlando-roofrepair.com — All Rights Reserved
        </div>
      </footer>
    </>
  );
}
