export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8F7FF] flex">

      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-blue-500">

        {/* Decorative Circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-white/10"></div>
        <div className="absolute top-1/2 right-10 w-56 h-56 rounded-full bg-white/10 blur-2xl"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full text-center px-12">

          <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 shadow-lg">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V5a4 4 0 118 0v2m-9 0h10a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z"
              />
            </svg>
          </div>

          <h1 className="text-5xl font-extrabold text-white mb-6">
            Evenzaa
          </h1>

          <p className="text-xl text-white/90 leading-9 max-w-md">
            Discover amazing events,
            <br />
            reserve your tickets,
            <br />
            and create unforgettable memories.
          </p>

        </div>

      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">
          {children}
        </div>

      </div>

    </div>
  );
}