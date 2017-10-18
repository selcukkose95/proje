import React, { Component } from 'react';
import '../../../stylesheet/Sirket/Urunler/Urunler.css';
import '../../../stylesheet/Public.css';
import UrunlerVeri from '../../../collections/Urunler/Urunler.js';

class Urunler extends Component {

    silVeriler(){

       // UrunlerVeri._collection.remove({});
    }

    gitYeniUrunEkle() {
        FlowRouter.go("/sirket/urunler/urunekle");
    }

    gitStokGirin(){
        FlowRouter.go("/sirket/urunler/stokgirin");
    }

    gitTumUrunleriListeleyin(){
        FlowRouter.go("/sirket/urunler/tumurunlerilisteleyin");
    }

    render() {

        if( Meteor.userId() != null ){
            this.silVeriler();
             return ( 
                <div className = "ana_parca_ortala_dikey" >
                    <button className = "bolum"
                    title = "Daha Önce Eklediğiniz Türlerden Ürün Ekleyin." onClick={ this.gitStokGirin.bind(this) } > Stok Girin </button> 

                    <button className = "bolum" title="Yeni Bir Urun Turu Ekleyin"
                    onClick = { this.gitYeniUrunEkle.bind(this) }
                    title = "Yeni Ürün Türü Veya Daha Önce Eklediğiniz Türlerden Ürün Ekleyin." > Yeni Ürün Türü Ekleyin </button>

                    <button className = "bolum" 
                    title="Bütün Ürünlerinizi Listeleyin" onClick={ this.gitTumUrunleriListeleyin.bind(this) }> 
                    Tüm Ürünleri Listeleyin </button>  
                </div >
            );

        }else{
            FlowRouter.go("/");
        }
        
    }
}

export default Urunler;