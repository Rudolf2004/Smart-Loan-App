export default function TopWave() {
  return (
    <div className="absolute top-16 right-0 w-60 h-40 opacity-20">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="absolute right-0 w-72 h-28 rounded-[50%] border-t border-blue-300"
          style={{ top: index * 14 }}
        />
      ))}
    </div>
  );
}