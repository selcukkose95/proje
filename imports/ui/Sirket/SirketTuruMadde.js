import React from 'react';

export default class SirketTuruMadde extends React.Component{
     render(){
        return(
             <option>{this.props.tur.sirket_tur}</option>
        );
     }
}