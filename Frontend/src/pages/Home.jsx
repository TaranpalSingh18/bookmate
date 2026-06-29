import React, { useEffect } from "react";
import { get_all_events } from "../api/event";
import Hero from "./Hero";

const Home = () => {
  // Simulating navigate for artifact preview
  const navigate = (path) => console.log("Navigate to:", path);

  // useEffect( () => {
  //   const fetchEvents = async () => {
  //     try{
  //       const res = await get_all_events()
  //       console.log(res)

  //     }
  //     catch(error){
  //       console.log(error)
  //     }
  //   }
  //   fetchEvents()
  // }, [])



  return (
    <div className="min-h-screen bg-[#0a0c12] px-6 py-16 md:py-24">
      {/* Subtle radial glow behind hero */}
      
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-red-700/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-16 md:flex-row md:items-center md:justify-between md:gap-12">
        
        {/* Left — Copy */}
        <div className="flex flex-col items-center gap-7 text-center md:items-start md:text-left max-w-lg">
          
          {/* Eyebrow badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-red-300">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            Smart queue management
          </span>

          {/* Headline */}
          <h1 className="text-4xl md:text-[3.25rem] font-bold leading-[1.1] tracking-tight text-white">
            Skip the chaos,
            <br />
            keep every line{" "}
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              in control.
            </span>
          </h1>

          {/* Body */}
          <p className="text-[15px] leading-relaxed text-slate-400 max-w-sm">
            Bookmate manages event queues, bookings, and live wait times in one place. Attendees always know exactly when it's their turn.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/events")}
              className="rounded-full bg-red-600 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-700/40 hover:bg-red-500 active:scale-[0.97] transition-all duration-150"
            >
              View events
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="rounded-full border border-slate-700 bg-white/[0.03] px-7 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/[0.07] hover:border-slate-500 active:scale-[0.97] transition-all duration-150"
            >
              Sign up free
            </button>
          </div>

          {/* Social proof micro-copy */}
          <p className="text-xs text-slate-600 tracking-wide">
            Trusted at 200+ events · No credit card required
          </p>
        </div>

        {/* Right — Live queue card */}
        <div className="w-full max-w-[400px] shrink-0">
          {/* Outer glow ring */}
          <div className="rounded-[28px] p-[1px] bg-gradient-to-b from-slate-700/60 to-slate-800/20 shadow-[0_32px_80px_rgba(0,0,0,0.7)]">
            <div className="rounded-[27px] bg-slate-900/90 backdrop-blur-xl p-6 space-y-5">

              {/* Card header */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white tracking-tight">Live queue</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-800" />

              {/* Queue item */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700/40 px-4 py-4 flex items-center justify-between gap-4">
                <div className="space-y-0.5 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">Music Fest 2024</p>
                  <p className="text-[11px] text-slate-500 truncate">Central Arena · 120 people ahead</p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-500/15 border border-amber-400/20 px-3 py-1 text-[11px] font-semibold text-amber-300 whitespace-nowrap">
                  ~5 min
                </span>
              </div>

              {/* Secondary queue item (faded) */}
              <div className="rounded-2xl bg-slate-800/30 border border-slate-800/60 px-4 py-3.5 flex items-center justify-between gap-4 opacity-50">
                <div className="space-y-0.5 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">Jazz Night — VIP</p>
                  <p className="text-[11px] text-slate-500 truncate">Rooftop Stage · 34 people ahead</p>
                </div>
                <span className="shrink-0 rounded-full bg-slate-700/60 px-3 py-1 text-[11px] font-medium text-slate-400 whitespace-nowrap">
                  ~12 min
                </span>
              </div>

              {/* Footer hint */}
              <p className="text-[11px] text-slate-600 leading-relaxed">
                You'll get a notification the moment you're next — no refreshing, no guessing.
              </p>


            </div>
          </div>
        </div>

      </div>
      <Hero/>
    </div>
  );
};

export default Home;