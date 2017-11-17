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
`

class MemberList extends Component {
  constructor() {
    super();
    this.state = {
      members: [],
      memberSelected: false,
    };
  }

  async componentWillMount() {
    try {
      const res = await axios.get('http://localhost:4000/api/list-members');
      const members = res.data;
      this.setState({ members });
    } catch (err) {
      console.error(err);
    }
  }

  toggleNav = () => {
    const { memberSelected } = this.state;
    this.setState({ memberSelected: !memberSelected });
  }

  handleClick = (member) => {
    this.setState({ member });
    this.props.dispatch(actions.currentMember(member));
    this.toggleNav();
  }

  render() {
    const { memberSelected } = this.state;
    if (memberSelected) {
      return (
        <Transaction
          toggleNav={this.toggleNav}
        />
      );
    }
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
