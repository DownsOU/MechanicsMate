import React, { Component } from 'react';
import {
    Button,
} from 'reactstrap';
import SessionManager from "./SessionManager";
import User from "../../Models/User";


export class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }

        this.logOut = this.logOut.bind(this);
        this.delete = this.delete.bind(this);
    }

    logOut() {
        SessionManager.removeUserSession();
        window.location.href = "/login";
    }

    delete() {
        alert("Are you sure you want to delete your account?");
        fetch('api/User/DeleteCurrentUser', {
            method: 'POST',
            headers: {
                "access-control-allow-origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + SessionManager.getToken()
            },
            body: JSON.stringify({
                email: sessionStorage.getItem('userEmail')
            })
        }).then(() => {
            SessionManager.removeUserSession();
            window.location.href = "/login"
        });

    }

    componentDidMount() {
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
    }
    render() {
        return (
            <div>
                <h3> User Information</h3>
                <br />
                <div style={{ display: "inline-flex" }}>
                    <b> Email:&nbsp;</b>
                    <p>{this.state.user.email}</p>
                </div>
                <br />
                <div style={{ display: "inline-flex" }}>
                    <b> Name:&nbsp;</b>
                    <p>{this.state.user.firstName + " " + this.state.user.lastName}</p>
                </div>
                <br />
                <div style={{ display: "inline-flex" }}>
                    <b> User Type:&nbsp;</b>
                    <p>{this.state.user.userType === 'S' ? "Service Provider" : "Vehicle Owner"}</p>
                </div>
                <br />
                {this.state.user.userType === 'S' &&
                    <input type='button' href='auth/requestaccess'>
                        Request User Vehicle Access
                    </input>
                }
                <Button
                    onClick={this.logOut}>
                    Log Out
                </Button>
                &nbsp;
                <Button
                    onClick={this.delete}>
                    Delete Account
                </Button>
            </div>
        );
    }
}