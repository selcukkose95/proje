import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import sweetAlert from '../../../../node_modules/sweetalert/dist/sweetalert.min.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SirketBilgileri from '../../../collections/SirketBilgileri.js';
import Iller from '../../../collections/CalismaAlaniBilgileri/Iller.js';

export default class SirketEkle extends TrackerReact( Component ){

    constructor(){

        super();
        Meteor.subscribe('ButunSirketler');
        Meteor.subscribe('Iller');
        Meteor.subscribe('Sirketler');
    }

    kaydet( sirketId ){

           var ticaret_turu_element = document.getElementById("ticaret_turu").value;
           var ticaret_turu;
           if( ticaret_turu_element == "Alım Yapılan" ) ticaret_turu = "alim_yapilan";
           else if( ticaret_turu_element == "Alım Yapılan" ) ticaret_turu = "satis_yapilan";
           else if( ticaret_turu_element == "Alım-Satım Yapılan" ) ticaret_turu = "alim_satim_yapilan";

          Meteor.call('sirketEkle', sirketId, ticaret_turu, function() { 
            swal({ title : "Şirket Başarıyla Eklendi", type: "success" , animation: "slide-from-top"});
          });
    }

    ara(){

        if( ( this.refs.sirket_adi != undefined ) && ( this.refs.il != undefined ) ){

            if( this.refs.sirket_adi.value.trim().length != 0 ){
                
                this.olusturTablo( SirketBilgileri.find({ sirket_adi: this.refs.sirket_adi.value.trim() }).fetch() );
            
            }else if( this.refs.il.value.length != 0  ){
    
                this.olusturTablo( SirketBilgileri.find({ adres: { $regex: ".*"+this.refs.il.value+".*" } }).fetch() );
            }
        }
        
    }

    olusturTablo( veriler ){
        
                ReactDOM.render(
        
                    <table className = "veriler">
                        <tr className = "veriler">
                                <th className = "veriler">Şirket Adı</th>
                                <th className = "veriler">Adres</th>
                        </tr>
                        {
                            veriler.map( ( veri )=>{
                              
                              return <tr className = "veriler" onClick = { 
                                  function(){
                                       this.sirketinBilgileriOlustur( veri );
                                  }.bind(this)
                               } >
                                  <td className = "veriler">{ veri.sirket_adi }</td>
                                  <td className = "veriler">{ veri.adres }</td>
                              </tr>
        
                            } )
                        }
                    </table>
        
                ,document.getElementById("sirket_listesi"));
    }

    sirketinBilgileriOlustur( veri ){
        
                 ReactDOM.render(
        
                    <div  className = "ana_parca_dikey_bolum">
                        <div className = "ana_parca_dikey_baslik">Şirketin Bilgileri</div>
                        <div className = "ana_parca_dikey_govde_ortala">
                            <table>
                                <tr>
                                    <td><label>Şirket Adı:</label></td>
                                    <td><input type = "text" className = "tam_genis" value = { veri.sirket_adi } readOnly/></td>
                                </tr>
                                <tr>
                                    <td><label>Telefon Numarası:</label></td>
                                    <td><input type = "text" className = "tam_genis" value = { veri.tel_no } readOnly/></td>
                                </tr>
                                <tr>
                                    <td><label>E_posta:</label></td>
                                    <td><input type = "text" className = "tam_genis" value = { veri.e_posta } readOnly/></td>
                                </tr>
                                <tr>
                                    <td><label>Adres:</label></td>
                                    <td><textarea cols="30" rows="5" type = "text" value = { veri.adres } readOnly/></td>
                                </tr>
                                <tr>
                                    <td><label>Şirket Türü:</label></td>
                                    <td><input type = "text" className = "tam_genis" value = { veri.sirket_turu } readOnly/></td>
                                </tr>
                                <tr>
                                    <td><label>Ticaret Türü:</label></td>
                                    <td>
                                        <select type = "text" className = "tam_genis" id = "ticaret_turu">
                                            <option>Alım Yapılan</option>
                                            <option>Satış Yapılan</option>
                                            <option>Alım-Satım Yapılan</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan = { 2 } ><button className = "tam_genis" onClick = {
                                        function(){
                                           this.kaydet(veri.kullanıcı_id);
                                        }.bind(this)
                                    } >Şirketlere Ekleyin</button></td>
                                </tr>
                            </table>
                        </div>
                    </div>
        
                 ,document.getElementById("sirketin_bilgileri"));
    }

    render() {

        if( Meteor.userId() != null ){
            console.log(Meteor.userId());
            return (

                <div className = "ana_parca_dikey">
                    <div  className = "ana_parca_dikey_bolum">
                            <div className="ana_parca_dikey_baslik">
                                <label>Şirket Ara</label>
                            </div>
                            <div className = "ana_parca_ortala_dikey">
                                  
                                <div className = "yatay_sıralanmis">
                                                
                                  <div className = "yatay_sıralanmis">

                                    <label className = "etiket">Şirket Adı:</label>
                                    <input type = "text" className = "alan" list = "sirketler" ref = "sirket_adi" onChange = { this.ara.bind(this) }></input>
                                    <datalist id = "sirketler">
                                        {
                                            SirketBilgileri.find().fetch().map( ( sirket )=>{

                                                return <option>{ sirket.sirket_adi }</option>
                                            } )
                                        }
                                    </datalist>

                                  </div>
                                  <div className = "yatay_sıralanmis">
                                  
                                    <label className = "etiket">İl:</label>
                                    <select className = "alan" type = "text" ref = "il" onClick = { this.ara.bind(this) } >
                                        <option selected></option>
                                        {
                                             Iller.find({}).fetch().map( ( il )=>{

                                                 return <option>{ il.il_ad }</option>
                                             } )
                                        }
                                    </select>

                                  </div>
                                </div>     
                                
                                 <table id = "sirket_listesi" className = "tam_genis"></table>
                            </div>
                    </div>
                    <div id = "sirketin_bilgileri"></div>
                </div>

            );
        }else{
            FlowRouter.go("/");
        }

    }
}