import React, { Component } from 'react';
import Alert from 'react-s-alert';
import '../stylesheet/Public.css';

class Giris extends Component {

    constructor(){

        super();
        Meteor.subscribe('SirketBilgileri');
    }
    
    gitSirketTuru(){

        if(Meteor.userId() != null){

            if( SirketBilgileri.find({ kullanıcı_id: Meteor.userId() }).fetch().length != 0 ){

                FlowRouter.go("/sirket");
            }else{
                FlowRouter.go("/sirketturu");
            }
        }else{
            window.alert("Lütfen Hesap Oluşturun!(Sign in)");
        }
    }
    
    render() {
        return (
            <div className = "ana_parca_ortala_dikey">
                    <label>Tarafınızı Seçin!</label>
                    <button className="bolum" onClick={this.gitSirketTuru.bind(this)}>Şirket</button>
                    <button className="bolum">Müşteri</button>
            </div>
        );
    }
}

export default Giris;