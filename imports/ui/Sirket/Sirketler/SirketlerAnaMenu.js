import React, { Component } from 'react';
import '../../../stylesheet/Form.css';
import '../../../stylesheet/Public.css';

export default class SirketlerAnaMenu extends Component {


    gitSirketEkle(){
        FlowRouter.go('/sirket/sirketler/sirketekle');
    }

    gitSirketBilgileri(){
        FlowRouter.go('/sirketbilgilerigiris');
    }

    gitTumSirketleriListeleyin(){
        FlowRouter.go('/sirket/sirketler/tumsirketlerilisteleyin');
    }

    render() {
        
                if( Meteor.userId() != null ){
        
                     return ( 
                        <div className = "ana_parca_ortala_dikey" >
                            <button className = "bolum"
                            title = "Ticaret Yapacağınız Şirketleri Buradan Ekleyebilirsiniz." onClick = { this.gitSirketEkle.bind(this) } >Şirket Ekleyin</button> 
        
                            <button className = "bolum" title="Ticaret Yaptığınız Bütün Şirketleri Burada Görebilirsiniz." onClick = { this.gitTumSirketleriListeleyin.bind(this) } >Tüm Şirketleri Listeleyin</button>
        
                            <button className = "bolum" 
                            title="Kendi Şirketinizin Bilgilerini Burada Düzenleyebilirsiniz." onClick = { this.gitSirketBilgileri.bind(this) } >Şirketinizin Bilgileri</button>  
                        </div >
                    );
        
                }else{
                    FlowRouter.go("/");
                }
                
    }
}