export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary: "bg-[#0F4C81] text-white shadow-lg shadow-blue-900/20",
    secondary: "bg-white text-[#0F4C81] border border-blue-100",
    danger: "bg-red-600 text-white",
    ghost: "bg-transparent text-[#0F4C81]",
  };

  return (
    <button
      type={type}
      className={`w-full h-13 rounded-2xl font-semibold text-sm transition active:scale-[0.98] ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}