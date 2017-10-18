import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';
import '../../stylesheet/CalismaAlaniBelirle.css';
import '../../stylesheet/Public.css';
import IlMadde from '../Sirket/CalismaAlaniBelirleMaddeler/IlMadde.js';
import IlceMadde from '../Sirket/CalismaAlaniBelirleMaddeler/IlceMadde.js';
import MahalleMadde from '../Sirket/CalismaAlaniBelirleMaddeler/MahalleMadde.js';
import Iller from '../../collections/CalismaAlaniBilgileri/Iller.js';
import Ilceler from '../../collections/CalismaAlaniBilgileri/Ilceler.js';
import Mahaller from '../../collections/CalismaAlaniBilgileri/Mahalleler.js';


class CalismaAlaniBelirle extends TrackerReact(Component) {

    constructor(){
        super();
        Meteor.subscribe('Iller');
        Meteor.subscribe('Ilceler');
        Meteor.subscribe('Mahaller');
    }

    kaydet(){
        Session.set("il",this.refs.il_select.value);
        Session.set("ilce",this.refs.ilce_select.value);
        Session.set("mahalle",this.refs.mahalle_select.value);
        FlowRouter.go("/sirketbilgilerigiris");
    }
    
    tikButunTurkiye(){
        if(this.refs.butun_turkiye.checked == true){

            this.refs.il_select.disabled = true;
            this.refs.butun_sehir.disabled = true;
            this.refs.butun_ilce.disabled = true;
            this.refs.ilce_select.disabled = true;
            this.refs.mahalle_select.disabled = true;
        }else{

            this.refs.il_select.disabled = false;
            this.refs.butun_sehir.disabled = false;
            this.refs.butun_ilce.disabled = false;
            this.refs.ilce_select.disabled = false;
            this.refs.mahalle_select.disabled = false;
        }
    }
    
    tikButunSehir(){
        if(this.refs.butun_sehir.checked == true){

            this.refs.butun_turkiye.disabled = true;
            this.refs.butun_ilce.disabled = true;
            this.refs.ilce_select.disabled = true;
            this.refs.mahalle_select.disabled = true;
        }else{

            this.refs.butun_turkiye.disabled = false;
            this.refs.butun_ilce.disabled = false;
            this.refs.ilce_select.disabled = false;
            this.refs.mahalle_select.disabled = false;
        }
    }

    tikButunİlce(){
        if(this.refs.butun_ilce.checked == true){

            this.refs.butun_turkiye.disabled = true;
            this.refs.butun_sehir.disabled = true;
            this.refs.mahalle_select.disabled = true;
        }else{

            this.refs.butun_turkiye.disabled = false;
            this.refs.butun_sehir.disabled = false;
            this.refs.mahalle_select.disabled = false;
        }
    }

    alIller(){  
      return Iller.find().fetch();
    }

    alIlceler(){  
        let cursor = Ilceler.find({il_ad:this.refs.il_select.value.trim()});
        let values = cursor.fetch();

        for(let j = this.refs.ilce_select.options.length - 1 ; j >= 0 ; j--){
            this.refs.ilce_select.remove(j);
        }
        for(let i=0; i<cursor.count(); i++){

              var opt = document.createElement('option');
              opt.value = values[i].ilce_ad;
              opt.innerHTML = values[i].ilce_ad;
              this.refs.ilce_select.appendChild(opt);
        }
    }

    alMahaller(){  
        let cursor = Mahalleler.find({$and:[{il_ad:this.refs.il_select.value.trim()},{ilce_ad:this.refs.ilce_select.value.trim()}]});
        let values = cursor.fetch();

        for(let j = this.refs.mahalle_select.options.length - 1 ; j >= 0 ; j--){
            this.refs.mahalle_select.remove(j);
        }
        this.refs.mahalle_select.selected = null;
        for(let i=0; i<cursor.count(); i++){

              var opt = document.createElement('option');
              opt.value = values[i].mahalle_ad;
              opt.innerHTML = values[i].mahalle_ad;
              this.refs.mahalle_select.appendChild(opt);
        }
    }
    
    render() {

        if( Meteor.userId() != null){

               return (
                    <div id="ana_parca_ortala_dikey">
                        
                        <h3>Sipariş Alacağınız Bölgeyi Belirleyin</h3>
                        <table>
                            <tr>
                                <td colSpan = { 2 }><input type="checkbox" ref="butun_turkiye" onClick={this.tikButunTurkiye.bind(this)} /><label>Bütün Türkiye</label></td>

                            </tr>
                            <tr>
                                <td><label>İl:</label></td>
                                <td><select className="veriler" ref="il_select" onClick={this.alIlceler.bind(this)}>
                                    {
                                    this.alIller().map((il)=>{
                                        return <IlMadde il={il}/>
                                    })
                                    }
                                </select></td>
                            </tr>
                            <tr>
                                <td colSpan = { 2 } ><input type="checkbox" ref="butun_sehir" onClick={this.tikButunSehir.bind(this)}/><label>Bütün Şehir</label></td>
                            </tr>
                            <tr>
                                <td><label>İlce:</label></td>
                                <td><select className="veriler" ref="ilce_select" onClick={this.alMahaller.bind(this)}></select></td>
                            </tr>
                            <tr>
                                <td colSpan = { 2 }><input type="checkbox" ref="butun_ilce" onClick={this.tikButunİlce.bind(this)}/><label>Bütün İlçe</label></td>
                            </tr>
                            <tr>
                                <td><label className="Alan">Mahalle:</label></td>
                                <td><select className="veriler" ref="mahalle_select"></select></td>
                            </tr>
                            <tr>
                                <td colSpan = { 2 }><button className = "tam_genis" onClick={this.kaydet.bind(this)}>Kaydet</button></td>
                            </tr>      
                        </table>               
                    </div>
                );
        }else{
            FlowRouter.go("/");
        }
       
    }

    
}

export default CalismaAlaniBelirle;