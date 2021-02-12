import { User } from "../models/user";
import { HttpClient } from "./http-client";
export class Api extends HttpClient {
  //https://levelup.gitconnected.com/use-case-of-singleton-with-axios-and-typescript-da564e76296
  private static classInstance?: Api;

  private constructor() {
    super('https://eaa4ee00-76a7-4fda-bcb2-e81c13585b6a-8080.apps.codespaces.githubusercontent.com');
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api();
    }

    return this.classInstance;
  }

  public register = (user: User) => this.instance.post<User>('/auth/register', user,);

  public auth = () => this.instance.get<User>('/auth');


}