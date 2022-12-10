import React, { Component } from 'react';
import { Button } from 'reactstrap';
import SessionManager from "./Auth/SessionManager";


export class Notification extends Component {
    constructor(props) {
        super();

        this.state = {
            requests: []
        }

    }

    componentDidMount() {
        fetch('api/User/GetPendingRequests?userId=' + sessionStorage.getItem('userId'), {
            method: 'GET',
            headers: {
                "access-control-allow-origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + SessionManager.getToken()
            }
        }).then((Response) => Response.json())
            .then((result) => {

                this.setState({ requests: result });
                console.log(this.state.requests);
            });
    }

    render() {
        return (
            <div>
                <h5>Pending Service Provider Access Requests:</h5>
                {this.state.requests.map(request => {
                    return (
                        <div>
                            <br />
                            <div style={{ display: "inline-block" }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                {request.serviceProviderName}
                                &nbsp;
                                <Button>Accept</Button>
                                &nbsp;
                                <Button>Reject</Button>
                            </div>
                            <br />
                        </div>
                    );
                })}
            </div>
        );
    }
}