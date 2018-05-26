import React from 'react';

export default class SearchList extends React.Component {
  state = { search: '' };

  onSearch = e => {
    const search = e.target.value;
    this.setState(() => ({ search }));
  };

  render() {
    const { list, selector, className } = this.props;
    const { search } = this.state;
    return (
      <div className={className}>
        <input
          className="search"
          onChange={this.onSearch}
          placeholder="Search..."
          type="text"
          value={search}
        />
        <ul>
          {selector(list, search).map(item => (
            <li key={item.key} onClick={() => this.props.onClick(item)}>
              <button>{item.name}</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
