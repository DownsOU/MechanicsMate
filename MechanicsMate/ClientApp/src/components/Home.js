import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome To Mechanics Mate!</h1>
        <p>Mechanics Mate is an application for vehicle owners and service providers to maintain vehicle records. Please use the menu to navigate.</p>
      </div>
    );
  }
}
