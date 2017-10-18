import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session'
import sweetAlert from '../../../../node_modules/sweetalert/dist/sweetalert.min.js';
import '../../../../node_modules/sweetalert/dist/sweetalert.css';
import '../../../stylesheet/Form.css';
import '../../../stylesheet/Public.css';
import StokParti from '../../../collections/Urunler/StokParti.js';
import Sirketler from '../../../collections/Sirketler/Sirketler.js';
import Urunler from '../../../collections/Urunler/Urunler.js';

var tarih, urunIdleri;

class StokGirin extends TrackerReact(Component) {

    yukle(){


        Meteor.subscribe('Urunler');
        Meteor.subscribe('SirketSecSirketler');
        Meteor.subscribe('ButunSirketler');
        Meteor.subscribe('StokPartileri');
        Meteor.subscribe('DigerSirketlerinUrunleri');
    }

    kaydet(){

        var urunMevcutMu = this.urunMevcutMu();
         if(  ( ( this.refs.urun_adi.value.trim().length != 0  || this.refs.urun_adi.placeholder.trim().length != 0 ) && 
              ( this.refs.urunun_alindigi_sirket.value.trim().length != 0 || this.refs.urunun_alindigi_sirket.placeholder.trim().length != 0 ) &&
              this.refs.miktar.value.trim().length != 0 && 
              this.refs.tarih.value.trim().length != 0 &&
              this.refs.alis_fiyati.value.trim().length != 0 &&
              this.refs.satis_fiyati.value.trim().length != 0 ) && ( urunMevcutMu == true ) ){

                Meteor.call('stokEkle', Urunler.find({ $and: [ { urun_ad: ( this.refs.urun_adi.value.trim().length != 0 ? this.refs.urun_adi.value.trim() : this.refs.urun_adi.placeholder.trim() ) }, 
                { kullanıcı_id: Meteor.userId() } ] }, 
                { kullanıcı_id: 0, urun_ad: 0, urunun_turu: 0, birim: 0 }).fetch()[0]._id,
                 this.refs.urunun_alindigi_sirket.value.trim(), this.refs.miktar.value.trim(), new Date(tarih),
                  this.refs.alis_fiyati.value.trim(), this.refs.satis_fiyati.value.trim(), ()=>{
                    
                    swal( { title: "Urununuz Başarıyla Kaydedildi", type: "success", animation: "slide-from-top" } );
                }); 
                
             Session.set('UrunAdi', "");
            delete Session.set('SecilmisSirket', "");
            FlowRouter.go('/sirket/urunler'); 

        }else if( urunMevcutMu == false ){
               
               swal( { title: "Eklemek İstediğiniz Urun Kayıtlı Değil Lütfen \"Yeni Ürün Türü Ekleyin\" Bölümünden Urunu Kaydedin.", type: "warning",animation: "slide-from-top" } );
        }else{

              swal( { title: "Lütfen Bütün Alanları Doldurun!", type: "warning", animation: "slide-from-top" } );

        }
         
    }

    urunMevcutMu(){
        
        var sonuc = false;


            Urunler.find({}).fetch().map( ( urun ) => {
                
                    if( urun.urun_ad == ( this.refs.urun_adi.value.trim().length != 0 ? this.refs.urun_adi.value.trim() : this.refs.urun_adi.placeholder.trim() ) ) 
                        sonuc = true;          
                
            });

        return sonuc;
    }

    alUrunler(){

        return Urunler.find( { kullanıcı_id: { $nin: [ Meteor.userId() ] } } ).fetch();
    }

    //Urunun Adı Girildiğinde En Çok Alım Yapılan Şirketi Urunun Alındğı Şirket Kısmına Yazar
    doldurUrununAlingiSirket(){

        var sirketler = Sirketler.find({}, { sirket_id: 1, _id: 0 }).fetch();

        if( this.refs.urun_adi.value.trim().length != 0  ){

          let sirketMevcutMu = false;
          var enYuksekDeger = StokParti.find({ urun_ad: this.refs.urun_adi.value.trim() }, { sort: { miktar: -1 }, limit: 1} ).fetch();
          
          sirketler.map( ( sirket )=>{
             if( sirket.sirket_id == enYuksekDeger.urunun_alindigi_sirket ){ sirketMevcutMu = true }
          } );

            if( ( enYuksekDeger[0] != undefined ) && ( sirketMevcutMu == true ) )
               this.refs.urunun_alindigi_sirket.value = enYuksekDeger[0].urunun_alindigi_sirket;
        }
    }

