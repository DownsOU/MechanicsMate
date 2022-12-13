import React, {
    Component
} from 'react';
import {
    Button,
    Form,
    Input,
} from 'reactstrap';
import SessionManager from "../Auth/SessionManager";


export class AddVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: sessionStorage.getItem('userType'),
            makelist: [],
            vmake: '',
            yearlist: [],
            vyear: '',
            modellist: [],
            vmodel: '',
            vDisplayName: [],
            vName: '',
            vDetail: {},
            data: false,
            txtMileage: '',
            txtDrivingHabit: '',
            custList: [],
            cid: sessionStorage.getItem('userId')
        }
        this.onMakeSeleteChange = this.onMakeSeleteChange.bind(this);
        this.onYearSeleteChange = this.onYearSeleteChange.bind(this);
        this.onModelSeleteChange = this.onModelSeleteChange.bind(this);
        this.onVNameChange = this.onVNameChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCustChange = this.onCustChange.bind(this);
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
        
        fetch('api/Vehicle/GetAllMakes', {
            method: 'GET',
            headers: {
                "access-control-allow-origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + SessionManager.getToken()
            }
        }).then((Response) => Response.json())
            .then((result) => {

                this.setState({
                    makelist: result
                });
                this.setState({
                    makelist: this.state.makelist.sort()
                })
            })


    }

    getYear() {
        fetch('api/Vehicle/GetAllYear',
            {
                method: 'POST',
                headers: {
                    "access-control-allow-origin": "*",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    make: this.state.vmake
                })
            }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    yearlist: result
                });
                this.setState({
                    yearlist: this.state.yearlist.sort()
                })

            });
    }
    getModel() {
        fetch('api/Vehicle/GetAllModel',
            {
                method: 'POST',
                headers: {
                    "access-control-allow-origin": "*",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    make: this.state.vmake,
                    year: this.state.vyear
                })
            }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    modellist: result
                });
                this.setState({
                    modellist: this.state.modellist.sort()
                })
            });
    }

    getVehicleDisplayName() {
        fetch('api/Vehicle/GetAllVehicleDisplayName',
            {
                method: 'POST',
                headers: {
                    "access-control-allow-origin": "*",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    make: this.state.vmake,
                    year: this.state.vyear,
                    model: this.state.vmodel
                })
            }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    vDisplayName: result
                });
                this.setState({
                    vDisplayName: this.state.vDisplayName.sort()
                })
            });
    }

    getDetails() {
        fetch('api/Vehicle/GetDetails',
            {
                method: 'POST',
                headers: {
                    "access-control-allow-origin": "*",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    make: this.state.vmake,
                    year: this.state.vyear,
                    model: this.state.vmodel,
                    vname: this.state.vName
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

    insertCar() {
        fetch('api/Vehicle/AddCar',
            {
                method: 'POST',
                headers: {
                    "access-control-allow-origin": "*",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    OwnerId: this.state.cid,
                    VehicleInfoId: this.state.vDetail.ymmId,
                    Mileage: this.state.txtMileage,
                    DrivingHabit: this.state.txtDrivingHabit
                })
            }).then((Response) => Response.json())
            .then((result) => {
                if (result == "Success") {
                    window.location.href = "/home";
                }
                else {
                    alert("Error adding Car");
                }
                console.log(result);
            });
    }

    getMake() {
        fetch('api/Vehicle/GetAllMakes', {
            method: 'GET',
            headers: {
                "access-control-allow-origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + SessionManager.getToken()
            }
        }).then((Response) => Response.json())
            .then((result) => {

                this.setState({
                    makelist: result
                });
                this.setState({
                    makelist: this.state.makelist.sort()
                })
            })
    }

    onMakeSeleteChange(e) {

        var newmake = e.target.value;

        this.state.vmake = newmake;

        this.getYear();
    }

    onYearSeleteChange(e) {

        var newyear = e.target.value;

        this.state.vyear = newyear;

        this.getModel();
    }
    onModelSeleteChange(e) {
        var newModel = e.target.value;

        this.state.vmodel = newModel;

        this.getVehicleDisplayName();
    }
    onVNameChange(e) {
        var newName = e.target.value;
        this.state.vName = newName;
        this.getDetails();
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }
    onSave() {
        this.insertCar();
    }
    onCustChange(e) {
        console.log(this.state.cid);
        var newName = e.target.value;
        var myarr = newName.split("_");

        var newid = myarr[0];
        this.state.cid = newid;
        console.log(this.state.cid);
        this.getMake();
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
                <Form>
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
                        id='vehicleMake'
                        type='select'
                        onChange={(e) => this.onMakeSeleteChange(e)}>

                        <option stlyle={mystyle} selected disabled>Make</option>
                        {this.state.makelist.map(item => (
                            <option value={item}>{item}</option>
                        ))}
                    </Input>
                    <Input style={mystyle}
                        id='vehicleYear'
                        type='select'
                        onChange={(e) => this.onYearSeleteChange(e)}
                    >
                        <option style={mystyle} selected disabled>Year</option>
                        {this.state.yearlist.map(item => (
                            <option value={item}>{item}</option>
                        ))}

                    </Input>
                    <Input style={mystyle}
                        id='vehicleModel'
                        type='select'
                        onChange={(e) => this.onModelSeleteChange(e)}
                    >
                        <option style={mystyle} selected disabled>Model</option>
                        {this.state.modellist.map(item => (
                            <option value={item}>{item}</option>
                        ))}

                    </Input>
                    <Input style={mystyle}
                        id='vehicleDisplayName'
                        type='select'
                        onChange={(e) => this.onVNameChange(e)}
                    >
                        <option style={mystyle} selected disabled>VehicleDisplayName</option>
                        {this.state.vDisplayName.map(item => (
                            <option value={item}>{item}</option>
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
                            id='txtMileage'
                            placeholder='Enter Car Mileage'
                            type='text'
                            onChange={(e) => this.onChange(e)}> </Input>
                    }

                    {this.state.data === true &&

                        <Input style={mystyle}
                            id='txtDrivingHabit'
                            placeholder='Enter Driving Habit'
                            onChange={(e) => this.onChange(e)}
                            type='text'> </Input>
                    }
                    <Button style={{ padding: "2%" }} onClick={this.onSave}>
                        Save Car
                    </Button>

                    <Button style={{
                        padding: "2%",
                        margin: "2%"
                    }}    >
                        Reset
                    </Button>
                </Form>
            </div>
        );
    }
}
