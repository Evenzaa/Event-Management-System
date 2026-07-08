export default function Widget({ icon, title, count,ui }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex items-center gap-5 shadow-xs transition mt-7">
      
      <div className={`${ui} w-14 h-14 rounded-full  flex items-center justify-center   text-2xl`}>
        {icon}
      </div>

      <div>
        <p className="text-base text-[#0F0A1E]">{title}</p>
        <h2 className="text-3xl font-semibold text-[#0F0A1E]">{count}</h2>
      </div>

    </div>
  );
}