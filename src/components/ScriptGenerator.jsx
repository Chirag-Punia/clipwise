import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { readFileContent } from '../utils/fileUtils';
import { LanguageSelector } from './LanguageSelector';
import { FileUploader } from './FileUploader';
import { ScriptDisplay } from './ScriptDisplay';
import { generateScript as generateScriptApi } from '../services/api';

export default function ScriptGenerator({ onSaveScript }) {
  const [prompt, setPrompt] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const fileContents = await Promise.all(
        acceptedFiles.map((file) => readFileContent(file))
      );

      const newPrompt = prompt + '\n' + fileContents.join('\n');
      setPrompt(newPrompt);
      toast.success('File content added to prompt');
    } catch (error) {
      toast.error('Error processing file');
    }
  }, [prompt]);

  const generateScript = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    try {
      const response = await generateScriptApi(prompt, selectedLanguage);
      setGeneratedScript(response.script);
      toast.success('Script generated successfully');
    } catch (error) {
      toast.error('Error generating script');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (generatedScript) {
      try {
       
        await onSaveScript({
          prompt,
          script: generatedScript,
          language: selectedLanguage,
          date: new Date().toISOString(),
        });
        toast.success('Script saved successfully');
      } catch (error) {
        toast.error('Error saving script');
      }
    } else {
      toast.error('No script to save');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enter your prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows="4"
            placeholder="Enter your script prompt here..."
          />
        </div>

        <FileUploader onDrop={onDrop} />
        <LanguageSelector value={selectedLanguage} onChange={setSelectedLanguage} />

        <div className="flex space-x-4">
          <button
            onClick={generateScript}
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Generating...' : 'Generate Script'}
          </button>

          {generatedScript && (
            <button
              onClick={handleSave}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save Script
            </button>
          )}
        </div>

        {generatedScript && <ScriptDisplay script={generatedScript} />}
      </div>
    </div>
  );
}
