import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { StartPage } from './components/Auth/StartPage';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { UserPage } from './components/Auth/UserPage';
import { Layout } from './components/Layout';
import { AddService } from './components/Service/AddService';
import { ServiceLog } from './components/Service/ServiceLog';

import SessionManager from "./components/Auth/SessionManager";
import './custom.css'

//this is a comment to test git

export default class App extends Component {
    static displayName = App.name;

    render() {
        console.log(SessionManager.getToken());
        
        return (
            SessionManager.getToken() != null ? (
                <Layout>
                    <Route exact path='/home' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data' component={FetchData} />
                    <Route path='/user' component={UserPage} />
                    <Route path='/add-service' component={AddService}/>
                    <Route path='/service-log' component={ServiceLog}/>

                </Layout>
            ) : (
                    <Route path='/' component={StartPage} />
            )
        );
    }
}
