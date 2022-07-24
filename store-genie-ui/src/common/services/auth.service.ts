
import axios, { AxiosResponse } from 'axios';
import { IAuthModel } from '../models/AuthModel';

export default class AuthService {
  async getShopifyAuthDetails(query: string): Promise<AxiosResponse<IAuthModel>> {
    return await axios.get<IAuthModel>(`https://296a-2401-4900-1c67-8ad5-c883-6c13-3240-7a4a.ngrok.io/${query}`);
  }
}