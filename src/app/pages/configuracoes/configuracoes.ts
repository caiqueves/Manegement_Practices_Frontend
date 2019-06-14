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
      var horaRegistrada = localStorage.getItem('horaNotificacao');

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

    scheduleNotificationDay() {

      let year = new Date().getFullYear();
      let month = new Date().getMonth();
      let day = new Date().getDate();
      let metodologia;

      this.horas    = this.hora.toString().substr(0,2);
      this.minutos  = this.hora.toString().substr(3,2);
      
      let time1 = new Date(year, month, day, this.horas, this.minutos ,0, 0);
      
      this.obterDadosPratica();

      if (this.pratica.id == 1){
        metodologia = "TRADICIONAL";
      }else if (this.pratica.id == 2){
        metodologia = "ÁGIL";
      }else if (this.pratica.id == 3){
        metodologia = "3.0";
      }

      this.localNotifications.schedule({
        id: 1,
        title: 'Boas Práticas de Gestão - '+metodologia,
        text: 'Etapa: '+ this.pratica.etapa + 'Problema: '+this.pratica.problema +'Solução: '+this.pratica.solucao,
        data: { mydata: 'Etapa: '+ this.pratica.etapa + 'Problema: '+ this.pratica.problema +'Solução: '+this.pratica.solucao},
        trigger: {firstAt: new Date(time1)},
        every: "day"
      });        
      
      localStorage.setItem("horaNotificacao",this.hora);

      const toast = this.toastCtrl.create({
        message: "Agendamento da notificação efetuado !",
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
  
