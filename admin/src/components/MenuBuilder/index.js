import React from 'react';

import { Wrapper } from './styles';
import Categories from './Categories';
import Products from './Products';

export default class MenuBuilder extends React.Component {
  componentDidMount() {
    this.redirectIfNotLoggedIn();
  }

  componentDidUpdate() {
    this.redirectIfNotLoggedIn();
  }

  redirectIfNotLoggedIn() {
    const { token, history } = this.props;
    if (!token) {
      history.push('/login');
    }
  }

  render() {
    return (
      <Wrapper>
        <Categories />
        <Products />
      </Wrapper>
    );
  }
}