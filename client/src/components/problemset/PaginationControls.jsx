import React from 'react';

const PaginationControls = ({ currentPage, totalPages, setCurrentPage }) => {
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <div className="flex justify-center gap-2 mt-4 overflow-x-auto p-2">
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
      >
        «
      </button>
      <button
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
      >
        ‹
      </button>
      {[...Array(endPage - startPage + 1)].map((_, i) => {
        const pageNum = startPage + i;
        return (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`px-3 py-1 rounded-md ${
              currentPage === pageNum
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      <button
        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
        >
        ›
        </button>
        <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
        >
            »
        </button>
    </div>
    );
}

export default PaginationControls;

