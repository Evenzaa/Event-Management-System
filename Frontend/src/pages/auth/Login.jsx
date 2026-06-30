import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/common/Button";
import { authService } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await authService.login(
        formData.email,
        formData.password
      );

      localStorage.setItem("authToken", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
    return (
    <AuthLayout>
      <div className="w-full rounded-[32px] bg-white p-10 shadow-2xl border border-gray-100">

        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back
        </h1>

        <p className="mt-2 mb-8 text-gray-500">
          Sign in to your account to continue
        </p>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Google Login */}

        <button
          type="button"
          onClick={() => authService.googleLogin()}
          className="mb-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-300 bg-white py-3 font-medium transition hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />

          Continue with Google
        </button>

        {/* Divider */}

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-400">
              or continue with email
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-2xl border border-gray-300 px-5 py-3.5 outline-none transition focus:border-violet-600"
            />

          </div>

          <div>

            <div className="mb-2 flex items-center justify-between">

              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-violet-600 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-2xl border border-gray-300 px-5 py-3.5 outline-none transition focus:border-violet-600"
            />

          </div>
                    <Button
            type="submit"
            className="w-full py-3.5 mt-2"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <p className="text-center text-sm text-gray-600 pt-2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-violet-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </form>

      </div>
    </AuthLayout>
  );
}