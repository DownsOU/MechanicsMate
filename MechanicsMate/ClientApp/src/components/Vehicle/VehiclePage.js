import React, {
    Component
} from 'react';
import {
    Button,
    Form,
    Input,
} from 'reactstrap';


export class VehiclePage extends Component {

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

                    <Button href="/add-vehicle" style={{ padding: "2%" }}>
                        Add Car
                    </Button>
                    <br />
                    <br />
                    <Button href="/edit-vehicle" style={{ padding: "2%" }}>
                        Edit Car
                    </Button><br /><br />
                    <Button href="/delete-vehicle" style={{ padding: "2%" }}>
                        Delete Car
                    </Button>
                </Form>
            </div>
        );
    }
}
