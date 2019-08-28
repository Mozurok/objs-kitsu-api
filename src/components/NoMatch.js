import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class NoMatch extends Component {
  componentDidMount(){
    // this.props.handlerGetAllFarms()
  }
  render() {
    return (<Redirect to="/" />);
  }
}

export default NoMatch;
