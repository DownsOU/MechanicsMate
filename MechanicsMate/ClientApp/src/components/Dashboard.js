import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import { Home } from './Home';
import { FetchData } from './FetchData';
import { Counter } from './Counter';
import { Redirect } from "react-router-dom";

import '../custom.css'

export class Dashboard extends Component {

    render() {
        if (localStorage.getItem("authenticated") === false) {
            return <Redirect to="/login" />;
        }
        return (
            <Layout>
              <Route exact path='/' component={Home} />
              <Route path='/counter' component={Counter} />
              <Route path='/fetch-data' component={FetchData} />
            </Layout>
        );
    }
}