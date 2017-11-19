import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';
import Transaction from './transaction';
import MemberItem from './MemberItem';
import actions from './actions/memberActions';

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 50px calc((100vw - 860px) / 2);
    justify-content: space-between;
`;

const styles = {
  error: {
    color: 'white',
    textAlign: 'center',
  },
};

class MemberList extends Component {
  constructor() {
    super();
    this.state = {
      members: [],
      memberSelected: false,
      error: false,
    };
  }

  async componentWillMount() {
    try {
      const res = await axios.get('http://localhost:4000/api/list-members');
      const members = res.data;
      this.setState({ members });
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  }

  // toggles between the members list page and member dashboard
  toggleNav = () => {
    const { memberSelected } = this.state;
    this.setState({ memberSelected: !memberSelected });
  }

  // dispatch user selected member and toggle page
  handleClick = (member) => {
    this.setState({ member });
    this.props.dispatch(actions.currentMember(member));
    this.toggleNav();
  }

  render() {
    const { memberSelected, error } = this.state;

    // alert user on axios request error
    if (error) {
      return (
        <StyledWrapper>
          <h2 style={styles.error}>{error}</h2>
        </StyledWrapper>
      );
    }

    // leave members list page when a member is selected
    if (memberSelected) {
      return (
        <Transaction
          toggleNav={this.toggleNav}
        />
      );
    }

    // create content for members list page
    const mappedMembers = this.state.members.map(member => (
      <p
        onClick={() => this.handleClick(member)}
        key={member.id}
      >
        <MemberItem member={member} />
      </p>
    ));

    return (
      <StyledWrapper>
        {mappedMembers}
      </StyledWrapper>
    );
  }
}

MemberList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(MemberList);
