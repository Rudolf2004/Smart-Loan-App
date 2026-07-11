export default function SplashBackground({ children }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#001D4A] via-[#003E85] to-[#001B3D] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0B65C2_0%,transparent_45%)] opacity-60" />
      <div className="relative z-10 min-h-screen flex flex-col">{children}</div>
    </section>
  );
}