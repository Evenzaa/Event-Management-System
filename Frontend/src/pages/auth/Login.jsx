import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/common/Button";
import { authService } from "../../services/authService";
import { Navigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  if (token) {
    return <Navigate to="/" replace />;
  }


  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) { setError(""); setNeedsVerification(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setNeedsVerification(false);
    setResendMessage("");
    try {
      const res = await authService.login(formData.email, formData.password);
      localStorage.setItem("authToken", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      const redirectPath =
      res.user.role === "organizer" ? "/organizer-dashboard" : "/";

    navigate(redirectPath, { replace: true });
    } catch (err) {
      const msg = err.message || "Login failed";
      setError(msg);
      if (msg.toLowerCase().includes("verify")) setNeedsVerification(true);
    } finally {
      setLoading(false);
    }
  };

  async function handleResend() {
    setResending(true);
    setResendMessage("");
    try {
      const res = await authService.forgotPassword(formData.email);
      setResendMessage(res.message || "Verification email sent!");
    } catch {
      setResendMessage("Failed to resend. Please try again.");
    } finally {
      setResending(false);
    }
  }

  return (
    <AuthLayout variant="image">
      <div className="w-full">
        <h1 className="text-4xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-2 mb-8 text-gray-500 italic">Sign in to your account to continue</p>

        {/* Verification warning */}
        {needsVerification && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm">
            <p className="font-semibold text-amber-800">Please verify your email first</p>
            <p className="mt-1 text-amber-700">
              Check your inbox for the link we sent to{" "}
              <span className="font-medium">{formData.email}</span>.
            </p>
            {resendMessage ? (
              <p className="mt-2 font-medium text-green-700">{resendMessage}</p>
            ) : (
              <button type="button" onClick={handleResend} disabled={resending}
                className="mt-3 font-semibold text-violet-600 hover:underline disabled:opacity-50 cursor-pointer">
                {resending ? "Sending..." : "Resend verification email →"}
              </button>
            )}
          </div>
        )}

        {error && !needsVerification && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Google */}
        <button type="button" onClick={() => authService.googleLogin()}
          className="mb-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-3.5 font-medium text-gray-700 transition hover:bg-gray-50">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
          Google
        </button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm italic text-gray-400">or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="you@example.com" required
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Password with show/hide */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Link to="/forgot-password" className="text-sm font-medium text-violet-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} name="password" value={formData.password}
                onChange={handleChange} placeholder="Enter your password" required
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
              />
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
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded accent-violet-600 cursor-pointer" />
            <span className="text-sm text-gray-600">Remember me for 30 days</span>
          </label>

          <Button type="submit" className="w-full py-3.5" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <p className="text-center text-sm text-gray-500 italic pt-1">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-violet-600 not-italic hover:underline">Sign up free</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
