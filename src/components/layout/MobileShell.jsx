export default function MobileShell({ children, className = "" }) {
  return (
    <main className={`mobile-shell-wrap min-h-screen flex justify-center ${className}`}>
      <section className="mobile-shell w-full max-w-[430px] min-h-screen relative overflow-x-hidden">
        {children}
      </section>
    </main>
  );
}
