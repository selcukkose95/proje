import React, { Component } from 'react';
import '../stylesheet/Baslik.css';
import '../stylesheet/Public.css';
import Account from './AccountsUIWrapper.js';

class Baslik extends Component {
    
    gitGiris(){
        FlowRouter.go("/");
    }
    
    render() {
        return (
            <div id="baslik">
                <img id="logo" onClick={this.gitGiris.bind(this)} src="./images/karıncakucuk.png"/>
                <Account/>
            </div>
        );
    }
}

export default Baslik;