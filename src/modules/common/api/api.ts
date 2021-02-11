import { HttpClient } from "./http-client";

export class Api extends HttpClient {
    private static classInstance?: Api;
  
    private constructor() {
      super('https://api.awesome-site.com');
    }
  
    public static getInstance() {
      if (!this.classInstance) {
        this.classInstance = new Api();
      }
  
      return this.classInstance;
    }
  

  }