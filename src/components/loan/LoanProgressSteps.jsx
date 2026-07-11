const steps = [
  "Personal",
  "Employment",
  "Financial",
  "Loan",
  "Collateral",
  "Guarantor",
  "Review",
];

export default function LoanProgressSteps({ currentStep = 1 }) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-bold text-slate-500">
          Step {currentStep} of {steps.length}
        </p>
        <p className="text-xs font-bold text-[#0F4C81]">
          {steps[currentStep - 1]}
        </p>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {steps.map((step, index) => {
          const active = index + 1 <= currentStep;

          return (
            <div
              key={step}
              className={`h-2 rounded-full ${
                active ? "bg-[#0F4C81]" : "bg-slate-100"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}