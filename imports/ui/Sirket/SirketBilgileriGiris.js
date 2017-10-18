import React, { Component } from 'react';
import { Session } from 'meteor/session'
import '../../stylesheet/Form.css';
import '../../stylesheet/Public.css';
import SirketTurleri from '../../collections/SirketTurleri.js';
import SirketBilgileri from '../../collections/SirketBilgileri.js';
import SirketTuruMadde from '../Sirket/SirketTuruMadde.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class SirketBilgileriGiris extends TrackerReact(Component) {

    constructor(){
        super();
        Meteor.subscribe('SirketTurleri');
        Meteor.subscribe('SirketBilgileri');
    }

    componentDidMount(){
        if((Session.get("sirket_ad") != undefined)){ this.refs.sirket_adi.value = Session.get("sirket_ad"); }
        if((Session.get("tel_no") != undefined)){ this.refs.tel_no.value = Session.get("tel_no"); }
        if((Session.get("eposta") != undefined)){ this.refs.eposta.value = Session.get("eposta"); }
        if((Session.get("adres") != undefined)){ this.refs.adres.value = Session.get("adres"); }
    }

    kaydet(){


                Meteor.call('ekleSirketBilgisi', 
                    this.refs.sirket_adi.value.trim().length != 0 ? this.refs.sirket_adi.value.trim() : this.refs.sirket_adi.placeholder.trim() ,  
                    this.refs.tel_no.value.trim().length != 0 ? this.refs.tel_no.value.trim() : this.refs.tel_no.placeholder.trim(),
                    this.refs.eposta.value.trim().length != 0 ? this.refs.eposta.value.trim() : this.refs.eposta.placeholder.trim(),
                    this.refs.adres.value.trim().length != 0 ? this.refs.adres.value.trim() : this.refs.adres.placeholder.trim(),
                    Session.get("il"),
                    Session.get("ilce"),
                    Session.get("mahalle"),
                    this.refs.sirket_turu.value, 
                    function(){
                        FlowRouter.go("/sirket");
                    }
                );  

        
    }

    alBilgiler(){

        var veri = SirketBilgileri.find().fetch();
        if( veri.length != 0 )
           return  veri;     
        else 
           return [{
                kullanıcı_id: "",
                sirket_adi: "",
                tel_no: "",
                e_posta: "",
                adres: "",
                il: "",
                ilce: "",
                mahalle: "",
                sirket_turu: "",
                ticaret_yapilan_sirketler: ""
           }];
    }

    gitCalismaAlaniBelrile(){

        if((this.refs.sirket_adi.value!="") && 
             (this.refs.tel_no.value != "") &&
             (this.refs.eposta.value != "") &&
             (this.refs.adres.value !="")){

                Session.set("sirket_ad",this.refs.sirket_adi.value);
                Session.set("tel_no", this.refs.tel_no.value);
                Session.set("eposta",this.refs.eposta.value);
                Session.set("adres",this.refs.adres.value);
                FlowRouter.go("/calismalanibelirle");
             }else{
                 window.alert("Lütfen Bütün Alanları Doldurun!")
             }
             
    }

    alSirketTurleri(){
        return SirketTurleri.find().fetch();
    }

    render() {
        var bilgiler = this.alBilgiler();
        return (
            <div className = "ana_parca_ortala_dikey">
                <h3>Bilgileriniz</h3>
                <table>

                    <tr>
                        <td><label>Şirketinizin Adı:</label></td>
                        <td><input className = "alan" type="text" ref="sirket_adi" className = "tam_genis" placeholder = { bilgiler[0].sirket_adi }/></td>
                    </tr>
                    <tr>
                        <td><label>Telefon Numaranız:</label></td>
                        <td><input className = "alan" type="tel" ref="tel_no" className = "tam_genis" placeholder = { bilgiler[0].tel_no } /><br/></td>
                    </tr>
                    <tr>
                        <td><label>E-posta Adresiniz:</label></td>
                        <td><input className = "alan" type="email" ref="eposta" className = "tam_genis" placeholder = { bilgiler[0].e_posta }/></td>
                    </tr>    
                    <tr>
                        <td><label>Adresiniz:</label></td>
                        <td><textarea className = "alan" name="Text1" rows="6" ref="adres" placeholder = { bilgiler[0].adres }></textarea></td>
                    </tr>
                    <tr>
                        <td><label>Çalışma Alanınız:</label></td>
                        <td><button className = "tam_genis" onClick={this.gitCalismaAlaniBelrile.bind(this)}>Belirleyin</button></td>
                    </tr>
                    <tr>
                        <td><label>Şirket Türünüz:</label></td>
                        <td><select className = "tam_genis" ref="sirket_turu" placeholder = { bilgiler[0].sirket_turu }>
                            {
                               this.alSirketTurleri().map((tur)=>{
                                   return <SirketTuruMadde tur={tur}/>
                               })
                            }
                        </select></td>
                    </tr>
                    <tr>
                        <td colSpan = { 2 }><button className = "tam_genis" onClick={this.kaydet.bind(this)} 
                        title="Bilgilerinizi Kaydedip Karıncanızı Kullanmaya Başlayın.">Kaydet</button></td>
                    </tr>
                    
                </table>
                
            </div>
        );
    }
}