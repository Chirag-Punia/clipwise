import { ScriptItem } from './ScriptItem';

export function ScriptList({ scripts }) {
  return (
    <div className="space-y-4">
      {scripts.map((script) => (
        <ScriptItem key={script.id} script={script} />
      ))}
    </div>
  );
}