import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Loading from "../../common/components/Loading/Loading";
import { IAuthCallbackModel } from "../../common/models/AuthModel";
import AuthService from "../../common/services/auth.service";

export default function Callback () {
  const [isLoading, setIsloading] = useState(true);
  const [appUrl, setAppUrl] = useState('');

  useEffect(() => {
    const authService = new AuthService();

    authService
      .getShopifyAuthCallback(window.location.search)
      .then((response: AxiosResponse<IAuthCallbackModel>) => {
        setAppUrl(response.data.appUrl);
        setIsloading(false);
      })
      .catch((error: AxiosError) => {
        console.log('ERROR: ', error);
      })
  })

  if (isLoading) {
    return <Loading />;
  }

  window.location.assign(appUrl)

  return <Loading />;
}