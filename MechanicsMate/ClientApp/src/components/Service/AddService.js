import React, { Component, useRef } from 'react';
import User from "../../Models/User";

import {
    Button,
    Form,
    Input,
} from 'reactstrap';
import SessionManager from "../Auth/SessionManager";
import '../../custom.css';

var date = new Date();
// var today = new Date().toJSON().slice(0,10);
var today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON();
export class AddService extends Component {
    constructor(props) {
        super();
        this.state = {
            currentVehicleId:{},
            servicerVehciles:[],
            servicerAccounts: [],
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
            vId: 0,
            ownerId: 0,
            mileage:0

        }
        this.onServiceTypeChange = this.onServiceTypeChange.bind(this);
        this.setCustomService = this.setCustomService.bind(this);
        this.submitService = this.submitService.bind(this);

        this.invoiceInput = React.createRef();

    }

    async componentDidMount() {
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
            })
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
            })
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
        await fetch('api/User/GetServicerAccess', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                servicerAccess: sessionStorage.getItem('userId')
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log("Servicer Accessible vehicles")
                this.setState({
                    servicerVehciles: result.map(a => a.vehicleOwnerId)
                })
                console.log(this.state.servicerVehciles)
            })
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
        await fetch('api/User/GetServicerVehicles', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                serviceVehicleId: this.state.servicerVehciles
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log(result)
                this.setState({
                    servicerAccounts: result
                })
                console.log("servicerAccounts2")
                console.log(this.state.servicerAccounts);
            });
    }

    submitService() {
        var formData = new FormData();
        formData.append('serviceCreate', JSON.stringify({
            ServicerId: this.state.user.userid,
            ServiceTypeId: this.state.selectedService.servicetypeid,
            VehicleId: this.state.vId,
            CustomServiceName: this.state.customService,
            CustomServiceInterval: this.state.customInterval,
            CurrentMileage: this.state.mileage,
            ServiceDate: this.state.date,
            ServiceNotes: this.state.serviceNotes,
            InvoicePath: this.state.invoicePath

        }));
        formData.append('invoice', this.invoiceInput.current.files[0]);
        console.log(formData);

        console.log('Submit Service');
        fetch('api/User/AddService', {
            method: 'POST',
            body: formData
        }).then((Response) => Response.text())
            .then((result) => {
                console.log(result);});
        alert("Service Successfully added");
        window.location.reload();
    }
    setServiceNotes(e){
        this.setState({serviceNotes:e.target.value})
    }
    setOwnerId(e){
        this.setState({ownerId:e.target.value})
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

    setMileage(e) {
        this.setState({ mileage: e.target.value})
    }
    setServiceType(e){
        console.log(this.state.servicerAccounts)
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
    async ymmToVehicleId(ymm)
    {
        await fetch('api/User/ymmToVehicleId', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ymmId: ymm
            })
        }).then((Response) => Response.json())
            .then((result) => {  
                this.setState({
                    currentVehicleId: result.vehicleId
                });
            });

    }
    async setVehicleId(e){
        try{
        console.log('selectVehicle');
        var selectedVehicle = this.state.vehicleList.find(x=> x.ymmId==e.target.value);
        await this.ymmToVehicleId(e.target.value);
        var vehicleId = this.state.currentVehicleId
        this.setState({
            currentVehicle: {
                engine : selectedVehicle.engine,
                id :selectedVehicle.ymmId,
                make : selectedVehicle.make,
                model : selectedVehicle.model,
                year : selectedVehicle.year,
                trim : selectedVehicle.trim,
                mileage: selectedVehicle.mileage
            },
            vId : vehicleId
        })}
        catch(error){
            console.log(error);
        } 
    }
    async setServicerVehicles(e){
        await this.setOwnerId(e)
        fetch('api/User/GetVehicle', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ownerId: this.state.ownerId
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log('servicerAccounts1');
                this.setState({
                    vehicleList: result
                });
                console.log(this.state.vehicleList);
            })

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
            <div style={center}>
                <h2 style={{ padding: "4%" }}>Add Service</h2>
                
                    {this.state.user.userType === "S" &&
                    <Input style={mystyle}
                    id='selectAccount'
                    type='select'
                    onChange={(e) => this.setServicerVehicles(e)}>
                    <option value="">Select Customer's Account</option>  
                        {this.state.servicerAccounts.map((accounts) => {
                        return (
                        <option key={accounts.userId} value={accounts.userId}>
                        {accounts.firstName} {accounts.lastName}
                        </option>);})
                        }
                    </Input>
                    }
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

                <Input style={mystyle}
                    id="mileage"
                    placeholder="Current Mileage"
                    type="number"
                    onChange={(e) => this.setMileage(e)}
                    required
                />

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
                        onChange={(e) => this.setCustomService(e)}
                        required
                    />
                }
                {this.state.service === "Custom Service" &&
                    <Input
                        style={mystyle}
                        id='custominterval'
                        placeholder='Enter Custom Interval'
                        type='number'
                        onChange={(e) => this.setCustomInterval(e)}
                        required
                    />
                }
                <label className="label">
                    <input type="file" name="invoiceInput" multiple={false} ref={this.invoiceInput} />
                    <span>Upload Invoice File</span>
                </label>
                <br />
                <br/>
                <Button
                    onClick={() => this.submitService()}>
                    Submit
                </Button>

            </div>
                        

        );
    }
    }