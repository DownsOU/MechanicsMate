import React, { Component } from 'react';
import {
    Button,
    Input
} from 'reactstrap';
import SessionManager from "./SessionManager";


export class RequestAccess extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            userType: sessionStorage.getItem('userType'),
            requests: []
        }
        this.onChange = this.onChange.bind(this);
        this.onRequestClick = this.onRequestClick.bind(this);
    }

    componentDidMount() {
        console.log(this.state.userType);
        if (this.state.userType === 'O') {
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

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onRequestClick(e) {
        fetch('api/User/RequestUserAccess', {
            method: 'POST',
            headers: {
                "access-control-allow-origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + SessionManager.getToken()
            },
            body: JSON.stringify({
                RequestorUserId: sessionStorage.getItem('userId'),
                RequestedUserEmail: this.state.email
            })
        }).then(() => {
            console.log("Requested")
            this.setState({ requestedEmail: '' });
            window.location.href = "/user";
        });
    }

    render() {
        return (
            <div>
                {this.state.userType === 'S' &&
                    <div>
                        <Input
                            name='email'
                            placeholder='Email'
                            type='email'
                            onChange={this.onChange} />
                        <br />
                        <Button
                            onClick={this.onRequestClick}>Request Vehicle Access</Button>
                    </div>
                }
            </div>
        )

    }

}