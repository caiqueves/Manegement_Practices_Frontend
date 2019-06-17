import { Component } from '@angular/core';
import {  NavController, MenuController, ToastController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { PraticaService } from '../../service/PraticaService/PraticaService';
import { Pratica } from '../../models/pratica';
import { TipoMetodologia } from '../../models/tipoMetodologia';

@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html'
})
export class ConfiguracoesPage {

   //scheduled = [];
   [x: string]: any;
   hora: any; 
   horas: any;
   minutos: any;
   pratica : Pratica;
   tipoMetodologia : TipoMetodologia;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuController: MenuController,
    public toastCtrl: ToastController,
    public plt: Platform,
    public localNotifications: LocalNotifications,
    public alertCtrl: AlertController,
    public praticaService: PraticaService,
    public loadingController: LoadingController
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
       /*
        this.localNotifications.on('click').subscribe(res => {
          let msg = res.data ? res.data.mydata : '';
          this.presentAlert(res.title, res.text, msg);
        });
        */
   
        this.localNotifications.on('trigger').subscribe(res => {
          let msg = res.data ? res.data.mydata : '';
          this.presentAlert(res.title, res.text, msg);
        });
      }); 
    }

    scheduleNotificationDay() {

     let loading = this.loadingController.create({ content: "Carregando" });

     loading.present();
 
     setInterval(() => {
     loading.dismissAll();
     }, 2000);

        this.obterDadosPratica() 
      
        //let metodologia;
  
        this.horas    = Number.parseInt(this.hora.toString().substr(0,2));
        this.minutos  = Number.parseInt(this.hora.toString().substr(3,2));

        /*
        if (this.pratica.tipo_metodologia_id == 1){
          metodologia = "TRADICIONAL";
        }else if (this.pratica.tipo_metodologia_id == 2){
          metodologia = "ÁGEIS";
        }else if (this.pratica.tipo_metodologia_id == 3){
          metodologia = "3.0";
        }
        */

        this.localNotifications.schedule({
          id: 1,
          title: 'Boas Práticas de Gestão',
          text: 'Etapa: '+ this.pratica.etapa + ' - Problema: '+ this.pratica.problema +' - Solução: '+ this.pratica.solucao,
          data: { mydata: 'Etapa: '+ this.pratica.etapa + ' - Problema: '+ this.pratica.problema +' - Solução: '+ this.pratica.solucao},   
          trigger: { count : 1, every: { hour: this.horas,  minute: this.minutos } },
        });        
        
        localStorage.setItem("horaNotificacao",this.hora);

        const toast = this.toastCtrl.create({
          message: "Agendamento da notificação efetuado !",
          duration: 3000
        });
        toast.present();                  
    }

    /*
    getAll() {
      this.localNotifications.getAll().then((res: ILocalNotification[]) => {
        this.scheduled = res;
      })
    }
    */

    obterDadosPratica(){
      this.praticaService.buscarPraticaUsuario(localStorage.getItem('IdUsuario')).subscribe ( 
      retorno => {
        
      this.pratica = retorno;
      /*
       this.pratica.id = retorno.id;
       this.pratica.etapa = retorno.etapa;
       this.pratica.problema = retorno.problema;
       this.pratica.solucao = retorno.solucao;
       this.pratica.fonte = retorno.fonte;
       //this.tipoMetodologia = retorno.tipoMetodologia;
       //this.pratica.tipo_metodologia_id = this.tipoMetodologia.id;
       */
      }, error => {
        const toast = this.toastCtrl.create
        ({
         message: error.message,
         duration: 3000
        });
        toast.present()
      });

      return this.pratica;
      //'Etapa: '+ this.pratica.etapa + ' - Problema: '+ this.pratica.problema +' - Solução: '+this.pratica.solucao;
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
  
