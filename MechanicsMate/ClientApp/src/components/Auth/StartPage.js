import React, { Component } from 'react';
import {
    Button,
    Form,
    Input,
} from 'reactstrap';
import SessionManager from "./SessionManager";


export class StartPage extends Component {
    constructor(props) {
        super();

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            userType: '',
            isSignUp: false
        }

        this.onChange = this.onChange.bind(this);

        this.onSignUpClick = this.onSignUpClick.bind(this);

        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSignUpClick(e) {
        if (this.state.isSignUp === false) {
            this.setState({ isSignUp: true });
        }
        else {
            this.signUp();
        }
    }

    login() {
        console.log(
            JSON.stringify({
                Email: this.state.email,
                Password: this.state.password,
            })
        );
        fetch('api/User/LoginUser', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: this.state.email,
                Password: this.state.password
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                if (result?.token != null) {

                    SessionManager.setUserSession(result.token, result.userId, result.userEmail, result.userType)

                    if (SessionManager.getToken() != null) {
                        window.location.href = "/home";
                    }
                }
                else {
                    alert("Invalid Email or Password");
                }
                console.log(sessionStorage.getItem('userId'));
            });
    }

    signUp() {
        console.log(
            JSON.stringify({
                Email: this.state.email,
                Password: this.state.password,
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                UserType: this.state.userType
            })
        );
        fetch('api/User/AddUser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: this.state.email,
                Password: this.state.password,
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                UserType: this.state.userType.charAt(0)
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                if (result?.token != null) {

                    SessionManager.setUserSession(result.token, result.userId, result.userEmail, result.usersRole)

                    if (SessionManager.getToken() != null) {
                        window.location.href = "/home";
                    }
                }
                else {
                    alert("Error adding user");
                }
            });
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
            <div className="flex-row align-items-center" style={center}>

                <h1>Mechanic's Mate</h1>
                <Form>
                    <Input
                        style={mystyle}
                        name='email'
                        placeholder='Email'
                        type='email'
                        onChange={this.onChange} />
                    <Input
                        style={mystyle}
                        name='password'
                        placeholder='Password'
                        type='password'
                        onChange={this.onChange} />
                    {this.state.isSignUp === true &&
                        <Input
                        style={mystyle}
                            name='firstName'
                            placeholder='First Name'
                            type='text'
                            onChange={this.onChange} />}
                    {this.state.isSignUp === true &&
                        <Input
                        style={mystyle}
                            name='lastName'
                            placeholder='Last Name'
                            type='text'
                            onChange={this.onChange} />}
                    {this.state.isSignUp === true &&
                        <Input
                        style={mystyle}
                            name='userType'
                            type='select'
                            onChange={this.onChange} >
                            <option>
                                Owner
                            </option>
                            <option>
                                Service Provider
                            </option>
                        </Input>}
                    <br/>
                    <Button
                        onClick={this.login}>
                        Log In
                    </Button>
                    &nbsp;
                    <Button
                        onClick={this.onSignUpClick}>
                        Sign Up
                    </Button>
                </Form>
            </div>
        );
    }

}