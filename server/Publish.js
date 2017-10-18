import Iller from '../imports/collections/CalismaAlaniBilgileri/Iller.js';
import Ilceler from '../imports/collections/CalismaAlaniBilgileri/Ilceler.js';
import Mahaller from '../imports/collections/CalismaAlaniBilgileri/Mahalleler.js';
import SirketBilgileri from '../imports/collections/SirketBilgileri.js';
import SirketTurleri from '../imports/collections/SirketTurleri.js';
import Sirketler from '../imports/collections/Sirketler/Sirketler.js';
import Urunler from '../imports/collections/Urunler/Urunler.js';
import StokPartileri from '../imports/collections/Urunler/StokParti.js';

Meteor.publish('Iller', function() {

    return Iller.find();
    
});

Meteor.publish('Ilceler', function() {
    
    return Ilceler.find();
    
});

Meteor.publish('Mahaller', function() {
    
    return Mahaller.find();
    
});

Meteor.publish('SirketBilgileri', function() {
    
    return SirketBilgileri.find( { "kullanıcı_id": this.userId } );
    
});

/*Kullanıcı Olan Şirket Dışında Bütün Şirketleri Sıralar*/
Meteor.publish('ButunSirketler', function() {
    
    return SirketBilgileri.find( { "kullanıcı_id": { $nin: [ Meteor.userId() ] } } );
    
});

Meteor.publish('SirketTurleri', function() {
    
    return SirketTurleri.find();
    
});

Meteor.publish('ButunUrunAdlarıveTurleri', function() {

    return Urunler.find( {  }, { fields: { urun_ad: 1, urunun_turu: 1 } } );
    
});

Meteor.publish('Urunler', function() {
    
    return Urunler.find( { "kullanıcı_id": this.userId } );
    
});


Meteor.publish('DigerSirketlerinUrunleri', function() {

    let idler = [];

    Sirketler.find( { kullanıcı_id: this.userId }, { _id: 0, kullanıcı_id: 0, ticaret_turu: 0 } ).fetch().map( ( sirket )=>{
        idler.push( sirket.sirket_id );
    } )

    return Urunler.find( { kullanıcı_id: { $in: idler } } );
    
});

Meteor.publish('StokPartileri', function() {
    
    return StokPartileri.find( { "kullanıcı_id": this.userId } );
    
});


Meteor.publish('Sirketler', function() {
    
    return Sirketler.find( { "kullanıcı_id": this.userId } );
    
});


Meteor.publish('SirketSecSirketler', function() {
    
    return Sirketler.find({ $and: [ { kullanıcı_id: this.userId }, { ticaret_turu: { $in: [ "alim_satim_yapilan" ,  "satis_yapilan" ] } } ] })
    
});