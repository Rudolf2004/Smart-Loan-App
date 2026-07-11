export default function TopWave() {
  return (
    <div className="absolute top-8 right-0 w-48 h-32 opacity-20">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="absolute right-0 w-60 h-24 rounded-[50%] border-t border-blue-300"
          style={{ top: index * 11 }}
        />
      ))}
    </div>
  );
}
