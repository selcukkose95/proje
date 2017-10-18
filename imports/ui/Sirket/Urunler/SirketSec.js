import React, { Component } from 'react';
import { Session } from 'meteor/session';
import Sirketler from '../../../collections/Sirketler/Sirketler.js';
import SirketBilgileri from '../../../collections/SirketBilgileri.js';
import Urunler from '../../../collections/Urunler/Urunler.js';

export default class SirketSec extends Component {

    constructor(){
        super();
        Meteor.subscribe('SirketSecSirketler');
        Meteor.subscribe('SirketBilgileri');
    }

    sec( sirket ){

        Session.set('SecilmisSirket', sirket);
        FlowRouter.go('/sirket/urunler/stokgirin');
    }

    alSirketler(){

        let urunler = Urunler.find({ urun_ad: Session.get('UrunAdi') }).fetch();
        let secilmisSirketler = [];

        Sirketler.find().fetch().map( ( sirket )=>{

            urunler.map( ( urun )=> {

                if( sirket.sirket_id == urun.kullanıcı_id ){
                    

                    secilmisSirketler.push( SirketBilgileri.find( { kullanıcı_id: sirket.sirket_id }).fetch()[0].sirket_adi );

                }

            } );

        } );

        console.log(secilmisSirketler);

        return secilmisSirketler;
    }

    render() {
        return (
            <div className= "ana_parca_ortala">
                
                <select className = "yari_genis"  multiple>
                    {
                        this.alSirketler().map( ( sirketAdi )=>{

                            return <option onClick = { function(){ this.sec( sirketAdi ) }.bind(this) } >{ sirketAdi }</option>

                        } )
                    }
                </select>
            </div>
        );
    }
}