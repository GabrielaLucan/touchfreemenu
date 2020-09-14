import React from 'react';
import styled from 'styled-components/macro';
import HeaderNavLink from '../NavLink';
import HeaderUsernameText from './Text';
import HeaderUserLogo from './Logo';

const Wrapper = styled(HeaderNavLink)`
  flex-shrink: 1;
  border-left: 1px solid ${(props) => props.theme.border};
  border-right: 1px solid ${(props) => props.theme.border};
  min-width: 0;
`;

const HeaderUsername = ({ restaurant }) => (
  <Wrapper to='/'>
    <img src={(restaurant || {}).logoUrl} style={{ width: '43px', marginLeft: '-15px', marginRight: '15px' }}></img>
    <HeaderUsernameText>{(restaurant || {}).name}</HeaderUsernameText>
  </Wrapper>
);

export default HeaderUsername;
