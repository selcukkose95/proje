import React, { Component } from 'react';
import '../../stylesheet/Public.css';
import '../../stylesheet/Sirket/SirketTuru.css';

export default class SirketTuru extends Component {
    
    gitSirketBilgileriGiris(){
      FlowRouter.go("/sirketbilgilerigiris");
    }
    
    render() {
        return (
            <div className = "ana_parca_ortala_dikey">
                <label>Şirketinizin Türü?</label>
                <select id="turler">
                    <option>Küçük Yerel Şirket</option>
                    <option>Kurumsal</option>
                </select>
                <button id="tamam" onClick={this.gitSirketBilgileriGiris.bind(this)}>Tamam</button>
            </div>
        );
    }
}