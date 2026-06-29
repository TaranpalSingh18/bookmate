import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await signup(form);
      console.log(res.data);
      alert("Signup Successful");
      // After signup, go to login so user can log in and book
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-4xl rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.8)] grid md:grid-cols-2 overflow-hidden">
        {/* Brand / side panel */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-red-600/80 via-red-500/70 to-amber-400/70 p-10 text-white">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm">
              Bookmate
            </h1>
            <p className="mt-3 text-sm text-red-50/90 max-w-xs">
              Create your account and start managing queues and bookings with ease.
            </p>
          </div>
          <div className="mt-10 space-y-3 text-sm text-red-50/90">
            <p className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-red-50" />
              One place for all your events
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-red-50" />
              Live status of your turn
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-red-50" />
              Get notified when you are next
            </p>
          </div>
          <p className="mt-6 text-[11px] text-red-50/80">
            No spam, no overbooking – just smooth experiences.
          </p>
        </div>

        {/* Form panel */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="md:hidden flex items-center justify-center mb-8">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-400 flex items-center justify-center text-xl font-extrabold text-white shadow-lg">
              LM
            </div>
          </div>

          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-semibold text-white tracking-tight">
              Create your account
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Join Bookmate and keep all your bookings and queues in one place.
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/80 outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/80 outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/80 outline-none transition"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full rounded-xl bg-red-600 py-3 text-sm md:text-base font-semibold text-white shadow-lg shadow-red-600/40 hover:bg-red-500 hover:shadow-red-500/40 transition-all duration-200"
            >
              Create account
            </button>
          </div>

          <p className="mt-6 text-center text-xs md:text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-red-400 hover:text-red-300 font-semibold"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;