export default function AuthLayout({ children, variant = "image" }) {
  return (
    <div className="flex min-h-screen">

      {/* LEFT PANEL */}
      {variant === "image" ? (
        <div className="relative hidden w-2xl overflow-hidden lg:flex">
          <img
            src="/auth.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/70" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500" />
              <span className="text-lg font-bold text-white">Evenzaa</span>
            </a>

            {/* Headline */}
            <div>
              <h1 className="text-[40px] font-extrabold leading-tight text-white">
                Your Next Unforgettable<br />
                Experience is Just One<br />
                Click Away
              </h1>
              <p className="mt-5 text-[18px] text-fuchsia-200 italic">
                Join millions of event lovers who discover,
                book, and attend the world's <br /> best events.
              </p>
            </div>

            <p className="text-sm text-white/50">Trusted by 2M+ event-goers worldwide</p>
          </div>
        </div>
      ) : (
        <div className="hidden w-2xl bg-[#F8F7FF] lg:block" />
      )}

      {/* RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-xl">
          {children}
        </div>
      </div>

    </div>
  );
}
