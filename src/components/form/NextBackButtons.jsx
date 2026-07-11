import Button from "../ui/Button";

export default function NextBackButtons({
  onBack,
  onNext,
  nextLabel = "Next",
  backLabel = "Back",
}) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      <Button variant="secondary" onClick={onBack}>
        {backLabel}
      </Button>

      <Button onClick={onNext}>{nextLabel}</Button>
    </div>
  );
}