
export interface IAuthModel {
  apiKey: string,
  permissionUrl: string;
  shop: string,
  host: string,
  isShopInstalled: boolean
}

export interface IAuthCallbackModel {
  appUrl: string;
}