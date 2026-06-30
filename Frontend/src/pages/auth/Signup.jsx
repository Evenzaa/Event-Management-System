import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/common/Button";
import { authService } from "../../services/authService";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) setError("");
  };

  const passwordStrength = () => {
    const pass = formData.password;

    if (pass.length < 6) return 1;
    if (pass.length < 10) return 2;

    const strong =
      /[A-Z]/.test(pass) &&
      /[0-9]/.test(pass) &&
      /[^A-Za-z0-9]/.test(pass);

    return strong ? 4 : 3;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      setError("Please accept Terms & Conditions");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await authService.register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
    return (
    <AuthLayout>
      <div className="w-full max-w-lg rounded-[32px] border border-gray-100 bg-white p-10 shadow-2xl">

        <h1 className="text-4xl font-bold text-gray-900">
          Create your account
        </h1>

        <p className="mt-2 mb-8 text-gray-500">
          Start discovering amazing events today
        </p>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Google */}

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
          className="space-y-6"
        >

          <div>

            <label className="mb-3 block text-sm font-semibold text-gray-700">
              I want to...
            </label>

            <div className="grid grid-cols-2 gap-4">              
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    role: "user",
                  }))
                }
                className={`rounded-3xl border p-5 transition-all duration-300 hover:shadow-md ${
                  formData.role === "user"
                    ? "border-violet-600 bg-violet-50 shadow-md"
                    : "border-gray-200 hover:border-violet-300"
                }`}
              >
                <p className="font-semibold text-gray-900">
                  Attend Events
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Find & book amazing events
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    role: "organizer",
                  }))
                }
                className={`rounded-3xl border p-5 transition-all duration-300 hover:shadow-md ${
                  formData.role === "organizer"
                    ? "border-violet-600 bg-violet-50 shadow-md"
                    : "border-gray-200 hover:border-violet-300"
                }`}
              >
                <p className="font-semibold text-gray-900">
                  Host Events
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Create & manage events
                </p>
              </button>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                First Name
              </label>

              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Last Name
              </label>

              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
              />

            </div>

          </div>

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
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
            />

            <div className="mt-4 flex gap-2">

              {[1,2,3,4].map((item)=>(
                <div
                  key={item}
                  className={`h-2 flex-1 rounded-full ${
                    passwordStrength() >= item
                      ? item === 1
                        ? "bg-red-500"
                        : item === 2
                        ? "bg-yellow-400"
                        : "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              ))}

            </div>

            <p className="mt-2 text-xs text-gray-500">
              Use at least 8 characters including uppercase, number and symbol.
            </p>

          </div>          <label className="flex items-start gap-3 text-sm text-gray-600">

            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
            />

            <span>
              I agree to the{" "}
              <Link
                to="#"
                className="font-semibold text-violet-600 hover:underline"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="#"
                className="font-semibold text-violet-600 hover:underline"
              >
                Privacy Policy
              </Link>
            </span>

          </label>

          <Button
            type="submit"
            className="w-full py-3.5"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="pt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-violet-600 hover:underline"
            >
              Sign In
            </Link>
          </p>

        </form>

      </div>

    </AuthLayout>
  );
}