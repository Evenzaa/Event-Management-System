export default function InfoItem({ title, info, ui = "", iui = "", icon }) {
  return (
    <div className={ui}>
      <h3 className="text-sm font-medium text-[#1A1033] flex items-center">
        {icon}
        {title}
      </h3>

      <div className={`text-base text-[#6b7280]  px-2 py-1 sm:px-3 sm:py-1  ${iui}`}>
        {info}
      </div>
    </div>
  );
}