import React, { Component } from 'react';
import { Route, BrowserRouter} from 'react-router-dom';
import { StartPage } from './components/StartPage';
import { Dashboard } from './components/Dashboard';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;
  render () {
      return (
       <BrowserRouter>
      <Route exact path='/login' component={StartPage} />
      <Route path='/dashboard' component={Dashboard} />
        </BrowserRouter>      
    );
  }
}
