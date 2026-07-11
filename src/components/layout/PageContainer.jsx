export default function PageContainer({ children, className = "" }) {
  return (
    <div className={`px-5 py-5 ${className}`}>
      {children}
    </div>
  );
}