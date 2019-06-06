import { Component } from '@angular/core';
import {  NavController, MenuController, ToastController, NavParams, Platform, AlertController } from 'ionic-angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';
import { PraticaService } from '../../service/PraticaService/PraticaService';
import { Pratica } from '../../models/pratica';

@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html'
})
export class ConfiguracoesPage {

   [x: string]: any;
   myHora : string;
   hora : number = 21;
   min : number = 0;
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

    AgendarSchedule(){
      
      if (this.myHora != null){
       this.hora = Number.parseInt(this.myHora.substring(0,2));
       this.min = Number.parseInt(this.myHora.substring(4,2));

       this.localNotifications.schedule({
        id: 5,
        title: 'Atenção',
        text: 'Boas práticas de gestão',
        data: {  mydata: this.obterDadosPratica().solucao},
        trigger: { every: { hour: this.hora, minute: this.min } },
        foreground: true // Show the notification while app is open
      });

      const toast = this.toastCtrl.create({
        message: "Agendamento da notificação efetuado !",
        duration: 3000
      });
      toast.present();
      }
    }

    /*
    scheduleNotification() {
      
      this.localNotifications.schedule({
        id: 1,
        title: 'Attention',
        text: 'Simons Notification',
        data: { mydata: 'My hidden message this is' },
        trigger: { in: 5, unit: ELocalNotificationTriggerUnit.DAY },
        foreground: true // Show the notification while app is open
      });
      
      // Works as well!
      // this.localNotifications.schedule({
      //   id: 1,
      //   title: 'Attention',
      //   text: 'Simons Notification',
      //   data: { mydata: 'My hidden message this is' },
      //   trigger: { at: new Date(new Date().getTime() + 5 * 1000) }
      // });
    }
    */

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
  
