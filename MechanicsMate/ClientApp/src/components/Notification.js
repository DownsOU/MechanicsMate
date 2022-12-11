﻿import React, { Component } from 'react';
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

    approveRequest(request) {
        fetch('api/User/ApproveOrRejectRequest', {
            method: 'POST',
            headers: {
                "access-control-allow-origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + SessionManager.getToken()
            },
            body: JSON.stringify({
                OwnerId: request.vehicleOwnerID,
                ServiceProviderId: request.serviceProviderId,
                ApproveReject: "Approve"
            })
        }).then((Response) => Response.json())
            .then((result) => {
                if (result == "success") {
                    window.location.reload();
                }
                else {
                }
                console.log(result);
            });
    }

    rejectRequest(request) {
        fetch('api/User/ApproveOrRejectRequest', {
            method: 'POST',
            headers: {
                "access-control-allow-origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + SessionManager.getToken()
            },
            body: JSON.stringify({
                OwnerId: request.vehicleOwnerID,
                ServiceProviderId: request.serviceProviderId,
                ApproveReject: "Reject"
            })
        }).then((Response) => Response.json())
            .then((result) => {
                if (result == "success") {
                    window.location.reload();
                }
                else {
                }
                console.log(result);
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
                                <Button onClick={() => this.approveRequest(request)}>Accept</Button>
                                &nbsp;
                                <Button onClick={() => this.rejectRequest(request)}>Reject</Button>
                            </div>
                            <br />
                        </div>
                    );
                })}
            </div>
        );
    }
}