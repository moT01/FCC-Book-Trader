import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import App from './components/App';
import MainPage from './components/main/MainPage';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import SettingsPage from './components/settings/SettingsPage';
import OffersPage from './components/offers/OffersPage';
import MyBooksPage from './components/mybooks/MyBooksPage';

import requireAuth from'./utils/requireAuth';

const createRoutes = () => (
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/signup" component={SignupPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/settings" component={requireAuth(SettingsPage)} />
          <Route exact path="/my-books" component={requireAuth(MyBooksPage)} />
          <Route exact path="/Offers" component={requireAuth(OffersPage)} />
        </Switch>
      </App>
    </Router>
);

export default createRoutes;
