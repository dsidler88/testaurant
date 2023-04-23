export default function Title({ name }: { name: string }) {
  console.log(typeof name);
  return (
    <div className="mt-4 border-b pb-6">
      <h1 className="font-bold text-6xl">{name}</h1>
    </div>
  );
}
