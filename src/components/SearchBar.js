import React from 'react';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayQueryResults: false,
      inputValue: '',
      queryResults: []
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const queryString = e.target.value;
    this.setState(() => ({
      inputValue: queryString,
      displayQueryResults: true,
      queryResults: this.props.selector(
        queryString, 
        this.props.searchableItems
      )
    }))
  }

  render() {
    return (
      <div>
        <input
          autoComplete="off"
          className="input"
          name="account"
          onChange={this.onSearch}
          placeholder={this.props.placeholder}
          type="text"
          value={this.state.queryString}
        />
        { 
          this.state.displayQueryResults &&
          <ul>
          {
            this.state.queryResults(result => (
              <li>{ result[this.props.resultDisplayKey] }</li>
            ))
          }
        </ul>
        }
      </div>
    )
  }
}