    sirketSec(){
         
          if( this.refs.urun_adi.value.trim().length != 0 ){

                Session.set('UrunAdi', this.refs.urun_adi.value.trim());
                FlowRouter.go('/sirket/urunler/stokgirin/sirketsec');

          }else{

            swal( { title: "Lütfen Ürün Adı Bölümünü Doldurunuz!", type: "warning", animation: "slide-from-top" } );
          }
          
    }

    bugunYaz(){
        tarih = new Date();
        this.refs.tarih.value = [ tarih.getDate(), tarih.getMonth() + 1, tarih.getFullYear() ].join('.') + " " +
                                  [ tarih.getHours(),  tarih.getMinutes() ].join(':');
    }

    hesaplaBirimBasiKar(){
        
                try {
        
                    this.refs.kar.value = this.refs.satis_fiyati.value - this.refs.alis_fiyati.value;
                    
                } catch (error) {
        
                    swal( { title: "Alış Fiyatı Ve Satış Fiyatı Alanları Sayı Türünde Olmalı!", type: "warning", animation: "slide-from-top" } );
                    
                }
                  
    }

    render() {

        if( Meteor.userId() != null ){
            this.yukle();
             return (
                    <div className = "ana_parca_ortala">
                        <div className = "form">
                        <table>
                            <tr>
                                <td> <label className="alan">Ürün Adı:</label> </td>
                                <td className = "sol_bosluk">
                                    <input type="text" className="alan" ref="urun_adi" list="urunler" placeholder= { Session.get('UrunAdi') }  />
                                    <datalist id="urunler">
                                        { 
                                            this.alUrunler().map( ( urun ) => {

                                            return <option> { urun.urun_ad } </option>   

                                            })
                                        }
                                    </datalist>
                                </td>
                            </tr>
                            <tr>
                                <td> <label className="alan">Ürünün Alındığı Şirket:</label> </td>
                                <td className = "sol_bosluk">    
                                    <div className="alt_alan">
                                        <input type="text" className = "tam_genis" ref="urunun_alindigi_sirket" 
                                        onClick = { this.doldurUrununAlingiSirket.bind( this ) } placeholder = { Session.get('SecilmisSirket') } /> 
                                        <button onClick = { this.sirketSec.bind(this) }>Seç</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td> <label className="alan">Miktar:</label> </td>
                                <td className = "sol_bosluk"> <input type="number" className="alan" ref="miktar"/> </td>
                            </tr>
                            <tr>
                                <td> <label className="alan">Tarih:</label> </td>
                                <td className = "sol_bosluk">
                                    <div className="alt_alan">
                                        <input type="date" className = "tam_genis" ref="tarih"/>
                                        <button onClick={ this.bugunYaz.bind( this ) }>Bugün</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td> <label className="alan">Alış Fiyatı:</label> </td>
                                <td className = "sol_bosluk"> <input type="number" step="0.01" className="alan" ref="alis_fiyati" onChange={this.hesaplaBirimBasiKar.bind(this)}/> </td>
                            </tr>
                            <tr>
                                <td> <label className="alan">Satış Fiyatı:</label> </td>
                                <td className = "sol_bosluk"> <input type="number" step="0.01" className="alan" ref="satis_fiyati" onChange={this.hesaplaBirimBasiKar.bind(this)} /> </td>
                            </tr>
                            <tr>
                                <td> <label className="alan" >Birim Başı Kar:</label> </td>
                                <td className = "sol_bosluk"> <input type="number" step="0.01" className="alan" ref="kar" readOnly/> </td>
                            </tr>
                            <tr>
                                <td colSpan = { 2 } > <button className = "tam_genis" onClick={this.kaydet.bind(this)}>Kaydet</button> </td>
                            </tr>
                        </table>
                        </div>
                    </div>
                );

        }else{
            FlowRouter.go("/");
        }

        
    }
}

export default StokGirin;