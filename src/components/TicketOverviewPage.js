import React from 'react';
import { connect } from 'react-redux';
import TicketCard from './TicketCard';
import ticketSelector from '../selectors/tickets';
import createTicketList from '../helpers/create-ticket-list';
import { startSetTickets } from '../actions/tickets';

export class TicketOverviewPage extends React.Component {
  constructor(props) {
    super(props);
    props.startSetTickets();
    this.state = {
      searchString: ''
    };
  }

  onSearchChange = e => {
    const searchString = e.target.value;
    this.setState(() => ({ searchString }));
  };

  render() {
    return (
      <section className="content-container-lg">
        <div className="ticket-overview content-innards">
          <div className="ticket-overview__top">
            <h2 className="heading heading--primary"> My Tickets </h2>
            <div className="ticket-overview__search">
              <span> Search </span>
              <input
                className="input"
                onChange={this.onSearchChange}
                value={this.state.searchString}
              />
            </div>
          </div>
          <div className="ticket-overview__bottom">
            {ticketSelector(this.props.tickets, this.state.searchString).map(
              t => (
                <TicketCard
                  key={t.ticketKey}
                  className="ticket-overview__ticket-card"
                  history={this.props.history}
                  {...t}
                />
              )
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ tickets, accounts }) => ({
  tickets: createTicketList(tickets, accounts)
});

const mapDispatchToProps = dispatch => ({
  startSetTickets: () => dispatch(startSetTickets())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketOverviewPage);
