import { Injectable } from '@angular/core';

let config_key_name = "config";

@Injectable()
export class ConfiguracaoService {

  public config = {
      showSlide: false,
      email: "",
      token : "",
      id : 0
  }

  constructor() {

  }

  // Recupera os dados do localstorage
  getConfigData(): any{
      return localStorage.getItem(config_key_name);
  }

  // Grava os dados do localstorage
  setConfigData(showSlide?: boolean, email?: string, token?: string, id?: number){
      let config = {
          showSlide: true,
          email: "",
          token: "",
          id: 0
      };

      if(showSlide){
        config.showSlide = showSlide;
      }

      if(email){
        config.email = email;
      }

      if(token){
        config.token = token;
      }

      if(id){
        config.id = id;
      }


      localStorage.setItem(config_key_name, JSON.stringify(config));
  } 
}
