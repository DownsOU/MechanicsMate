import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { StartPage } from './components/Auth/StartPage';
import { Home } from './components/Home';
import { UserPage } from './components/Auth/UserPage';
import { Layout } from './components/Layout';
import { ServiceLog } from './components/Service/ServiceLog';
import { AddService } from './components/Service/AddService';
import { ProviderList } from './components/Service/ProviderList';
import SessionManager from "./components/Auth/SessionManager";
import { RequestAccess } from "./components/Auth/RequestAccess";
import { Notification } from "./components/Notification";
import './custom.css';
import { VehiclePage} from './components/Vehicle/VehiclePage';
import { AddVehicle } from './components/Vehicle/AddVehicle';
import { EditVehicle } from './components/Vehicle/EditVehicle';
import { DeleteVehicle } from './components/Vehicle/DeleteVehicle';



export default class App extends Component {
    static displayName = App.name;

    render() {
        console.log(SessionManager.getToken());
        
        return (
            SessionManager.getToken() != null ? (
                <Layout>
                    <Route exact path='/home' component={Home} />
                    <Route path='/user' component={UserPage} />
                    <Route path='/provider-list' component={ProviderList} />
                    <Route path='/request-access' component={RequestAccess} />
                    <Route path='/notifications' component={Notification} />
                    <Route path='/vehicle' component={VehiclePage} />
                    <Route path='/add-vehicle' component={AddVehicle} />
                    <Route path='/edit-vehicle' component={EditVehicle} />
                    <Route path='/delete-vehicle' component={DeleteVehicle} />
                    <Route path='/add-service' component={AddService}/>
                    <Route path='/service-log' component={ServiceLog}/>

                </Layout>
            ) : (
                    <Route path='/' component={StartPage} />
            )
        );
    }
}
