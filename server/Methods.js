Meteor.methods({ 
    ekleSirketBilgisi: function(sirket_adi, tel_no, e_posta, adres, il, ilce, mahalle, sirket_turu, ticaret_yapilan_sirketler){

                    SirketBilgileri.update( { kullanıcı_id: Meteor.userId() }, { $set:{
                        kullanıcı_id: Meteor.userId(),
                        sirket_adi: sirket_adi,
                        tel_no: tel_no,
                        e_posta: e_posta,
                        adres: adres,
                        il: il,
                        ilce: ilce,
                        mahalle: mahalle,
                        sirket_turu: sirket_turu,
                    }},
                    { upsert: true }); 
    },

    ekleYeniUrun:function(urun_ad, urunun_turu, birim) {

        try{

            Urunler.update(
                { $and: [ { kullanıcı_id: this.userId }, { urun_ad: urun_ad } ] }, 
                { kullanıcı_id: this.userId, urun_ad: urun_ad, urunun_turu: urunun_turu, birim: birim }, 
                { upsert: true } 
            );
            
        }catch(e){
            window.alert(e);
        }
    },

    stokEkle: function(urun_id, urunun_alindigi_sirket, miktar, tarih, alis_fiyati, satis_fiyati){

        StokParti.insert({
             kullanıcı_id: Meteor.userId(),
             urun_id: urun_id,
             urunun_alindigi_sirket: urunun_alindigi_sirket,
             miktar: miktar,
             tarih: tarih,
             alis_fiyati: alis_fiyati,
             satis_fiyati: satis_fiyati    
        });
        
    },

    sirketEkle: function( sirket_id,  ticaret_turu ){
       
        Sirketler.update({ sirket_id: sirket_id },{ $set:{
            kullanıcı_id: Meteor.userId(),
            sirket_id: sirket_id,
            ticaret_turu: ticaret_turu
        }},{ upsert: true });
    },

    alUrunTurleri: function(){
        return Urunler.find({});
    },

    alUrunAdlari: function () {
        return Urunler.find({ urun_ad });
    }
});