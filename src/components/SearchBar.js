import React from 'react';

class SearchBar extends React.Component {
  onKeyPress = e => {
    if (e.key == 'Enter') {
      const [pick] = this.props.results;
      this.props.onPick(pick.key);
    }
  };

  render() {
    return (
      <div className={this.props.className}>
        <input
          autoComplete="off"
          className="input"
          disabled={this.props.disabled}
          onChange={e => {
            this.props.onSearchChange(e.target.value);
          }}
          onKeyPress={this.onKeyPress}
          placeholder={this.props.placeholder}
          type="text"
          value={this.props.searchString}
        />
        {this.props.displayResults && (
          <ul>
            {this.props.results.length > 0 ? (
              this.props.results.slice(0, 7).map(r => (
                <li key={r.key} onClick={() => this.props.onPick(r.key)}>
                  {r.name}
                </li>
              ))
            ) : (
              <li> No results found </li>
            )}
          </ul>
        )}
      </div>
    );
  }
}

export default SearchBar;
