export default function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="w-2 h-2 rounded-full bg-[#0F4C81] animate-bounce" />
      <span className="w-2 h-2 rounded-full bg-[#0F4C81] animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 rounded-full bg-[#0F4C81] animate-bounce [animation-delay:300ms]" />
    </div>
  );
}