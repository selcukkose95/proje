
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';


export default class AccountsUIWrapper extends Component{

    componentDidMount(){

        Blaze.render(
            Template.loginButtons,
            ReactDOM.findDOMNode(this.refs.container)
        );
    }

    componentWillUnMount(){

        Blaze.remove(this.view);
    }

    render(){
        return <span ref="container" id="container"/>
    }
}