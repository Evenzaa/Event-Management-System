export default function AboutSection({ content }) {
  const paragraphs = content ? content.split('\n\n') : [];

  return (
    <div className="mb-8">
      <h5 className="text-xl font-bold text-slate-900 mb-4">About This Event</h5>
      <div className="space-y-4">
        {paragraphs.map((p, idx) => (
          <p key={idx} className="text-[15px] leading-relaxed text-slate-600">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
