import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Transaction from './transaction';

import MemberItem from './MemberItem';

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 50px calc((100vw - 860px) / 2);
    justify-content: space-between;
`

export default class MemberList extends Component {
  constructor() {
    super();
    this.state = {
      members: [],
      memberSelected: false,
      memberId: '',
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

  handleClick = (id) => {
    this.setState({ id });
    this.toggleNav();
  }

  render() {
    const { memberSelected, id } = this.state;
    if (memberSelected) {
      return (
        <Transaction
          id={id}
          toggleNav={this.toggleNav}
        />
      );
    }
    const mappedMembers =  this.state.members.map(member => (
      <div
        onClick={() => this.handleClick(member.id)}
        key={member.id}
      >
        <MemberItem member={member} />
      </div>
    ));

    return (
      <StyledWrapper>
        {mappedMembers}
      </StyledWrapper>
    );
  }
}
