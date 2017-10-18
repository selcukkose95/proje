import React from 'react';
import '../../../stylesheet/Public.css';

export default class IlceMadde extends React.Component{
     render(){
        return(
             <option>{this.props.il.ilce_ad}</option>
        );
     }
}