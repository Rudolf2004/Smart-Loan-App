export default function SplashLoading() {
  return (
    <div className="absolute bottom-9 min-[390px]:bottom-12 left-0 right-0 flex flex-col items-center">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-2 h-2 rounded-full bg-blue-300" />
        <span className="w-4 h-4 rounded-full bg-blue-600" />
        <span className="w-2 h-2 rounded-full bg-blue-300" />
      </div>

      <p className="text-blue-600 text-sm font-medium">Loading...</p>
    </div>
  );
}
