import { formatScriptContent } from '../utils/scriptFormatter';

export function ScriptDisplay({ script }) {
  if (!script) return null;
  
  const formattedScript = formatScriptContent(script);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-900">Generated Script</h3>
      <div className="mt-2 p-4 bg-gray-50 rounded-md">
        <div className="whitespace-pre-wrap prose prose-sm max-w-none">
          {formattedScript.map((block, index) => (
            <div key={index} className="mb-4">
              {block.type === 'scene' && (
                <div className="text-blue-600 font-medium">{block.content}</div>
              )}
              {block.type === 'dialogue' && (
                <div>
                  <span className="font-bold">{block.speaker}:</span>
                  <span className="ml-2">{block.content}</span>
                </div>
              )}
              {block.type === 'action' && (
                <div className="text-gray-600 italic">{block.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}