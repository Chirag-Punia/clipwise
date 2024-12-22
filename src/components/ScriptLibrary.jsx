import { useState } from 'react';
import { ScriptSearch } from './ScriptSearch';
import { ScriptList } from './ScriptList';
import { Pagination } from './Pagination';

export default function ScriptLibrary({ scripts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const scriptsPerPage = 5;

  const filteredScripts = scripts.filter(script =>
    script.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    script.script.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastScript = currentPage * scriptsPerPage;
  const indexOfFirstScript = indexOfLastScript - scriptsPerPage;
  const currentScripts = filteredScripts.slice(indexOfFirstScript, indexOfLastScript);
  const totalPages = Math.ceil(filteredScripts.length / scriptsPerPage);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Saved Scripts</h2>
      <ScriptSearch value={searchTerm} onChange={setSearchTerm} />
      <ScriptList scripts={currentScripts} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}