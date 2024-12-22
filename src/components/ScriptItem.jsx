import { formatScriptContent } from '../utils/scriptFormatter';

export function ScriptItem({ script }) {
  const formattedScript = formatScriptContent(script.script);

  const downloadScript = (format) => {
    let content = `Title: ${script.prompt}\n\n`;
    formattedScript.forEach(block => {
      if (block.type === 'scene') {
        content += `[${block.content}]\n`;
      } else if (block.type === 'dialogue') {
        content += `${block.speaker}: ${block.content}\n`;
      } else {
        content += `${block.content}\n`;
      }
      content += '\n';
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `script_${script.id}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div className="w-full">
          <h3 className="font-medium text-gray-900">Prompt:</h3>
          <p className="text-gray-600 mt-1">{script.prompt}</p>
          <h3 className="font-medium text-gray-900 mt-4">Script:</h3>
          <div className="prose prose-sm max-w-none mt-2">
            {formattedScript.map((block, index) => (
              <div key={index} className="mb-2">
                {block.type === 'scene' && (
                  <div className="text-blue-600 font-medium">[{block.content}]</div>
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
          <p className="text-sm text-gray-500 mt-4">
            Language: {script.language.toUpperCase()} | 
            Date: {new Date(script.date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => downloadScript('txt')}
            className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Download TXT
          </button>
        </div>
      </div>
    </div>
  );
}