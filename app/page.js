import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source") || "direct";
    const medium = params.get("utm_medium") || "";
    const campaign = params.get("utm_campaign") || "";

    const val = [source, medium, campaign].filter(Boolean).join("|");

    setTimeout(() => {
      const el = document.getElementById("source");
      if (el) el.value = val;
    }, 300);
  }, []);
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* HERO */}
      <section className="px-6 py-16 text-center">
        <img
          src="/logo-dark.2504111458271.png"
          alt="Icon Roofing Group"
          className="mx-auto mb-6 w-48"
        />
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Roof Repair in Orlando
          <br />
          <span className="text-red-500">Done Fast. Done Right.</span>
        </h1>

        <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto">
          Leaks, storm damage, or urgent roof issues? Call now and speak
          directly with a local roofing expert. Fast response. No waiting.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {/* CALL BUTTON */}
          <a
            href="tel:+14074769166"
            className="bg-red-500 hover:bg-red-400 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-red-500/30"
          >
            📞 Call Now – Free Estimate
          </a>

          {/* FORM SCROLL */}
          <a
            href="#form"
            className="border border-white/20 px-8 py-4 rounded-xl text-lg hover:bg-white/10"
          >
            Get Free Quote
          </a>
        </div>

        <p className="mt-4 text-sm text-white/60">
          Powered by Icon Roofing Group • Licensed #: c1332825 • Serving Central
          Florida © 2026 All Rights Reserved.
        </p>
      </section>

      {/* TRUST */}
      <section className="px-6 py-12 text-center border-t border-white/10">
        <p className="text-white/60 text-sm">
          ✔ Licensed & Insured • ✔ Orlando Area • ✔ Fast Response
        </p>
      </section>

      {/* SERVICES */}
      <section className="px-6 py-16 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {["Roof Leak Repair", "Shingle Replacement", "Storm Damage Repair"].map(
          (item) => (
            <div
              key={item}
              className="border border-white/10 p-6 rounded-xl bg-neutral-900"
            >
              <h3 className="text-lg font-semibold">{item}</h3>
            </div>
          ),
        )}
      </section>

      {/* FORM */}
      <section id="form" className="px-6 py-16 bg-white/5">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-semibold text-center">
            Get a Free Roofing Estimate
          </h2>

          <form
            action="https://formspree.io/f/meevgapa"
            method="POST"
            className="mt-8 flex flex-col gap-4"
          >
            <input type="hidden" name="source" id="source" />

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="p-4 rounded-lg bg-black/40 border border-white/10"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="p-4 rounded-lg bg-black/40 border border-white/10"
              required
            />

            <textarea
              name="message"
              placeholder="Describe your roofing issue"
              className="p-4 rounded-lg bg-black/40 border border-white/10"
              rows="4"
            />

            <button
              type="submit"
              className="bg-red-500 py-4 rounded-lg font-semibold hover:bg-red-400"
            >
              Request Quote
            </button>
          </form>
        </div>
      </section>
      {/* STICKY CALL BUTTON */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <a
          href="sms:+14074769166"
          className="bg-white text-black px-6 py-4 rounded-full shadow-xl text-lg font-semibold"
        >
          💬 Text
        </a>

        <a
          href="tel:+14074769166"
          className="bg-red-500 hover:bg-red-400 text-white px-6 py-4 rounded-full shadow-xl text-lg font-semibold"
        >
          📞 Call Now — 24/7
        </a>
      </div>
      {/* FOOTER */}
      <section className="px-6 py-12 border-t border-white/10 text-center">
        {/* LOGO */}
        <img
          src="/logo-dark.2504111458271.png"
          alt="Icon Roofing Group"
          className="mx-auto mb-6 w-40 opacity-90"
        />

        {/* TRUST BADGES */}
        {/* TRUST IMAGE */}
        <img
          src="/trust.png"
          alt="Roofing certifications"
          className="mx-auto w-full max-w-3xl opacity-90"
        />

        <p className="mt-6 text-sm text-white/50">
          Trusted Roofing Contractors in Orlando • Fully Licensed & Insured
        </p>
      </section>
    </main>
  );
}
