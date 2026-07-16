const STEPS = ['Seats', 'Checkout', 'Confirm'];

export default function CheckoutStepper({ currentStep }) {
  return (
    <div className="flex gap-2">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const active = stepNum === currentStep;
        return (
          <span
            key={label}
            className={`px-3 py-1.5 rounded-md text-xs font-medium ${
              active ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {stepNum} {label}
          </span>
        );
      })}
    </div>
  );
}