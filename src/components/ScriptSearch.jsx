export function ScriptSearch({ value, onChange }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search scripts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  );
}