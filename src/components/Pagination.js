import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; // 페이지가 1개 이하면 표시 안 함

  const currentPage = page + 1; // page는 0부터 시작하므로 1을 더해 표시용으로 사용
  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(startPage + 4, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // 이동할 페이지 계산
  const goFirst = () => onPageChange(Math.max(currentPage - 6, 0));
  const goLast = () => onPageChange(Math.min(currentPage + 5, totalPages - 1));
  const goPrev = () => onPageChange(Math.max(page - 1, 0));
  const goNext = () => onPageChange(Math.min(page + 1, totalPages - 1));

  return (
    <div className="flex justify-center mt-5 mb-5 space-x-1">
      <button
        onClick={goFirst}
        disabled={currentPage <= 1}
        className={`px-3 py-1 rounded border text-sm ${currentPage <= 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
          }`}
      >
        {"<<"}
      </button>
      <button
        onClick={goPrev}
        disabled={currentPage <= 1}
        className={`px-3 py-1 rounded border text-sm ${currentPage <= 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
          }`}
      >
        {"<"}
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p - 1)}
          className={`px-3 py-1 rounded border text-sm ${p === currentPage
            ? "bg-blue-100 font-bold underline"
            : "bg-white hover:bg-gray-100"
            }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={goNext}
        disabled={currentPage >= totalPages}
        className={`px-3 py-1 rounded border text-sm ${currentPage >= totalPages
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
          }`}
      >
        {">"}
      </button>
      <button
        onClick={goLast}
        disabled={currentPage >= totalPages}
        className={`px-3 py-1 rounded border text-sm ${currentPage >= totalPages
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
          }`}
      >
        {">>"}
      </button>
    </div>

  );
}
