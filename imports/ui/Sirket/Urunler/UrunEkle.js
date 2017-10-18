import React, { Component } from 'react';
import '../../../../node_modules/react-select/dist/react-select.css';
import sweetAlert from '../../../../node_modules/sweetalert/dist/sweetalert.min.js';
import '../../../../node_modules/sweetalert/dist/sweetalert.css';
import Select from 'react-select';
import '../../../stylesheet/Form.css';
import '../../../stylesheet/Public.css';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import StokParti from '../../../collections/Urunler/Urunler.js';
import Urunler from '../../../collections/Urunler/Urunler.js';
import Sirketler from '../../../collections/Sirketler/Sirketler.js';
import UrunTurleriMadde from './UrunTurleriMadde.js';

export default class UrunEkle extends TrackerReact( Component ) {

    yukle(){

        Meteor.subscribe('Sirketler');
        Meteor.subscribe('ButunUrunAdlarıveTurleri');
    }

    kaydet(){
        
        if(  this.refs.urun_adi.value.trim().length != 0  &&
             this.refs.urun_turu.value.trim().length != 0 &&
             this.refs.birim.value.trim().length != 0 ){

                try {

                    Meteor.call('ekleYeniUrun',
                        this.refs.urun_adi.value.trim(),
                        this.refs.urun_turu.value.trim(),
                        this.refs.birim.value
                    ,function () {
                        FlowRouter.go('/sirket/urunler');
                        swal({ title : "Urununuz Başarıyla Kaydedildi", type: "success" ,animation: "slide-from-top"});

                    }); 

                } catch (error) {
                    swal({ title : "Kayıt işlemi Yapılırken Bir Hatayla Karşılaşıldı Lütfen Verilerinizi Kontrol Ediniz." , animation: "slide-from-top" });
                }
                
            }else{
                swal({ title : "Lütfen Bütün Alanları Doldurun!", type: "warning" , animation: "slide-from-top"});
            }
            
    }

    alUrunAdlari(){

        let veri = Urunler.find( {  } ).fetch();
        let farklıVeriler = _.uniq( veri, false, function(veri) { return veri.urun_ad } );
        return farklıVeriler;
    }
    
    alUrunTurleri(){

        let veri = Urunler.find({}).fetch();
        let farklıVeriler = _.uniq( veri, false, function(veri) { return veri.urunun_turu } );
        return _.pluck( farklıVeriler, "urunun_turu" );

    }

    render() {

        if( Meteor.userId() != null ){
               this.yukle();
               return (
                    <div className = "ana_parca_ortala_dikey">
                        <h3>Ürününüzün Bilgileri</h3>
                        <table >
                            <tr>
                                <td> <label>Ürün Adı:</label> </td>
                                <td className = "sol_bosluk"> <input type="text" className="alan" ref="urun_adi" list = "urun_adlari"/> </td>
                                <datalist id = "urun_adlari">
                                    {
                                        this.alUrunAdlari().map( ( urun )=>{
                                            
                                            return <option>{ urun.urun_ad }</option>
                                        } )
                                    }
                                </datalist>
                            </tr>
                            <tr>
                                <td> <label>Ürünün Türü:</label> </td>
                                <td className = "sol_bosluk"> 
                                    <input type="text" className="alan" list="urun_turleri" ref="urun_turu" />
                                    <datalist id="urun_turleri">
                                        {
                                            this.alUrunTurleri().map( ( urun )=>{
                                                
                                                console.log(urun)
                                                return <option> { urun } </option>

                                            })
                                            
                                        }
                                    </datalist>
                                 </td>
                            </tr>
                            <tr>
                                <td> <label >Birim:</label> </td>
                                <td className = "sol_bosluk"> 
                                    <select className="tam_genis" ref="birim">
                                        <option>Adet</option>
                                        <option>Koli</option>
                                        <option>Ton</option>
                                        <option>Kg</option>
                                        <option>Litre</option>
                                        <option>Metre</option>
                                    </select>
                                </td>
                            </tr>
                            <tr> <td colSpan = { 2 } > <button className = "tam_genis" onClick = { this.kaydet.bind( this ) } >Kaydet</button ></td> </tr>
                        </table>
                    </div>
                );

        }else{
            FlowRouter.go("/");
        }
        
    }
}
