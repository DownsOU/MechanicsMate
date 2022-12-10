import React, {
    Component
} from 'react'; import {
    Button,
    Form,
    Input,
} from 'reactstrap';
import SessionManager from "../Auth/SessionManager";

export class DeleteVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carList: [],
            data: false,
            vName: '',
            vDetail: {},
            carId: ''
        }
        this.GetDetail = this.GetDetail.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    componentDidMount() {
        fetch('api/Vehicle/GetAllCar', {
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
                    carList: result
                });
            })
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

    RemoveCar() {
        alert("Are you sure you want to delete your Car?");
        fetch('api/Vehicle/DeleteVehicle', {
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
                if (result == "Success") {
                    window.location.href = "/home";
                }
                else {
                    alert("Error Deleting Car");
                }
                console.log(result);
            });
    }

    GetDetail(e) {
        var newName = e.target.value;
        var myarr = newName.split("_");

        var newid = myarr[0];
        var name = myarr[1];

        this.state.vName = name;
        this.state.carId = newid;

        this.getDetails();

    }

    onDelete() {
        console.log(this.state.carId);
        this.RemoveCar();
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

                    <Input style={mystyle}
                        id='carList'
                        type='select'
                        onChange={(e) => this.GetDetail(e)}
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
                    <Button style={{ padding: "2%" }} onClick={this.onDelete}>
                        Delete Car
                    </Button>

                    <Button style={{
                        padding: "2%",
                        margin: "2%"
                    }}    >
                        Reset
                    </Button>
                </Form>
            </div >
        );
    }
}