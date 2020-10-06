import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, Route, Switch } from 'react-router-dom';
import theme from '../../theme';
import history from '../../util/history';
import GlobalStyle from '../../globalStyle';
import Header from '../Header/Container';
import ErrorNotificationContainer from '../ErrorNotification/Container';
import LoginScreen from '../LoginForm/Container';
import ChangePasswordScreen from '../ChangePassword/Container';
import MenuBuilderScreen from '../MenuBuilder/Container';
import HomeComponent from '../Home/Container';
import 'react-toggle/style.css'; // for ES6 modules

const App = (props) => (
  <ThemeProvider theme={theme(props.dark)}>
    <Router history={history}>
      <>
        <GlobalStyle />
        <Route component={Header} />
        <Route component={ErrorNotificationContainer} />
        <Switch>
          <Route path='/login' component={LoginScreen} />
          <Route path='/change-password' component={ChangePasswordScreen} />
          <Route path='/menu-builder' component={MenuBuilderScreen} />
          <Route path='/' component={HomeComponent} />
        </Switch>
      </>
    </Router>
  </ThemeProvider>
);

export default App;
