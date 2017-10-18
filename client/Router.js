import React from 'react';
import MainLayout from './MainLayout.js';
import Giris from '../imports/ui/Giris.js';
import SirketTuru from '../imports/ui/Sirket/SirketTuru.js';
import SirketBilgileriGiris from '../imports/ui/Sirket/SirketBilgileriGiris.js';
import CalismaAlaniBelirle from '../imports/ui/Sirket/CalismaAlaniBelirle.js';
import SirketAnaMenu from '../imports/ui/Sirket/SirketAnaMenu.js';
import SirketlerAnaMenu from '../imports/ui/Sirket/Sirketler/SirketlerAnaMenu.js';
import SirketEkle from '../imports/ui/Sirket/Sirketler/SirketEkle.js';
import Urunler from '../imports/ui/Sirket/Urunler/Urunler.js';
import UrunEkle from '../imports/ui/Sirket/Urunler/UrunEkle.js';
import StokGirin from '../imports/ui/Sirket/Urunler/StokGirin.js';
import TumUrunleriListeleyin from '../imports/ui/Sirket/Urunler/TumUrunleriListeleyin.js';
import TumSirketleriListele from '../imports/ui/Sirket/Sirketler/TumSirketleriListele.js';
import SirketSec from '../imports/ui/Sirket/Urunler/SirketSec.js';

FlowRouter.route('/',{

    action: function(){

        ReactLayout.render(MainLayout, {icerik: <Giris />});
    }
});

FlowRouter.route('/sirketturu',{

    action: function(){

        ReactLayout.render(MainLayout, {icerik: <SirketTuru />});
    }
});

FlowRouter.route('/sirket/sirketler',{

    action: function(){

        ReactLayout.render(MainLayout, {icerik: <SirketlerAnaMenu />});
    }
});

FlowRouter.route('/sirketbilgilerigiris',{
    
        action: function(){
    
            ReactLayout.render(MainLayout, {icerik: <SirketBilgileriGiris />});
        }
});

FlowRouter.route('/sirket/sirketler/sirketekle',{
    
        action: function(){
    
            ReactLayout.render(MainLayout, {icerik: <SirketEkle />});
        }
    });

FlowRouter.route('/calismalanibelirle',{

    action: function(){

        ReactLayout.render(MainLayout, {icerik: <CalismaAlaniBelirle />});
    }
});

FlowRouter.route('/sirket',{

    action: function(){

        ReactLayout.render(MainLayout, {icerik: <SirketAnaMenu />});
    }
});

FlowRouter.route('/sirket/urunler',{

    action: function(){

        ReactLayout.render(MainLayout, {icerik: <Urunler />});
    }
});

FlowRouter.route('/sirket/urunler/urunekle',{

    action: function(){

        ReactLayout.render(MainLayout, {icerik: <UrunEkle />});
    }
});

FlowRouter.route('/sirket/urunler/stokgirin',{

    action: function(){

        ReactLayout.render(MainLayout, {icerik: <StokGirin />});
    }
});

FlowRouter.route('/sirket/urunler/tumurunlerilisteleyin',{

    action: function(){

        ReactLayout.render(MainLayout, {icerik: <TumUrunleriListeleyin />});
    }
});

FlowRouter.route('/sirket/sirketler/tumsirketlerilisteleyin',{
    
        action: function(){
    
            ReactLayout.render(MainLayout, {icerik: <TumSirketleriListele />});
        }
});

FlowRouter.route('/sirket/urunler/stokgirin/sirketsec',{
    
        action: function(){
    
            ReactLayout.render(MainLayout, {icerik: <SirketSec />});
        }
});

