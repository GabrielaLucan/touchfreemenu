import React, { Component } from 'react';
import styled from 'styled-components/macro';
import { Route } from 'react-router-dom';
import HomeMainSection from './MainSection';
import CategoryMenuContainer from '../CategoryMenu/Container';
import PostListContainer from '../PostList/Container';
import PostDetailContainer from '../PostDetail/Container';
import SidebarContainer from '../Sidebar/Container';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 10vw;

  @media (max-width: 1024px) {
    margin: 0 5vw;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 0;
  }
`;

export default class Home extends Component {
  componentDidMount() {
    const { token, history, getCurrentUser, user } = this.props;
    if (!token) {
      history.push('/login');
    } else {
      console.log('user', user);

      if (!(user.restaurant || {}).logoUrl) {
        getCurrentUser(token);
      }
    }
  }

  componentDidUpdate() {
    const { token, history } = this.props;
    if (!token) {
      history.push('/login');
    }
  }

  render() {
    return null;

    if (!this.props.token) {
      return null;
    }

    return (
      <Wrapper>
        <HomeMainSection>
          <Route component={CategoryMenuContainer} />
          <Route exact path='/' component={PostListContainer} />
          <Route exact path='/a/:category' render={({ match }) => <PostListContainer category={match.params.category} />} />
          <Route exact path='/u/:username' render={({ match }) => <PostListContainer username={match.params.username} />} />
          <Route exact path='/a/:category/:post' render={({ match, history }) => <PostDetailContainer id={match.params.post} history={history} />} />
        </HomeMainSection>
        <Route component={SidebarContainer} />
      </Wrapper>
    );
  }
}
