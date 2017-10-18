import React, { Component } from 'react';

export default class UrunTurleriMadde extends Component {
    render() {
        return (
           <option>{ this.props.urun.urunun_turu }</option>
        );
    }
}
