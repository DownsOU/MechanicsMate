import React, { Component } from 'react';
import {
    Button,
} from 'reactstrap';
import SessionManager from "./SessionManager";

export class RequestAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestedEmail = ''
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onRequestClick() {

    }
    
}