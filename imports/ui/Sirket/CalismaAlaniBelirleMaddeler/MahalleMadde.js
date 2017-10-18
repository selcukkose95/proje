import React from 'react';
import '../../../stylesheet/Public.css';

export default class MahalleMadde extends React.Component{
     render(){
        return(
             <option>{this.props.il.mahalle_ad}</option>
        );
     }
}