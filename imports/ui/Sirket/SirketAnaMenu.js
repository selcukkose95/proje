import React, { Component } from 'react';
import '../../stylesheet/Public.css';

export default class SirketAnaMenu extends Component {
    
    gitUrunler(){
        FlowRouter.go("/sirket/urunler");
    }

    gitSirketler(){
        FlowRouter.go("/sirket/sirketler");
    }
    
    render() {
            
            if(Meteor.userId() != null){

                                return (
                        <div className = "ana_parca_dikey">
                                <div className="ana_parca_dikey_bolum">
                                        <div className="ana_parca_dikey_baslik">
                                                <label>Siparişler</label>
                                        </div>
                                        <div className="ana_parca_dikey_govde">
                                                <div className="ana_parca_dikey_grafik">
                                                        <label>Grafik</label>
                                                </div>
                                                <div className = "ana_parca_dikey_veri">

                                                        <table className = "tam_genis">
                                                                <tr>
                                                                        <td><label>Müşteri Adı:</label></td>
                                                                        <td><input/></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><label>Telefon Numarası:</label></td>
                                                                        <td><input/></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><label>Adres::</label></td>
                                                                        <td><input/></td>
                                                                </tr>
                                                        </table>
                                                </div>
                                        </div>                
                                                
                                
                                </div>
                                <div className="ana_parca_dikey_bolum">
                                        <div className="ana_parca_dikey_baslik">
                                                <label>Gelir-Gider</label>
                                        </div>
                                        <div className="ana_parca_dikey_govde">
                                                <div className="ana_parca_dikey_grafik">
                                                        <label>Grafik</label>
                                                </div>
                                                <div className = "ana_parca_dikey_veri">
                                                        <table className = "tam_genis">
                                                                <tr>       
                                                                        <td><label>Gelir:</label></td>
                                                                        <td><input type = "text" className = "tam_genis" ref = "gelir"/></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><label>Gider:</label></td>
                                                                        <td><input type = "text" className = "tam_genis" ref = "gider"/></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><label>Kar:</label></td>
                                                                        <td><input  type = "text" className = "tam_genis" ref = "kar"/></td>
                                                                </tr>
                                                                <tr>
                                                                        <td colSpan = { 2 } style = { { borderBottom : '1px solid #006666' } } >Grafik Sorgusu</td>
                                                                </tr>     
                                                                <tr>
                                                                        <td><label>Dönem:</label></td>
                                                                        <td><select className = "tam_genis" ref = "donem" >
                                                                                <option>Günlük</option>
                                                                                <option>Haftalık</option>
                                                                                <option>Aylık</option>
                                                                                <option>Yıllık</option>
                                                                        </select></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><label>Veri Türü:</label></td>
                                                                        <td><select className = "tam_genis" ref = "veri_turu">
                                                                                <option>Gelirler</option>
                                                                                <option>Giderler</option>
                                                                        </select></td>
                                                                </tr>        
                                                        </table>
                                                </div> 
                                        </div>                        
                                </div>
                                <div className="ana_parca_dikey_bolum">
                                        <div className="ana_parca_dikey_baslik">
                                                <label>Ürünler</label>
                                        </div>
                                        <div className="ana_parca_dikey_govde">
                                                <div className="ana_parca_dikey_grafik">
                                                     <label>Grafik</label>
                                                </div>
                                                <div className = "ana_parca_dikey_veri">
                                                        <table className = "tam_genis">
                                                                <tr>
                                                                        <td colSpan = { 2 }><button className = "tam_genis" onClick={this.gitUrunler.bind(this)}>Stok Bölümünü Aç</button></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><label>Sıralama:</label></td>
                                                                        <td><select  className = "tam_genis">
                                                                                <option>Azdan Çoğa</option>
                                                                                <option>Çoktan Aza</option>
                                                                        </select></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><label>Türüne Göre:</label></td>
                                                                        <td><select className = "tam_genis">
                                                                        </select></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><label>Bölümüne Göre:</label></td>
                                                                        <td> <select className = "tam_genis">
                                                                        </select></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><label>Alınan Firmaya Göre:</label></td>
                                                                        <td><select className = "tam_genis">
                                                                        </select></td>
                                                                </tr> 
                                                                <tr>
                                                                        <td><label>Kara Göre:</label></td>
                                                                        <td><select className = "tam_genis">
                                                                        </select></td>
                                                                </tr>      
                                                        </table>    
                                                </div>            
                                        </div>
                                </div>
                                
                                <div className="ana_parca_dikey_bolum">
                                        <div className="ana_parca_dikey_baslik">
                                                <label>Personel</label>
                                        </div>
                                        <div className="ana_parca_dikey_govde">
                                                <div className="ana_parca_dikey_grafik">
                                                <label>Grafik</label>
                                                </div>
                                                <div className = "ana_parca_dikey_veri">
                                                        <table className = "tam_genis">
                                                        
                                                        <tr>
                                                                <td colSpan = { 2 }><button className = "tam_genis">Personel Bölümünü Aç</button></td>
                                                        </tr>
                                                        <tr>
                                                                <td><label>Maaşa Göre:</label></td>
                                                                <td><div className="alt_alan">
                                                                                <input className = "tam_genis"/>
                                                                                <button>Sırala</button>
                                                                </div></td>
                                                        </tr>     
                                                        <tr>
                                                                <td><label>İşe Gelişine Göre:</label></td>
                                                                <td><select className = "tam_genis">
                                                                </select></td>
                                                        </tr>                     
                                                        <tr>
                                                                <td><label>Bölümüne Göre:</label></td>
                                                                <td><select className = "tam_genis">
                                                                </select></td>
                                                        </tr>         
                                                        </table>
                                                </div>                
                                        </div>
                                </div>
                                
                                <div className="ana_parca_dikey_bolum">
                                        <div className="ana_parca_dikey_baslik">
                                                <label>Şirketler</label>
                                        </div>
                                                <div className="ana_parca_dikey_govde">
                                                        <button onClick={this.gitSirketler.bind(this)}>Şirketler Bölümünü Aç</button>
                                                </div>
                                </div>
                        </div>
                        );

            }else{
                    FlowRouter.go("/");
            }

        
    }
}