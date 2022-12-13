import React, {
    Component
} from 'react';
import {
    Button
} from 'reactstrap';

export class ProviderList extends Component {
    constructor(props) {
        super();

        this.state = {
            providers: []
        }

    }

    componentDidMount() {
        fetch('api/User/GetServiceProviderList', {
            method: 'GET',
            headers: {
                "access-control-allow-origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((Response) => Response.json())
            .then((result) => {

                this.setState({ providers: result });
                console.log(this.state.requests);
            });
    }

    render() {
        return (
            <div>
                <h5>Service Providers:</h5>
                {this.state.providers.map(provider => {
                    return (
                        <div>
                            <br />
                            <div style={{ display: "inline-block" }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                {provider.firstName + " " + provider.lastName}
                                &nbsp;
                                {provider.email}
                                &nbsp;
                                <Button href={"mailto:"+ provider.email}>Contact</Button>
                            </div>
                            <br />
                        </div>
                    );
                })}
            </div>
        );
    }
}

