/**
 * Formats the raw script content into structured blocks
 * @param {Array<{type: string, text: string}>|string} content - Raw script content from AI
 * @returns {Array<{type: string, content: string, speaker?: string}>}
 */
export function formatScriptContent(content) {
  if (!content) return [];
  

  if (Array.isArray(content)) {
    content = content[0]?.text || '';
  }
  
  const lines = content.split('\n').filter(line => line.trim());
  const blocks = [];

  for (const line of lines) {
    if (line.startsWith('**[') && line.endsWith(']**')) {
    
      blocks.push({
        type: 'scene',
        content: line.replace(/^\*\*\[|\]\*\*$/g, '')
      });
    } else if (line.startsWith('**') && line.includes(':')) {
    
      const [speaker, ...dialogueParts] = line.replace(/^\*\*|\*\*$/g, '').split(':');
      blocks.push({
        type: 'dialogue',
        speaker: speaker.trim(),
        content: dialogueParts.join(':').trim()
      });
    } else {
    
      blocks.push({
        type: 'action',
        content: line.replace(/^\*\*|\*\*$/g, '')
      });
    }
  }

  return blocks;
}