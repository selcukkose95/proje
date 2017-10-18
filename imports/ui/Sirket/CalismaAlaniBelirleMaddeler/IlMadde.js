import React from 'react';
import '../../../stylesheet/Public.css';

export default class IlMadde extends React.Component{
     render(){
        return(
             <option>{this.props.il.il_ad}</option>
        );
     }
}