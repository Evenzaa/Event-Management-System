import { Link } from "react-router-dom";
import { SearchX, Home } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8F7FF] px-4">
      <div className="max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-full border-[3px] border-[#793EED] bg-[#EDE9FE] text-[#793EED]">
          <SearchX size={34} />
        </div>

        {/* 404 */}
        <h1 className="mb-2 bg-gradient-to-r from-[#793EED] to-[#3E7FF6] bg-clip-text text-5xl font-bold text-transparent">
          404
        </h1>

        {/* Title */}
        <h2 className="mb-4 text-[32px] font-bold text-[#0F0A1E]">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mb-8 text-[18px] leading-7 text-[#6B7280]">
          The page you are looking for doesn’t exist or has
          <br />
          been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-[20px] bg-gradient-to-r from-[#793EED] to-[#3E7FF6] px-10 py-3.5 text-base font-medium text-white transition-all duration-300 hover:opacity-80 hover:-translate-y-1"
        >
          <Home size={18} />
          Go to Home
        </Link>
      </div>
    </div>
  );
}
