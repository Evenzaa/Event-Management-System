import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/common/Button";
import { apiClient } from "../../services/apiClient";

export default function VerifyEmail() {
  const { token } = useParams();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await apiClient.get(
          `/auth/verify/${token}`
        );

        setStatus("success");
        setMessage(res.message);
      } catch (err) {
        setStatus("error");
        setMessage(err.message);
      }
    };

    verify();
  }, [token]);
    return (
    <AuthLayout>
      <div className="w-full max-w-md rounded-[32px] border border-gray-100 bg-white p-10 shadow-2xl">

        {status === "loading" && (
          <div className="text-center">

            <div className="mx-auto mb-6 flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-violet-200 border-t-violet-600"></div>

            <h1 className="text-3xl font-bold text-gray-900">
              Verifying your email...
            </h1>

            <p className="mt-3 text-gray-500">
              Please wait while we verify your account.
            </p>

          </div>
        )}

        {status === "success" && (
          <div className="text-center">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Email Verified!
            </h1>

            <p className="mt-3 text-gray-500">
              {message ||
                "Your email has been verified successfully."}
            </p>

            <Button
              as={Link}
              to="/login"
              className="mt-8 w-full py-3.5"
            >
              Go to Login
            </Button>

          </div>
        )}

        {status === "error" && (
          <div className="text-center">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-10 w-10 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Verification Failed
            </h1>

            <p className="mt-3 text-gray-500">
              {message ||
                "This verification link is invalid or has expired."}
            </p>

            <Button
              as={Link}
              to="/login"
              variant="outline"
              className="mt-8 w-full py-3.5"
            >
              Back to Login
            </Button>

          </div>
        )}

      </div>
    </AuthLayout>
  );
}