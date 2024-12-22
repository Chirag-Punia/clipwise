export function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="mt-4 flex justify-center space-x-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-3 py-1">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}