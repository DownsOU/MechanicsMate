import React, {
    Component
} from 'react';
import {
    Button,
    Form,
    Input,
} from 'reactstrap';
import SessionManager from "../Auth/SessionManager";

export class EditVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role= sessionStorage.getItem('userType'),
            carList: [],
            data: false,
            vName: '',
            vDetail: {},
            carId: '',
            Mileage_Driving: {},
            Mileage: '',
            Driving: '',
            newMileage: 0,
            newDrivingHabit: 0,
            custList: [],
            cid: sessionStorage.getItem('userId')
        }
        this.onCarSelete = this.onCarSelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.UpdateCar = this.UpdateCar.bind(this);
    }
    componentDidMount() {
        if (this.state.role == 'S') {
            fetch('api/Vehicle/GetCustList', {
                method: 'POST',
                headers: {
                    "access-control-allow-origin": "*",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + SessionManager.getToken()
                },
                body: JSON.stringify({
                    uid: sessionStorage.getItem('userId')
                })
            }).then((Response) => Response.json())
                .then((result) => {
                    console.log(result);
                    this.setState({
                        custList: result
                    });
                    this.setState({
                        custList: this.state.custList.sort()
                    })
                })
        }
        else {
            fetch('api/Vehicle/GetAllCar', {
                method: 'POST',
                headers: {
                    "access-control-allow-origin": "*",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + SessionManager.getToken()
                },
                body: JSON.stringify({
                    uid: this.state.cid
                })
            }).then((Response) => Response.json())
                .then((result) => {
                    console.log(result);
                    this.setState({
                        carList: result
                    });
                    this.setState({
                        carList: this.state.carList.sort()
                    })
                })
        }
    }

    getDetails() {
        fetch('api/Vehicle/GetData',
            {
                method: 'POST',
                headers: {
                    "access-control-allow-origin": "*",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    make: this.state.vName
                })
            }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    vDetail: result
                })
                console.log(this.state.vDetail);

                this.setState({
                    data: true
                })

            });
    }

    getVehileDetails() {
        fetch('api/Vehicle/GetMileage_Driving',
            {
                method: 'POST',
                headers: {
                    "access-control-allow-origin": "*",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid: this.state.carId
                })
            }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    Mileage_Driving: result,
                    Mileage: result[0].key,
                    Driving: result[0].value
                })
                this.setState({
                    data: true
                })

                console.log(this.state.Mileage);
                console.log(this.state.Driving);

            });
    }

    UpdateCar() {
        alert("Are you sure you want to Update your Car Information?");
        fetch('api/Vehicle/UpdateCarDetails',
            {
                method: 'POST',
                headers: {
                    "access-control-allow-origin": "*",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Id: this.state.carId,
                    Mileage: this.state.newMileage,
                    DrivingHabit: this.state.newDrivingHabit
                })
            }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                if (result == "Success") {
                    window.location.href = "/vehicle";
                }
                else {
                    alert("Error Updating Car");
                }
            });
    }

    getCar() {
        fetch('api/Vehicle/GetAllCar', {
            method: 'POST',
            headers: {
                "access-control-allow-origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + SessionManager.getToken()
            },
            body: JSON.stringify({
                uid: this.state.cid
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    carList: result
                });
                this.setState({
                    carList: this.state.carList.sort()
                })
            })
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    onCarSelete(e) {
        var newName = e.target.value;
        var myarr = newName.split("_");

        var newid = myarr[0];
        var name = myarr[1];

        this.state.vName = name;
        this.state.carId = newid;

        this.getDetails();
        this.getVehileDetails();
    }

    onUpdate() {
        this.UpdateCar();
    }

    onCustChange(e) {
        console.log(this.state.cid);
        var newName = e.target.value;
        var myarr = newName.split("_");

        var newid = myarr[0];
        this.state.cid = newid;
        console.log(this.state.cid);
        this.getCar();
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

        return (
            <div style={center}>
                <h2 style={{ padding: "4%" }}>Welcom to Mechanics Mate</h2>
                {this.state.role == 'S' &&
                    <Input style={mystyle}
                        id='Customers'
                        type='select'
                        onChange={(e) => this.onCustChange(e)}
                    >
                        <option style={mystyle} selected disabled>Customers</option>
                        {this.state.custList.map(item => (
                            <option key={String(item.key)} value={item.key + '_' + item.value}>{item.value}</option>
                        ))}
                    </Input>
                }

                    <Input style={mystyle}
                        id='carList'
                        type='select'
                        onChange={(e) => this.onCarSelete(e)}
                    >
                        <option stlyle={mystyle} selected disabled>Select Car</option>
                        {this.state.carList.map(item => (
                            <option key={String(item.key)} value={item.key + '_' + item.value}>{item.value}</option>
                        ))}
                    </Input>

                    {this.state.data === true &&
                        <p stlyle={mystyle}
                            id='vehicleDetails'
                        >
                            <b>Make : </b> {this.state.vDetail.make} <br></br>

                            <b>Model: </b> {this.state.vDetail.model}<br></br>

                            <b>Year: </b> {this.state.vDetail.year}<br></br>

                            <b>Engine: </b> {this.state.vDetail.engine}<br></br>

                            <b>EngineLiterDisplay: </b> {this.state.vDetail.engineLiterDisplay}<br></br>

                            <b>Submodel: </b> {this.state.vDetail.submodel}<br></br>

                            <b>Trim: </b> {this.state.vDetail.trim}<br></br>

                            <b>Body</b> {this.state.vDetail.body}<br></br>

                            <b>Vehicle Display Name:</b> {this.state.vDetail.vehicleDisplayName}<br></br>
                        </p>
                    }
                    {this.state.data === true &&


                        <Input style={mystyle}
                            id='newMileage'
                            placeholder={this.state.Mileage}
                            type='number'
                            onChange={(e) => this.onChange(e)}> </Input>
                    }

                    {this.state.data === true &&

                        <Input style={mystyle}
                            placeholder={this.state.Driving}
                            id='newDrivingHabit'
                            onChange={(e) => this.onChange(e)}
                            type='number'> </Input>
                    }
                    <Button style={{ padding: "2%" }} onClick={this.UpdateCar}>
                        Update Car
                    </Button>

                    <Button style={{
                        padding: "2%",
                        margin: "2%"
                    }}    >
                        Reset
                    </Button>
            </div >
        );
    }
}

