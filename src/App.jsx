import { useState } from 'react';
import ScriptGenerator from './components/ScriptGenerator';
import ScriptLibrary from './components/ScriptLibrary';
import { Toaster } from 'react-hot-toast';

function App() {
  const [savedScripts, setSavedScripts] = useState([]);

  const handleSaveScript = (script) => {
    setSavedScripts([...savedScripts, { ...script, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Video Script Generator</h1>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          <ScriptGenerator onSaveScript={handleSaveScript} />
          <ScriptLibrary scripts={savedScripts} />
        </div>
      </main>
    </div>
  );
}

export default App;