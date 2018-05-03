import React from 'react';
import ContactMiniForm from './ContactMiniForm';

export default class ContactMiniFormController extends React.Component {
  state = {
    display: false,
    email: '',
    name: '',
    number: ''
  };

  handleClick = e => {
    console.log(e.target);
    this.setState(({ display }) => ({
      display: !display
    }));
  };

  render() {
    return (
      <div>
        <button
          className="btn btn--secondary"
          disabled={this.props.disabled}
          onClick={e => this.handleClick(e)}
        >
          Create Contact
        </button>
        {this.state.display ? 'display' : 'no display'}
      </div>
    );
  }
}
