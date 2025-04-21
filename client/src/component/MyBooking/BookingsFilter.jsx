import React from 'react';

const BookingsFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' }
  ];
  
  return (
    <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
      {filters.map(filter => (
        <button
          key={filter.id}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeFilter === filter.id
              ? 'bg-white shadow-sm text-gray-800'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default BookingsFilter;