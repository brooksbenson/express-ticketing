import React from 'react';

const SearchBar = props => {
  const onKeyPress = e => {
    if (e.key == 'Enter') {
      const [pick] = props.results;
      props.onPick(pick);
    }
  };

  return (
    <div className={props.className}>
      <input
        autoComplete="off"
        className="input"
        disabled={props.disabled}
        onBlur={props.onBlur}
        onChange={e => {
          props.onSearchChange(e.target.value);
        }}
        onKeyPress={onKeyPress}
        placeholder={props.placeholder}
        type="text"
        value={props.searchString}
      />
      {props.results != null && (
        <ul>
          {props.results.length > 0 ? (
            props.results.slice(0, 7).map(r => (
              <li key={r[props.uniqueKey]} onClick={() => props.onPick(r)}>
                {r[props.displayKey]}
              </li>
            ))
          ) : (
            <li> No results found </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
