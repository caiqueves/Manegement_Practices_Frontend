import { Injectable } from '@angular/core';

let config_key_name = "config";

@Injectable()
export class ConfiguracaoProvider {

  public config = {
      showSlide: false,
      email: "",
      token : ""
  }

  constructor() {

  }

  // Recupera os dados do localstorage
  getConfigData(): any{
      return localStorage.getItem(config_key_name);
  }

  // Grava os dados do localstorage
  setConfigData(showSlide?: boolean, email?: string, token?: string){
      let config = {
          showSlide: true,
          email: "",
          token: "",
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

      localStorage.setItem(config_key_name, JSON.stringify(config));
  } 
}
