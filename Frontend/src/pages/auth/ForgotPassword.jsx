import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/common/Button";
import { authService } from "../../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await authService.forgotPassword(email);
      setMessage(res.message);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
    return (
    <AuthLayout>
      <div className="w-full max-w-md rounded-[32px] border border-gray-100 bg-white p-10 shadow-2xl">

        <h1 className="text-4xl font-bold text-gray-900">
          Forgot Password
        </h1>

        <p className="mt-2 mb-8 text-gray-500">
          Enter your email and we'll send you a password reset link.
        </p>

        {message && (
          <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
            />

          </div>

          <Button
            type="submit"
            className="w-full py-3.5"
            disabled={loading}
          >
            {loading ? "Sending Reset Link..." : "Send Reset Link"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-semibold text-violet-600 hover:underline"
            >
              Back to Login
            </Link>
          </p>

        </form>

      </div>
    </AuthLayout>
  );
}