
import axios, { AxiosResponse } from 'axios';
import { IAuthCallbackModel, IAuthModel } from '../models/AuthModel';

export default class AuthService {
  async getShopifyAuthDetails(query: string): Promise<AxiosResponse<IAuthModel>> {
    return await axios.get<IAuthModel>(`https://e36b-122-161-84-115.ngrok.io/${query}`);
  }

  async getShopifyAuthCallback(query: string): Promise<AxiosResponse<IAuthCallbackModel>> {
    return await axios.get<IAuthCallbackModel>(`https://e36b-122-161-84-115.ngrok.io/callback/${query}`);
  }
}