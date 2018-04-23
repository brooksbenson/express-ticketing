import React from 'react';

export const SearchResults = ({ resultsArray, resultsDisplayProp, onResultClick }) => (
  <ul className="search-result">
    {
      resultsArray.map((r, i) => (
        <li 
          key={r.id || i} 
          className="search-result__item" 
          onClick={() => onResultClick(r) }
        > 
        { r[resultsDisplayProp] } 
        </li>
      ))
    }
  </ul>
);

export default SearchResults;