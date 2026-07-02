import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/common/Button";
import { authService } from "../../services/authService";


export default function CheckEmail() {
  const location = useLocation();
  const email = location.state?.email || "";

  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendError, setResendError] = useState("");

  async function handleResend() {
    if (!email) return;
    setResending(true);
    setResendMessage("");
    setResendError("");
    try {
      const res = await authService.forgotPassword(email);
      setResendMessage(res.message || "Verification email sent!");
    } catch (err) {
      setResendError(err.message || "Failed to resend. Please try again.");
    } finally {
      setResending(false);
    }
  }

  return (
    <AuthLayout variant="plain">
      <div className="w-full text-center">

        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-100">
          <svg className="h-10 w-10 text-violet-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Check your email</h1>

        <p className="mt-3 text-gray-500">
          We sent a verification link to{" "}
          {email && <span className="font-semibold text-gray-700">{email}</span>}
          . Click the link in the email to activate your account.
        </p>

        <p className="mt-2 text-sm text-gray-400">
          It may take a minute. Check your spam folder too.
        </p>

        {resendMessage && (
          <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {resendMessage}
          </div>
        )}
        {resendError && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {resendError}
          </div>
        )}

        {/* Resend */}
        <div className="mt-8 space-y-3">
          <Button
            className="w-full py-3.5"
            onClick={handleResend}
            disabled={resending || !email}
          >
            {resending ? "Resending..." : "Resend Verification Email"}
          </Button>

          <Link
            to="/login"
            className="block text-center text-sm font-medium text-violet-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </AuthLayout>
  );
}
