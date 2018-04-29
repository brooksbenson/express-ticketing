import React from 'react';

export default class SearchBar extends React.Component {

  state = {
    searchResults: [],
    searchString: '',
  }

  // if you can't search, text input should be empty
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.canSearch
      ? { ...prevState }
      : { ...prevState, searchString: '' };
  }

  static displayResults(results, displayKey, uniqueKey, onClickHandler) {
    return (
      <ul>
        {
          results.slice(0, 7).map(r => (
            <li key={uniqueKey} onClick={() => onClickHandler(r) }>
              { r[displayKey] } 
            </li>
          ))
        }
      </ul>
    )
  }

  componentDidMount() {
    if (this.props.isFocused) this.input.focus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isFocused) this.input.focus();
  }

  onKeyPress = (e) => {
    if (e.key == 'Enter') {
      const [ newValue ] = this.state.searchResults;
      this.props.onValueModification(newValue);
      this.setState(() => ({
        searchResults: [],
        searchString: newValue[this.props.valueDisplayKey]
      }));
    }
  };

  onResultClick = (newValue) => {
    this.props.onValueModification(newValue);
    this.setState(() => ({
      searchString: newValue[this.props.valueDisplayKey],
      searchResults: []
    }));
  };

  onSearch = (e) => {
    this.props.onValueModification(null);
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
          className="input"
          disabled={!this.props.canSearch}
          onChange={this.onSearch}
          onKeyPress={this.onKeyPress}
          placeholder={this.props.placeholder}
          ref={input => { this.input = input }}
          type="text"
          value={this.state.searchString}
        />
        { this.props.canSearch && SearchBar.displayResults(
            this.state.searchResults,
            this.props.valueDisplayKey,
            this.props.uniqueValueKey,
            this.onClickHandler
          )
        }
      </div>
    )
  }
}