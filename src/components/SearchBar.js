import React from 'react';

export default class SearchBar extends React.Component {

  state = {
    searchResults: [],
    searchString: '',
  }

  // is you can't search, text input should be empty
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.canSearch
      ? { ...prevState }
      : { ...prevState, searchString: '' };
  }

  displayResults() {
    return (
      <ul>
        {
          this.state.searchResults.slice(0, 7).map(r => (
            <li key={r.id} onClick={() => this.onClickHandler(r) }>
              { r[this.props.valueDisplayKey] } 
            </li>
          ))
        }
      </ul>
    )
  }

  onKeyPress = (e) => {
    if (e.key == 'Enter') {
      const [ selectedResult ] = this.state.searchResults;
      this.props.onValueSelect(selectedResult);
      this.setState(() => ({
        displaySearchResults: false,
        searchResults: [],
        searchString: selectedResult[this.props.valueDisplayKey]
      }));
    }
  };

  onResultClick = (result) => {
    this.props.onValueSelect(result);
    this.setState(() => ({
      searchString: result[this.props.valueDisplayKey],
      searchResults: []
    }));
  };

  onSearch = (e) => {
    this.props.onValueSelect(null);
    const searchString = e.target.value;
    this.setState(() => ({ 
      searchString,
      searchResults: this.props.selector(
        this.props.values,
        searchString
      )
    }));
  };

  render() {
    return (
      <div className={this.props.className}>
        <input
          autoComplete="off"
          autoFocus={this.props.canSearch}
          className="input"
          disabled={!this.props.canSearch}
          onChange={this.onSearch}
          onKeyPress={this.onKeyPress}
          placeholder={this.props.placeholder}
          ref={input => this.input = input}
          type="text"
          value={this.state.searchString}
        />
        { this.props.canSearch && this.displayResults() }
      </div>
    )
  }
}