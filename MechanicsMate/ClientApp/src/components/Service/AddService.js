import React, { Component } from 'react';
import {
    Button,
    Form,
    Input,
} from 'reactstrap';

export class AddService extends Component {
    constructor(props) {
        super();

        this.state = {
            vehicle: 0,
            service: ''
        }

        this.onServiceTypeChange = this.onServiceTypeChange.bind(this);
        this.onCustomServiceTypeChange = this.onCustomServiceTypeChange.bind(this);
    }

    onServiceTypeChange(e) {
        this.setState({service: e.target.value});
    }

    onCustomServiceTypeChange(e) {
        this.setState({ service: e.target.value });
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
                <h2 style={{ padding: "4%" }}>Add Service</h2>
                <Form>
                    <Input style={mystyle}
                        id='selectcar'
                        placeholder='Select Car'
                        type='text'
                        onChange={this.onSelectCarChange} />

                    <Input style={mystyle}
                        id='servicetype'
                        type='select'
                        onChange={this.onServiceTypeChange} >
                        <option style={mystyle} selected disabled>Select Service</option>

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

                    {this.state.service === "Custom Service" &&
                        <Input
                            style={mystyle}
                            id='customservice'
                            placeholder='Enter Custom Service'
                            type='text'
                            onChange={this.onCustomServiceChange} />}
                    <Button
                        onClick={this.submit}>
                        Submit
                    </Button>
                </Form>
            </div>

        );
    }
}