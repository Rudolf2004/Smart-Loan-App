export default function SplashLoading() {
  return (
    <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2 h-2 rounded-full bg-blue-300" />
        <span className="w-5 h-5 rounded-full bg-blue-600" />
        <span className="w-2 h-2 rounded-full bg-blue-300" />
      </div>

      <p className="text-blue-600 text-lg font-medium">Loading...</p>
    </div>
  );
}