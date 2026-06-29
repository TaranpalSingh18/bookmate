import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../api/auth";

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const res = await login(form);

            localStorage.setItem("token", res.data.access_token);
            if (res.data.user_id) {
                localStorage.setItem("user_id", res.data.user_id);
            }

            alert("Logged In");
            console.log(res.data);

            // If we came from a protected action, go back there. Otherwise go to events.
            const redirectTo =
                location.state?.from?.pathname &&
                location.state.from.pathname !== "/login"
                    ? location.state.from.pathname
                    : "/events";
            navigate(redirectTo, { replace: true });

        } catch (error) {
            console.log(error.response?.data);
            alert("Login Failed");
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
                            Smart queue management for events, bookings and more – skip the chaos, keep the line moving.
                        </p>
                    </div>
                    <div className="mt-10 space-y-3 text-sm text-red-50/90">
                        <p className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-red-50" />
                            Real‑time line tracking
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-red-50" />
                            Smart notifications for your turn
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-red-50" />
                            Designed for busy venues
                        </p>
                    </div>
                    <p className="mt-6 text-[11px] text-red-50/80">
                        Secure, privacy‑first – your data stays with you.
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
                            Welcome back
                        </h2>
                        <p className="text-sm text-gray-400 mt-2">
                            Login to access your bookings, events and live queue updates.
                        </p>
                    </div>

                    <div className="space-y-5">
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
                                onChange={handleChange}
                                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/80 transition"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Password
                                </label>
                                <button
                                    type="button"
                                    className="text-xs text-gray-400 hover:text-red-400 transition"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                onChange={handleChange}
                                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/80 transition"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full rounded-xl bg-red-600 py-3 text-sm md:text-base text-white font-semibold shadow-lg shadow-red-600/40 hover:bg-red-500 hover:shadow-red-500/40 transition duration-200"
                        >
                            Login
                        </button>
                    </div>

                    <p className="mt-6 text-center text-xs md:text-sm text-gray-400">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="text-red-400 hover:text-red-300 font-semibold"
                        >
                            Create one now
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;