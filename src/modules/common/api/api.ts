import { User } from "../models/user";
import { HttpClient } from "./http-client";
export class Api extends HttpClient {
  //https://levelup.gitconnected.com/use-case-of-singleton-with-axios-and-typescript-da564e76296
  private static classInstance?: Api;

  private constructor() {
    super(process.env.REACT_APP_API_BASE);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api();
    }

    return this.classInstance;
  }

  public register = (user: User) => this.instance.post<User>('/auth/register', user, { withCredentials: true });

  public login = (values: { email: string; password: string; }) => this.instance.post<User>('/auth/log-in', values, { withCredentials: true })

  public auth = () => this.instance.get<User>('/auth', { withCredentials: true });

  public logout = () => this.instance.post('/auth/log-out', {}, { withCredentials: true });

  public forgotPassword = (values: { email: string; }) => this.instance.post('/auth/forgot-password', values);
}
