import React, { Component } from 'react';
import {
    Button,
    Form,
    Input,
} from 'reactstrap';


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

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onUserTypeChange = this.onUserTypeChange.bind(this);
        this.onSignUpClick = this.onSignUpClick.bind(this);
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    onFirstNameChange(e) {
        this.setState({ firstName: e.target.value });
    }

    onLastNameChange(e) {
        this.setState({ lastName: e.target.value });
    }

    onUserTypeChange(e) {
        this.setState({ userType: e.target.value });
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
                if (result.status === "Failure") {
                    localStorage.setItem("authenticated", false);
                }
                else {
                    localStorage.setItem("authenticated", true);
                    this.props.history.push("/dashboard");
                }
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
        }).then(() => console.log("user added"));
    }

    render() {
        return (
            <div className="flex-row align-items-center">

                <h1>Mechanic's Mate</h1>
                <Form>
                    <Input
                        id='email'
                        placeholder='Email'
                        type='email'
                        onChange={this.onEmailChange} />
                    <Input
                        id='password'
                        placeholder='Password'
                        type='password'
                        onChange={this.onPasswordChange} />
                    {this.state.isSignUp === true &&
                        <Input
                            id='firstname'
                            placeholder='First Name'
                            type='text'
                            onChange={this.onFirstNameChange} />}
                    {this.state.isSignUp === true &&
                        <Input
                            id='lastname'
                            placeholder='Last Name'
                            type='text'
                            onChange={this.onLastNameChange} />}
                    {this.state.isSignUp === true &&
                        <Input
                            id='usertype'
                            type='select'
                            onChange={this.onUserTypeChange} >
                            <option>
                                Owner
                            </option>
                            <option>
                                Service Provider
                            </option>
                        </Input>}
                    <Button
                        onClick={this.login}>
                        Log In
                    </Button>
                    <Button
                        onClick={this.onSignUpClick}>
                        Sign Up
                    </Button>
                </Form>
            </div>
        );
    }

}