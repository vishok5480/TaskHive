import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
            <button
                key={index}
                onClick={() => onPageChange(index + 1)}
                className={`px-4 py-2 mx-1 ${
                    index + 1 === currentPage
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                }`}
            >
                {index + 1}
            </button>
        ))}
    </div>
);

export default Pagination;
