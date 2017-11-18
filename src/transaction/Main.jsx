import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import TopPanelItem from './TopPanelItem';

class Main extends Component {
  state = {}

  componentWillMount() {
    const { filter, member } = this.props;
    const url = `http://localhost:4000/api/transactions/summary/${member.id}`;
    let axiosRequest;
    if (filter) {
      axiosRequest = axios.get(url, { params: filter });
    } else {
      axiosRequest = axios.get(url);
    }
    axiosRequest
      .then((result) => {
        console.log(result.data);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">Summary</div>
          <div className="row">
            <TopPanelItem
              color="orange"
              icon="content_copy"
              content="Used Space"
              title="49/50"
              footerIcon="warning"
              footerContent="Get More Space..."
            />
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  member: PropTypes.shape({}).isRequired,
  filter: PropTypes.bool.isRequired,
};

function select(store) {
  const { member, filter } = store.manageTransactions;
  return {
    member,
    filter,
  };
}

export default connect(select)(Main);
