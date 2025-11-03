import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Search for teams, players, or matches..."
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
