import React, { Component } from 'react';
import User from "../../Models/User";

import {
    Button,
    Form,
    Input,
} from 'reactstrap';
var date = new Date();
// var today = new Date().toJSON().slice(0,10);
var today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON();
console.log('TODAY');
console.log(today);

export class AddService extends Component {
    constructor(props) {
        super();
        this.state = {
            date:today,
            user: {},
            currentVehicle: {},
            selectedService: {},
            vehicleList: [],
            serviceTypes: [],
            vehicleId: {},
            customService:"",
            customInterval: 0,
            service:"",
            serviceNotes:"",
            ownerVehicles:[],
            invoicePath:"",
            vId: 0

        }

        this.onServiceTypeChange = this.onServiceTypeChange.bind(this);
        this.setCustomService = this.setCustomService.bind(this);
        this.submitService = this.submitService.bind(this);
    }

    componentDidMount() {
        fetch('api/User/GetCurrentUserDetails', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: sessionStorage.getItem('userEmail')
            })  
        }).then((Response) => Response.json())
            .then((result) => {
                console.log('getCustomerInfo');
                console.log(result);
                this.setState({
                    user: {
                        userid: result.userId,
                        email: result.email,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        userType: result.userType
                    }
                });
            }).then(
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
            })).then(
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
                    }))
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
                        })
                    ;
        }
    submitService(e){
        console.log('Submit Service');
        console.log(
            JSON.stringify({
                ServicerId: this.state.user.userid,
                ServiceTypeId:this.state.selectedService.servicetypeid,   
                VehicleId:this.state.vId,
                CustomServiceName:this.state.customService,
                CustomServiceInterval: this.state.customInterval,
                ServiceDate:this.state.date,
                ServiceNotes:this.state.serviceNotes,
                CurrentMileage:this.state.currentVehicle.mileage,
                InvoicePath: this.state.invoicePath
                })
        );
        fetch('api/User/AddService', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ServicerId: this.state.user.userid,
                ServiceTypeId:this.state.selectedService.servicetypeid,           
                VehicleId:this.state.vId,
                CustomServiceName:this.state.customService,
                CustomServiceInterval: this.state.customInterval,
                CurrentMileage:this.state.currentVehicle.mileage,
                ServiceDate:this.state.date,
                ServiceNotes:this.state.serviceNotes,
                InvoicePath: this.state.invoicePath

            })
        }).then((Response) => Response.text())
            .then((result) => {
                console.log(result);});
    }
    setServiceNotes(e){
        this.setState({serviceNotes:e.target.value})
    }
    onServiceTypeChange(e) {
        this.setState({service: e.target.value});
    }

    setCustomService(e) {
        this.setState({customService:e.target.value});
    }
    setCustomInterval(e) {
        this.setState({ customInterval: e.target.value });
    }
    setServiceType(e){
        console.log("set service type");
        console.log(e.target.value)
        if (e.target.value ==="Custom Service"){
            this.setState({service:e.target.value})}
        try{
        var serviceType = this.state.serviceTypes.find(x=> x.serviceName === e.target.value);
        console.log(serviceType);
        this.setState({
            selectedService:{
                servicetypeid: serviceType.serviceTypeId,
                servicename: serviceType.serviceName,
                serviceinterval: serviceType.serviceInterval
            },
            service: e.target.value
        })
    }
        catch(error){
            console.log(error);
        }
    }   
    setVehicleId(e){
        try{
        console.log('selectVehicle');
        var selectedVehicle = this.state.vehicleList.find(x=> x.ymmId===e.target.value);
        var selectedOwner = this.state.ownerVehicles.find(x=> x.vehicleInfoId===e.target.value);
        this.setState({
            currentVehicle: {
                engine : selectedVehicle.engine,
                id :selectedVehicle.ymmId,
                make : selectedVehicle.make,
                model : selectedVehicle.model,
                year : selectedVehicle.year,
                trim : selectedVehicle.trim,
                mileage: selectedOwner.mileage
            },
            vId : selectedOwner.vehicleId
        }
        )
    console.log(this.state.currentVehicle.make)}
        catch(error){
            console.log(error);
        } 
    }

    render(vehicleList) {
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
        
        return (
            <html>
            <body>
            <div style={center}>
                <h2 style={{ padding: "4%" }}>Add Service</h2>
                <Form>
                    <Input style={mystyle}
                        id='selectcar'
                        type='select'
                        onChange={(e) => this.setVehicleId(e)}
                        >
                        <option value="">Select Vehicle</option>  
                        {this.state.vehicleList.map((vehicle) => {
                            return (
                            <option key={vehicle.ymmId} value={vehicle.ymmId}>
                            {vehicle.vehicleDisplayName}
                            </option>
                            );})
                        }
                        </Input>
                    <Input style={mystyle}
                        id='servicetype'
                        type='select'
                        onChange={(e) =>this.setServiceType(e)} >
                        <option value="">Select Service</option>  
                        <option>
                            Oil Change
                        </option>
                        <option>
                            Tire Rotation
                        </option>
                        <option>
                            Tire Replacement
                        </option>
                        <option>
                            Air Filter
                        </option>
                        <option>
                            Transmission Fluid
                        </option>
                        <option>
                            Spark Plugs
                        </option>
                        <option>
                            Car Battery
                        </option>
                        <option>
                            Custom Service
                        </option>


                    </Input>
                    <Input
                    style={mystyle}
                    id='servicenotes'
                    placeholder='Enter Service Notes'
                    type='text'
                    onChange={(e)=>this.setServiceNotes(e)}
                    />

                    {this.state.service === "Custom Service" &&
                        <Input
                            style={mystyle}
                            id='customservice'
                            placeholder='Enter Custom Service Name'
                            type='text' 
                            onChange={(e) =>this.setCustomService(e)} 
                            required
                            />
                        }
                    {this.state.service === "Custom Service" &&
                        <Input
                            style={mystyle}
                            id='custominterval'
                            placeholder='Enter Custom Interval'
                            type='number'
                            onChange={(e) =>this.setCustomInterval(e)} 
                            required
                            />
                        }
                    <Button
                        type="submit"
                        onClick={this.submitService}
                        >
                        Submit
                    </Button>
                </Form>
                
            </div>

            </body>
            
            </html>
            

        );
    }
}