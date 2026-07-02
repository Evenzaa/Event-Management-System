import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/common/Button";


export default function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const userRaw = searchParams.get("user");

    if (token) {
  
      localStorage.setItem("authToken", token);
      if (userRaw) {
        try {
          localStorage.setItem("user", decodeURIComponent(userRaw));
        } catch {
          // 
        }
      }
      navigate("/", { replace: true });
    } else {
      const backendError = searchParams.get("error");
      setError(
        backendError ||
        "Google login almost works — one small backend fix needed. See the comment in GoogleCallback.jsx."
      );
    }
  }, [searchParams, navigate]);

  return (
    <AuthLayout variant="plain">
      <div className="w-full text-center">
        {error ? (
          <>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Google Login Failed</h1>
            <p className="mt-3 text-sm text-gray-500">{error}</p>
            <Button
              onClick={() => navigate("/login")}
              className="mt-8 w-full py-3.5"
            >
              Back to Login
            </Button>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
            <h1 className="text-xl font-semibold text-gray-700">Signing you in...</h1>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
