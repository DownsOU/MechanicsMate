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
            servicerIds:[],
            servicerAccounts: [],
            serviceLog1:[],
            user: [],
            vehicleList: [],
            serviceTypes: [],
            vehicleId: {},
            customService:"",
            customInterval: 0,
            service:"",
            serviceNotes:"",
            ownerVehicles:[],
            invoicePath:"",
            serviceLogs: [],
            sort: {
                column: null,
                direction: 'desc',
              }
        }
        this.onServiceTypeChange = this.onServiceTypeChange.bind(this);
    }
    async componentDidMount() {
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
        await fetch('api/User/GetOwnerVehicles', {
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
                    ownerVehicles: result,
                    servicerVehciles: result.map(a => a.vehicleId)
                });
                console.log(this.state.servicerVehciles);
            });
        try{   
            await fetch('api/User/GetServiceLog1', {
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
                    this.setState({
                        serviceLogs: result,
                        servicerIds: result.map(a => a.servicerId)
                    });
                });
                console.log('servicelogs')
                console.log(this.state.servicerIds)
            } catch(error){}
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
            }); 
        await fetch('api/User/GetServicerVehicles', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                serviceVehicleId: this.state.servicerIds
            }) 
        }).then((Response) => Response.json())
            .then((result) => {
                console.log(result)
                this.setState({
                    servicerAccounts: result})
                console.log("servicerAccounts")
                console.log(this.state.servicerAccounts);
            })  

        }
    onSort = (column) => (e) => {
        const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
        const sortedData = this.state.serviceLogs.sort((a, b) => {
            if (column === 'serviceID') {
            const nameA = a.accountName.toUpperCase(); // ignore upper and lowercase
            const nameB = b.accountName.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
            } else {
            return a.contractValue - b.contractValue;
            }
        });     
        if (direction === 'desc') {
            sortedData.reverse();
        } 
        this.setState({
            serviceLogs: sortedData,
            sort: {
            column,
            direction,
            }
        });
        };
    setArrow = (column) => {
        let className = 'sort-direction';
        
        if (this.state.sort.column === column) {
            className += this.state.sort.direction === 'asc' ? ' asc' : ' desc';
        }
        return className;
    };
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
        try{
        var servicer = this.state.servicerAccounts.find(x=> x.userId ==id);
        return [servicer.firstName," ",servicer.lastName]
            }       
            catch(error){}
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
        }
        catch(error){
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
        }
    }

    getInvoiceFile(log)
    {
        fetch('api/User/GetInvoiceFile?serviceLogId='+ log.serviceLogId, {
            method: 'GET',
            headers: {
                'Accept': 'application/pdf',
            }
        }).then(response => {
            // check if the response is successful
            if (response.ok) {
                // if successful, return the file as a blob
                return response.blob();
            }
        })
            .then(blob => {
                // do something with the file (e.g. display it in the browser)
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = "invoice"+log.serviceLogId+".pdf";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                // handle any errors
                console.error(error);
            });
    }
    render() {
        var newdata = this.state.data;
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
                <th onClick={this.onSort('serviceNotes')}> Service Date <span className={this.setArrow('serviceNotes')}></span></th>
                <th onClick={this.onSort('servicerId')}> Servicer <span className={this.setArrow('serviceId')}></span></th>
                <th onClick={this.onSort('serviceTypeId')}> Service Type <span className={this.setArrow('serviceTypeId')}></span></th>
                <th onClick={this.onSort('vehicleDisplayName')}> Vehicle <span className={this.setArrow('vehicleDisplayName')}></span></th>
                <th onClick={this.onSort('currentMileage')}> Current Mileage <span className={this.setArrow('currentMileage')}></span></th>
                <th onClick={this.onSort('serviceInterval')}> Service Interval <span className={this.setArrow('serviceInterval')}></span></th>
                    <th onClick={this.onSort('serviceNotes')}> Service Notes <span className={this.setArrow('serviceNotes')}></span></th>
                    <th> Invoice File </th>
            </tr>  
        </thead>  
        <tbody>  
            {this.state.serviceLogs.map(log =>      
                <tr key={log.serviceLogId}>  
                    <td>{this.formatDate(log.serviceDate)}</td> 
                    <td>{this.getServicer(log.servicerId)}</td> 
                    <td>{this.getServiceType(log)}</td>  
                    <td>{this.getVehicleName(log.vehicleId)}</td>
                    <td>{log.currentMileage}</td>  
                    <td>{this.getServiceInterval(log)}</td>  
                    <td>{log.serviceNotes}</td>
                    <td>{log.invoicePath != null && <Button onClick={() => this.getInvoiceFile(log)}>Invoice</Button>}</td>
                </tr> )}  
        </tbody>  
    </table>
    }
}