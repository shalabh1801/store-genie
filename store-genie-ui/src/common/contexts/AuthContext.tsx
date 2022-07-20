import { AppConfigV2 } from "@shopify/app-bridge";
import { AxiosError, AxiosResponse } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import AuthService from "../services/auth.service";

export interface AuthContextProps {
  config: AppConfigV2;
  permissionUrl: string;
  isAppInstalled: boolean;
}

const defaultAuthContextValues: AuthContextProps = {
  config: {
    apiKey: '',
    host: ''
  },
  isAppInstalled: false,
  permissionUrl: ''
}

const AuthContext = createContext<AuthContextProps>(defaultAuthContextValues);

const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [config, setConfig] = useState<AppConfigV2>({
    apiKey: '',
    host: ''
  });
  const [permissionUrl, setPermissionUrl] = useState<string>('');
  const [isAppInstalled, setIsAppInstalled] = useState<boolean>(false);

  useEffect(() => {
    const authService = new AuthService();
    authService
      .getShopifyAuthDetails(window.location.search)
      .then((response: AxiosResponse) => {
        console.log('RESPONSE: ', response);

        setConfig({
          apiKey: response.data.apiKey,
          host: response.data.host
        });

        setPermissionUrl(response.data.permissionUrl);
        setIsAppInstalled(response.data.isAppInstalled);
        setIsLoading(false);
      }, (error: AxiosError) => {
        console.log('ERROR: ', error);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ config, permissionUrl, isAppInstalled }}>
      { isLoading ? <Loading /> : children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };

