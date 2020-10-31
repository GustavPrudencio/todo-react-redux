import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { authActions, getAuth } from 'src/state/auth';
import Header from 'src/components/header';
import RequireAuthRoute from 'src/components/require-auth-route';
import RequireUnauthRoute from 'src/components/require-unauth-route';
import SignInPage from '../pages/sign-in';
import TasksPage from '../pages/tasks';
import CalendarPage from '../pages/calendar';


const App = ({authenticated, signOut}) => (
  <div>
    <Header
      authenticated={authenticated}
      signOut={signOut}
    />

    <main>
      <RequireAuthRoute authenticated={authenticated} exact path="/" component={TasksPage}/>
      <RequireUnauthRoute authenticated={authenticated} path="/signin" component={SignInPage}/>
      <RequireUnauthRoute authenticated={authenticated} path="/calendar" component={CalendarPage}/>
    </main>
  </div>
);

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = getAuth;

const mapDispatchToProps = {
  signOut: authActions.signOut
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
