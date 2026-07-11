export default function LoadingSpinner({ className = "" }) {
  return (
    <div
      className={`w-12 h-12 rounded-full border-4 border-blue-100 border-t-[#0F4C81] animate-spin ${className}`}
    />
  );
}