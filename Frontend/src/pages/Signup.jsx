import { useState } from "react";
import { signup } from "../api/auth";

const Signup = () => {
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
    } catch (err) {
      console.log(err);
      alert("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-[#1f2937] shadow-2xl border border-gray-700 p-8">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 rounded-2xl bg-red-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            B
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-white">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mt-2 mb-8">
          Join us and start booking your favourite events.
        </p>

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#374151] border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#374151] border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#374151] border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition"
          />

          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-red-600 py-3 text-lg font-semibold text-white hover:bg-red-700 transition-all duration-300"
          >
            Create Account
          </button>
        </div>

        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        <button className="w-full rounded-xl border border-gray-600 py-3 text-white hover:bg-gray-700 transition">
          Continue with Google
        </button>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <span className="cursor-pointer font-semibold text-red-500 hover:text-red-400">
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;