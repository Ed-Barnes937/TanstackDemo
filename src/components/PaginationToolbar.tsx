interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const PaginationToolbar = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex justify-center mt-8 mb-2">
      <div className="bg-blue text-yellow p-2 rounded-md flex gap-6 items-center">
        <button
          className="p-2 border-green border-2 rounded-md not-disabled:cursor-pointer not-disabled:hover:scale-110 transition-transform disabled:text-gray-500"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>
        {currentPage} / {totalPages}
        <button
          className="p-2 border-green border-2 rounded-md not-disabled:cursor-pointer not-disabled:hover:scale-110 transition-transform disabled:text-gray-500"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};
