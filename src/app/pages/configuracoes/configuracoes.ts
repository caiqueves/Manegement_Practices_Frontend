import { Component } from '@angular/core';
import {  NavController, MenuController, ToastController, NavParams, Platform, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { PraticaService } from '../../service/PraticaService/PraticaService';
import { Pratica } from '../../models/pratica';

@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html'
})
export class ConfiguracoesPage {

   [x: string]: any;
   hora: any; 
   horas: any;
   minutos: any;
   pratica : Pratica;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuController: MenuController,
    public toastCtrl: ToastController,
    public plt: Platform,
    public localNotifications: LocalNotifications,
    public alertCtrl: AlertController,
    public praticaService: PraticaService
    ) 
    {
      
      var horaRegistrada = localStorage.getItem('horaRegistrada');

      if (horaRegistrada == null) {
          this.hora = "10:00"
      }
      else {
        this.hora = horaRegistrada;
      }

      this.plt.ready().then(() => {
        this.localNotifications.on('click').subscribe(res => {
          let msg = res.data ? res.data.mydata : '';
          this.presentAlert(res.title, res.text, msg);
        });
   
        this.localNotifications.on('trigger').subscribe(res => {
          let msg = res.data ? res.data.mydata : '';
          this.presentAlert(res.title, res.text, msg);
        });
      }); 
    }
  

    scheduleNotification() {

      localStorage.setItem("horaCadastrada",this.hora);

      this.obterDadosPratica();

      this.horas = this.hora.toString().substr(0,2);
      this.minutos = this.hora.toString().substr(3,2);
     
      this.localNotifications.schedule({
        id: 1,
        title: 'Atenção',
        text: 'Boas Práticas de Gestão',
        data: { mydata: 'Etapa: '+ this.pratica.etapa + ',\n Problema: '+ this.pratica.problema +',\n Solução: '+this.pratica.solucao},
        trigger: { every: { hour: this.horas, minute: this.minutos}},

      });
       
       const toast = this.toastCtrl.create({
         message: "Agendamento da notificação efetuado !",
         duration: 3000
       });
       toast.present();
       
      
      // Works as well!
      // this.localNotifications.schedule({
      //   id: 1,
      //   title: 'Attention',
      //   text: 'Simons Notification',
      //   data: { mydata: 'My hidden message this is' },
      //   trigger: { at: new Date(new Date().getTime() + 5 * 1000) }
      // });
    }
    
    PraticaNow(){
      this.localNotifications.schedule({
        id: 1,
        title: 'Atenção',
        text: 'Boas Práticas de Gestão',
        data: { mydata: 'Etapa: '+ this.pratica.etapa + ',\n Problema: '+ this.pratica.problema +',\n Solução: '+this.pratica.solucao},
        trigger: { every: { hour: 1, minute: 10}},

      });
       
       const toast = this.toastCtrl.create({
         message: "Agendamento da notificação Instantaneo !",
         duration: 3000
       });
       toast.present();
    }
   
    
    obterDadosPratica(){
      this.praticaService.buscarPraticaUsuario(localStorage.getItem('IdUsuario')).subscribe ( 
      retorno => {
       this.pratica = retorno;
      }, error => {
        const toast = this.toastCtrl.create
        ({
         message: error.error.message,
         duration: 3000
        });
        toast.present()
      });

      return this.pratica;
    }

    presentAlert(header, sub, msg) {

      let alert = this.alertCtrl.create({
        title: header,
        subTitle: sub,
        message: msg,
        buttons: ['OK']
      });
      alert.present();
    } 
  }
  
