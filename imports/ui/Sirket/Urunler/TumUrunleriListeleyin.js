import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import '../../../../node_modules/sweetalert/dist/sweetalert.css';
import TumUrunleriListeleyinMadde from '../Urunler/TumUrunlerListeleyinMadde.js';
import Urunler from '../../../collections/Urunler/Urunler.js';
import StokParti from '../../../collections/Urunler/StokParti.js';
import Grafik from '../../Grafik.js';
import '../../../stylesheet/react-bootstrap-table.css';
import '../../../stylesheet/Form.css';
import '../../../stylesheet/Public.css';

var satirSayac = 0;


const selectRowProp = {
    mode: 'dbclick'
};

function alStokPartileri( urunAdi ){
    
          return StokParti.find({ urunAdi }).fetch();
}

class TabloSatir extends TrackerReact( Component ) {

        tiklaSatir( veri, tiklandi ){

            seciliSatir = this;
            
            if( veri instanceof Array == false ){
                veri = StokParti.find({  urun_id: this.degistirUrunId() }, { sort: { tarih: -1} } ).fetch();
            }

            console.log(veri);

                ReactDOM.render(
                     <table className = "veriler">
                         <tr className = "veriler">
                            <th className = "veriler" onClick = {
                                 function(){ this.tiklaSatir( StokParti.find({  urun_id: urunId }, { sort: { urun_ad: 1} } ).fetch(), tiklandi ) }
                            } >Ürün Adı</th>
                            <th className = "veriler" >Ürünün Alındığı Şirket<img src = "./images/sort.png"  onClick = {
                                function(){
                                   if( tiklandi == undefined ){ tiklandi = -1 }else{
                                   if( tiklandi == -1 ){ tiklandi = 1 }else if( tiklandi == 1 ){ tiklandi = -1 }}
                                     this.tiklaSatir( StokParti.find({  urun_id: urunId }, { sort: { urunun_alindigi_sirket: tiklandi} }).fetch(), tiklandi )
                                   }.bind( this ) 
                            } /></th>
                            <th className = "veriler">Tarih<img src = "./images/sort.png"  onClick = {
                                function(){
                                   if( tiklandi == undefined ){ tiklandi = -1 }else{
                                   if( tiklandi == -1 ){ tiklandi = 1 }else if( tiklandi == 1 ){ tiklandi = -1 }}
                                     this.tiklaSatir( StokParti.find({  urun_id: urunId }, { sort: { tarih: tiklandi} }).fetch(), tiklandi )
                                   }.bind( this ) 
                            } /></th>
                            <th className = "veriler">Miktar <img src = "./images/sort.png"  onClick = {
                                function(){
                                   if( tiklandi == undefined ){ tiklandi = -1 }else{
                                   if( tiklandi == -1 ){ tiklandi = 1 }else if( tiklandi == 1 ){ tiklandi = -1 }}
                                     this.tiklaSatir( StokParti.find({  urun_id: urunId }, { sort: { miktar: tiklandi} }).fetch(), tiklandi )
                                   }.bind( this ) 
                            } /> </th>
                            <th className = "veriler">Alış Fiyatı<img src = "./images/sort.png"  onClick = {
                                function(){
                                   if( tiklandi == undefined ){ tiklandi = -1 }else{
                                   if( tiklandi == -1 ){ tiklandi = 1 }else if( tiklandi == 1 ){ tiklandi = -1 }}
                                     this.tiklaSatir( StokParti.find({  urun_id: urunId }, { sort: { alis_fiyati: tiklandi} }).fetch(), tiklandi )
                                   }.bind( this ) 
                            } /> </th>
                            <th className = "veriler">Satış Fiyatı<img src = "./images/sort.png"  onClick = {
                                function(){
                                   if( tiklandi == undefined ){ tiklandi = -1 }else{
                                   if( tiklandi == -1 ){ tiklandi = 1 }else if( tiklandi == 1 ){ tiklandi = -1 }}
                                     this.tiklaSatir( StokParti.find({  urun_id: urunId }, { sort: { satis_fiyati: tiklandi} }).fetch(), tiklandi )
                                   }.bind( this ) 
                            } /></th>
                            <th className = "veriler">Kar</th>
                         </tr>
                         {
                            veri.map( ( parti ) => {

                                console.log(parti);
                                return ( 
                                <tr className = "veriler">
                                    <td className = "veriler">{parti.urun_ad}</td>
                                    <td className = "veriler">{parti.urunun_alindigi_sirket}</td>
                                    <td className = "veriler">{ [ parti.tarih.getDate(), parti.tarih.getMonth() + 1, parti.tarih.getFullYear() ].join('.') + " " +
                                           [ parti.tarih.getHours(),  parti.tarih.getMinutes() ].join(':') }</td>
                                    <td className = "veriler">{parti.miktar}</td>
                                    <td className = "veriler">{parti.alis_fiyati}</td>
                                    <td className = "veriler">{parti.satis_fiyati}</td>
                                    <td className = "veriler">{ parti.satis_fiyati - parti.alis_fiyati }</td>
                                </tr> );

                            })
                         }
                     </table>,
                document.getElementById( "stokPartileriTablo" )  );

            

        }
    
