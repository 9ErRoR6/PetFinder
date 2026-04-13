// components/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-8 mb-12">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`size-10 rounded-md font-medium transition-colors duration-300 ${
            currentPage === i + 1
              ? "bg-[#222831] text-[#F0EEEA]"
              : "bg-[#F0EEEA] text-[#222831] border-2 border-[#C4C9D4] hover:bg-[#404650]"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
