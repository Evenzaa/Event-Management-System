import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/common/Button";
import { authService } from "../../services/authService";

export default function Signup() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

if (token) {
  return <Navigate to="/" replace />;
}

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", password: "",
    role: "user", agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (error) setError("");
  };

  const passwordStrength = () => {
    const p = formData.password;
    if (p.length < 6) return 1;
    if (p.length < 10) return 2;
    return /[A-Z]/.test(p) && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p) ? 4 : 3;
  };

  const strengthColor = (i) => {
    const s = passwordStrength();
    if (s < i) return "bg-gray-200";
    if (s === 1) return "bg-red-500";
    if (s === 2) return "bg-yellow-400";
    return "bg-green-500";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) { setError("Please accept Terms & Conditions"); return; }
    setLoading(true);
    setError("");
    try {
      await authService.register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      navigate("/check-email", { state: { email: formData.email } });
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const ROLES = [
    {
      id: "user", title: "Attend Events", sub: "Find & book events",
      icon: (
        <svg className="mx-auto mb-2 h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      ),
    },
    {
      id: "organizer", title: "Host Events", sub: "Create & manage events",
      icon: (
        <svg className="mx-auto mb-2 h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <AuthLayout variant="image">
      <div className="w-full">
        <h1 className="text-4xl font-bold text-gray-900">Create your account</h1>
        <p className="mt-2 mb-8 text-gray-500 italic">Start discovering amazing events today</p>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>
        )}

        {/* Google */}
        <button type="button" onClick={() => authService.googleLogin()}
          className="mb-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-3.5 font-medium text-gray-700 transition hover:bg-gray-50">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm italic text-gray-400">or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role selector */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700">I want to...</label>
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map((opt) => (
                <button key={opt.id} type="button"
                  onClick={() => setFormData((p) => ({ ...p, role: opt.id }))}
                  className={`rounded-2xl border p-4 text-center transition-all hover:shadow-sm ${
                    formData.role === opt.id
                      ? "border-violet-500 bg-violet-50"
                      : "border-gray-200 hover:border-violet-300"
                  }`}>
                  <span className={formData.role === opt.id ? "text-violet-600" : "text-gray-400"}>
                    {opt.icon}
                  </span>
                  <p className={`text-sm font-semibold ${formData.role === opt.id ? "text-violet-700" : "text-gray-800"}`}>
                    {opt.title}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500 italic">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            {[{ name: "firstName", label: "First Name", ph: "John" }, { name: "lastName", label: "Last Name", ph: "Doe" }].map((f) => (
              <div key={f.name}>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">{f.label}</label>
                <input name={f.name} value={formData[f.name]} onChange={handleChange}
                  placeholder={f.ph} required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100" />
              </div>
            ))}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="you@example.com" required
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100" />
          </div>

          {/* Password with show/hide */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password"
                value={formData.password} onChange={handleChange}
                placeholder="Create a strong password" required
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100" />
              <button type="button" onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {/* Strength bars */}
            <div className="mt-3 flex gap-1.5">
              {[1,2,3,4].map((i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${formData.password ? strengthColor(i) : "bg-gray-200"}`} />
              ))}
            </div>
          </div>

          {/* Agree */}
          <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
            <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded accent-violet-600 cursor-pointer" />
            <span className="italic">
              I agree to the{" "}
              <Link to="#" className="font-semibold text-violet-600 not-italic hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link to="#" className="font-semibold text-violet-600 not-italic hover:underline">Privacy Policy</Link>
            </span>
          </label>

          <Button type="submit" className="w-full py-3.5" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="pt-1 text-center text-sm italic text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-violet-600 not-italic hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
