import React, { Component } from 'react';
import User from "../../Models/User";

import {
    Button,
    Form,
    Input,
} from 'reactstrap';
export class ServiceLog extends Component {
    constructor(props) {
        super();
        this.state = {
            vehicleList: [],
            serviceTypes: [],
            vehicleId: {},
            customService:"",
            customInterval: 0,
            service:"",
            serviceNotes:"",
            ownerVehicles:[],
            invoicePath:"",
            serviceLogs: []
        }
        this.onServiceTypeChange = this.onServiceTypeChange.bind(this);
    }

    componentDidMount() {
        //get all current user's vehicles names,engine,etc
        fetch('api/User/GetVehicle', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ownerId: sessionStorage.getItem('userId')
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log('getCars');
                this.setState({
                    vehicleList: result
                });
                console.log(this.state.vehicleList);
            })
        //get all service types
        fetch('api/User/GetServiceType', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((Response) => Response.json())
            .then((result) => {
                this.setState({
                    serviceTypes: result
                });
                console.log(this.state.serviceTypes);
            })
        //get all owner vehicle details
        fetch('api/User/GetOwnerVehicles', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ownerId: sessionStorage.getItem('userId')
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log('ownerVehicles');
                this.setState({
                    ownerVehicles: result
                });
                console.log(this.state.ownerVehicles);
            });
        //get service logs for each vehicle
        fetch('api/User/GetServiceLog', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                servicerId: sessionStorage.getItem('userId')
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log('Getting Service Logs');
                console.log(result)
                this.setState({
                    serviceLogs: result
                });
            });
        
                    
        }
    onServiceTypeChange(e) {
        this.setState({service: e.target.value});
    }
    formatDate(date)
    {
        date = date.split('T')[0];
        const [year, month, day] = date.split('-');
        const result = [month, day, year].join('/');      
        return result
    }
    getServicer(id)
    {
        if (id===sessionStorage.getItem('userId')){
            return sessionStorage.getItem('userEmail')
        }
        else{
            return "Servicer Id"
        }
    }
    getServiceType(log)
    {
        try{
        if(log.serviceTypeId===8){
            return log.customServiceName
        }
        else{
            var serviceType = this.state.serviceTypes.find(x=> x.serviceTypeId === log.serviceTypeId);
            return serviceType.serviceName
        }     }
        catch(error){
            console.log(error)
        }  
    }
    getName(ymmId)
    {
        var vehicleDisplayName =  this.state.vehicleList.find(x=> x.ymmId === ymmId);
        return vehicleDisplayName.vehicleDisplayName
    }
    getVehicleName(vehicleId)
    {
        try{
            var vehicleInfoId = this.state.ownerVehicles.find(x=> x.vehicleId === vehicleId);
            var vehicleDisplayName =  this.state.vehicleList.find(x=> x.ymmId === vehicleInfoId.vehicleInfoId);
            return vehicleDisplayName.vehicleDisplayName
            // var result = getName(vehicleInfoId.vehicleInfoId)
            // return result
        }
        catch(error){
            console.log(error)
        }
    }
    getServiceInterval(log)
    {
        try{
            if(log.customServiceInterval>1){
                return log.customServiceInterval
            }
            else{
                var serviceInterval = this.state.serviceTypes.find(x=> x.serviceTypeId === log.serviceTypeId);
                return serviceInterval.serviceInterval
            }
        }
        catch(error){
            console.log(error)
        }
    }
    

    render() {
        const mystyle = {
            fontFamily: "Arial",
            width: "60%",
            border: "2px solid black",
            margin: "0 auto",
            marginTop: "5%",
            marginBottom: "5%",
            textAlign: "center"
        };
        const center = {
            borderRadius: "25px",
            fontFamily: "Arial",
            width: "50%",
            border: "2px solid black",
            margin: "0 auto",
            textAlign: "center",
            paddingBottom: "4%"
        };
        return <table className='table'>  
        <thead>  
            <tr>  
                <th></th>  
                <th>Service Log ID</th>  
                <th>Servicer</th>  
                <th>Service Type</th>  
                <th>Vehicle</th>  
                <th>Current Mileage</th> 
                <th>Service Interval</th>   
                <th>Service Date</th>  
                <th>Service Notes</th>  

            </tr>  
        </thead>  
        <tbody>  
            {this.state.serviceLogs.map(log =>      
                <tr key={log.serviceLogId}>  
                    <td></td>  
                    <td>{log.serviceLogId}</td>  
                    <td>{this.getServicer(log.servicerId)}</td> 
                    <td>{this.getServiceType(log)}</td>  
                    <td>{this.getVehicleName(log.vehicleId)}</td>
                    <td>{log.currentMileage}</td>  
                    <td>{this.getServiceInterval(log)}</td>  
                    <td>{this.formatDate(log.serviceDate)}</td> 
                    <td>{log.serviceNotes}</td>  

                </tr>  
            )}  
        </tbody>  
    </table>;  

    }
}