        alSutunlar(){
    
             return this.props.sutunlar;
    
        }

        degistirUrunId(){

          urunId = Urunler.find({ urun_ad: this.props.sutunlar[0] }, { fields: { _id: 1 } } ).fetch()[0];
          return urunId != undefined ? urunId._id : urunId;        
        }
    
        render() {
            return (
                <tr className = "veriler" id = { this.props.satirId } onClick = {  function(){
                        this.tiklaSatir( StokParti.find({  urun_id: this.degistirUrunId() }, { sort: { tarih: -1} } ).fetch(), -1 ) 
                    }.bind( this ) 
                } >
                    {
                         this.props.sutunlar.map( ( sutun ) => {
                             
                              return(
    
                                  <td className = "veriler">{ sutun }</td>
    
                              )
    
                         } )
                    }
                </tr>
            );
        }
}

class TumUrunleriListeleyin extends TrackerReact(Component) {
    
    constructor(){
        super();
        
    }

    yukle(){

        Meteor.subscribe('Urunler');
        Meteor.subscribe('StokPartileri');

    }

    gitUrunEkle(){

        FlowRouter.go('/sirket/urunler/urunekle');
    }

    alUrunler( urunlerSorgu, stokPartileriSorgu ){

        var urunler = urunlerSorgu;
        var stokPartileri = stokPartileriSorgu;

        var miktar = 0, toplam_maliyet = 0, toplam_satis_fiyati = 0;
        
        if( urunler[0] != undefined ){

            for (let index = 0; index < urunler.length; index++) {
                
                for(let indexStok=0; indexStok < stokPartileri.length; indexStok++){

                    
                    if ( urunler[ index ]._id == stokPartileri[ indexStok ].urun_id ) {

                        miktar += parseInt( stokPartileri[ indexStok ].miktar );
                        toplam_maliyet += stokPartileri[ indexStok ].miktar * stokPartileri[ indexStok ].alis_fiyati ;
                        toplam_satis_fiyati += stokPartileri[ indexStok ].miktar * stokPartileri[ indexStok ].satis_fiyati;
                    }  
                }
                
                urunler[index] = {

                        urun_ad: urunler[index].urun_ad,
                        urunun_turu: urunler[index].urunun_turu,
                        miktar: miktar,
                        toplam_maliyet: toplam_maliyet ,
                        toplam_satis_fiyati: toplam_satis_fiyati,
                        kar:  toplam_satis_fiyati - toplam_maliyet
                }

                toplam_maliyet = 0;
                toplam_satis_fiyati = 0;
                miktar = 0;
            }

            return urunler;

        }

        return [{
                urun_ad: "",
                urunun_turu: "",
                miktar: "",
                toplam_maliyet: "",
                toplam_satis_fiyati: "",
                kar: ""
        }];
        

    }

    urunlerUiData(){

        var veri = [ ["Ürün Adı", 'urun_ad'], ["Ürünün Türü", 'urunun_turu'],
         ["Miktar", 'miktar'], ["Toplam Maliyet", 'toplam_maliyet'],
          ["Toplam Satış Fiyatı", 'toplam_satis_fiyati'], ["Kar", 'kar'] ];

            return veri;
    }

    referansVeriUiData(){

        var secilmisVeri;

        function degistirSecilmisVeri( secilmisVeri ){
            
            this.secilmisVeri = secilmisVeri;
        }
            
        function alSecilmisVeri() {
                        
            return secilmisVeri;
        }
    }

    veriUiData(){
        
        var secilmisVeri;

        function degistirSecilmisVeri( secilmisVeri ){
            
            this.secilmisVeri = secilmisVeri;
        }

        function alSecilmisVeri() {
            
            return secilmisVeri;
        }
    }

    stokPartiUiData(){

        var veri = [ ["Ürün Adı", 'urun_ad'], ["Ürünün Alındığı Şirket", 'urunun_alindigi_sirket'], 
        ["Tarih", 'tarih'], ["Miktar", 'miktar'], ["Alış Fiyatı", 'alis_fiyati'], 
        ["Satış Fiyatı", 'satis_fiyati'], ["Kar", 'kar'] ];

            return veri;
    }
            
    render() {
        
        if( Meteor.userId() != null ){
             this.yukle();
             return (
                    <div className = "ana_parca_dikey">
                        
                        <div className = "ana_parca_dikey_bolum">
                            <div className="ana_parca_dikey_baslik">
                                <label>Bütün Ürünleriniz</label>
                            </div>
                           
                                <div className="yatay_sıralanmis">
                                    <button className="yatay_elemanlar" onClick = { this.gitUrunEkle.bind( this ) }>Yeni Ürün Ekleyin</button>
                                    <button className="yatay_elemanlar" onClick = { this.gitUrunEkle.bind( this ) }>Seçili Ürünü Güncelleştirin</button>
                                    <button className="yatay_elemanlar" >Seçili Ürünü Silin</button>
                                </div>
                                
                                <table id = "urunler_tablo" className = "veriler" style = { { height: '100%' } }>
                                    <tr className = "veriler">
                                        <th className = "veriler">Ürün Adi</th>
                                        <th className = "veriler">Türü</th>
                                        <th className = "veriler">Miktar</th>
                                        <th className = "veriler">Toplam Maliyet</th>
                                        <th className = "veriler">Toplam Satış Fiyatı</th>
                                        <th className = "veriler">Kar</th>
                                    </tr>
                                    {
                                        this.alUrunler( Urunler.find().fetch(), StokParti.find().fetch() ).map( (urun) => {
                                            
                                            return (
                                                <TabloSatir sutunlar = { [ 
                                                    urun.urun_ad, 
                                                    urun.urunun_turu, 
                                                    urun.miktar,
                                                    urun.toplam_maliyet,
                                                    urun.toplam_satis_fiyati,
                                                    urun.kar ] } 
                                                    satirId = { "tUrun" + satirSayac }
                                                />
                                            );

                                            satirSayac++;

                                        } )
                                    }
                                </table>
                        </div>
                        
                        
                        <div className = "ana_parca_dikey_bolum">
                            <div className="ana_parca_dikey_baslik">
                                <label>Stok Partileri</label>
                            </div>
                            <div className = "ana_parca_dikey_govde"  id = 'stokPartileriTablo'/>
                        </div>

                        <div className = "ana_parca_dikey_bolum">
                                    <div className="ana_parca_dikey_baslik">
                                    <label>Grafikler</label>
                                    </div>
                                    <div className = "ana_parca_dikey_govde"  >
                                            
                                            <div className = "ana_parca_dikey_grafik">
                                                <div id = 'urunlerGrafik'/>
                                            </div>
                                            <div className = "ana_parca_dikey_veri">
                                                <table className = "tam_genis">
                                                    <tr>
                                                        <td> <label>Veri Kaynağı:</label> </td>
                                                        <td>
                                                            <select className = "tam_genis" ref = "grafVeriKaynagi"
                                                                onChange = { function (){ 
                                                                    
                                                                    let optionDegerler, optionVeriDegerler;
                                                                    if( this.refs.grafVeriKaynagi.value == "Urunler" ){

                                                                        optionDegerler = [ "Ürün Adı", "Ürünün Türü", "Miktar", "Toplam Maliyet", "Toplam Satış Fiyatı", "Kar" ];
                                                                        optionVeriDegerler = [ "Miktar", "Toplam Maliyet", "Toplam Satış Fiyatı" ]

                                                                        document.getElementById("referansVeri").options.length = 0;
                                                                        document.getElementById("veri").options.length = 0;

                                                                        for(let j = 2; j < (this.urunlerUiData().length - 1); j++){
                                                                            
                                                                            let option = document.createElement('option');
                                                                            option.appendChild( document.createTextNode(optionVeriDegerler[j]) )
                                                                            document.getElementById("veri").appendChild( option );
                                                                        }

                                                                        for(let j = 0; j < this.urunlerUiData().length; j++){
                                                                            
                                                                            let option = document.createElement('option');
                                                                            option.appendChild( document.createTextNode(optionDegerler[j]) )
                                                                            document.getElementById("referansVeri").appendChild( option );
                                                                        }

                                                                    }else{

                                                                        optionDegerler = [ "Ürün Adı", "Ürünün Alındığı Şirket", "Tarih", "Miktar", "Alış Fiyatı", "Satış Fiyatı", "Kar" ];
                                                                        optionVeriDegerler = [ "Miktar", "Alış Fiyatı", "Satış Fiyatı" ]

                                                                        document.getElementById("referansVeri").options.length = 0;
                                                                        document.getElementById("veri").options.length = 0;

                                                                        for(let j = 3; j < (this.stokPartiUiData.length - 1); j++){
                                                                            
                                                                            let option = document.createElement('option');
                                                                            option.appendChild( document.createTextNode(optionVeriDegerler[j]) )
                                                                            document.getElementById("veri").appendChild( option );
                                                                        }

                                                                        for(let j = 0; j < this.stokPartiUiData().length; j++){
                                                                            
                                                                            let option = document.createElement('option');
                                                                            option.appendChild( document.createTextNode(optionDegerler[j]) )
                                                                            document.getElementById("referansVeri").appendChild( option );
                                                                        }
                                                                    }
                                                                
                                                                }.bind(this) }>
                                                                <option>Urunler</option>
                                                                <option>Stok Partileri</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label>Veri:</label>
                                                        </td>
                                                        <td>
                                                            <select id = "veri" className = "tam_genis" ref = "veri">
                                                                <option>Miktar</option>
                                                                <option>Toplam Maliyet</option>
                                                                <option>Toplam Satış Fiyatı</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan = { 2 } style = { { borderBottom: '1px solid #006666' } }><label>Sıralama Ölçütleri</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label>Referans Veri:</label>
                                                        </td>
                                                        <td>
                                                            <select id = "referansVeri" className = "tam_genis" ref = "referansVeri">
                                                                <option>Ürün Adı</option>
                                                                <option>Ürünün Türü</option>
                                                                <option>Miktar</option>
                                                                <option>Toplam Maliyet</option>
                                                                <option>Toplam Satış Fiyatı</option>
                                                                <option>Kar</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label>Veri Sayısı:</label>
                                                        </td>
                                                        <td>
                                                            <select className = "tam_genis">
                                                                <option>5</option>
                                                                <option>10</option>
                                                                <option>20</option>
                                                            </select>
                                                        </td>   
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label>Sıralama:</label>
                                                        </td>
                                                        <td>
                                                            <select className = "tam_genis" ref = "sıralama">
                                                                <option>Büyükten Küçüğe</option>
                                                                <option>Küçükten Büyüğe</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan = { 2 }> <button className = "tam_genis" onClick = { 

                                                            function (){
                                         
                                                                let collection, veri, referansVeri, sıralama;
                                                                

                                                                if( this.refs.referansVeri.value == "Ürün Adı" ){
                                                                      referansVeri = 'urun_ad';
                                                                }else if( this.refs.referansVeri.value == "Ürünün Türü" ){
                                                                      referansVeri = 'urunun_turu';
                                                                }else if( this.refs.referansVeri.value == "Miktar" ){
                                                                      referansVeri = 'miktar';
                                                                }else if( this.refs.referansVeri.value == "Toplam Maliyet" ){
                                                                      referansVeri = 'toplam_maliyet';
                                                                }else if( this.refs.referansVeri.value == "Toplam Satış Fiyatı" ){
                                                                      referansVeri = 'toplam_satis_fiyati';
                                                                }else if( this.refs.referansVeri.value == "Kar" ){
                                                                      referansVeri = 'kar';
                                                                }else if( this.refs.referansVeri.value == "Ürünün Alındığı Şirket" ){
                                                                      referansVeri = 'urunun_alindigi_sirket';
                                                                }
                                                                else if( this.refs.referansVeri.value =="Tarih" ){
                                                                      referansVeri = 'tarih';
                                                                }
                                                                else if( this.refs.referansVeri.value =="Alış Fiyatı" ){
                                                                      referansVeri = 'alis_fiyati';
                                                                }
                                                                else if( this.refs.referansVeri.value =="Satış Fiyatı" ){
                                                                      referansVeri = 'satis_fiyati';
                                                                }

                                                                if( this.refs.veri.value = "Miktar" ){
                                                                    veri = 'miktar';
                                                                }else if( this.refs.veri.value = "Toplam Maliyet" ){
                                                                    veri = 'toplam_maliyet';
                                                                }else if( this.refs.veri.value =  "Toplam Satış Fiyatı" ){
                                                                    veri = 'toplam_satis_fiyati';
                                                                }else if( this.refs.veri.value == "Alış Fiyatı" ){
                                                                      veri = 'alis_fiyati';
                                                                }
                                                                else if( this.refs.veri.value == "Satış Fiyatı" ){
                                                                      veri = 'satis_fiyati';
                                                                }

                                                                if( this.refs.sıralama.value = ">Büyükten Küçüğe" ){
                                                                     sıralama = -1;
                                                                }else{
                                                                     sıralama = 1;
                                                                }

                                                                if( this.refs.grafVeriKaynagi.value == "Urunler" ){
                                                                    Grafik( document.getElementById("urunlerGrafik"), 
                                                                       this.alUrunler(  Urunler.find().fetch(), StokParti.find().fetch() ), 
                                                                       veri, 'urun_ad', 700, 400 );
                                                                }else{
                                                                    collection = StokParti;
                                                                }
                                                                

                                                            }.bind(this)
                                                         }
                                                        >Grafiği Oluştur</button> </td>
                                                    </tr>
                                            </table>
                                        </div>
                                </div>
                            </div>
                        </div>
                );

        }else{
            FlowRouter.go("/");
        }

    }
}

export default TumUrunleriListeleyin;