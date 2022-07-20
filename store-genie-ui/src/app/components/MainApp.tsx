import { AppConfigV2 } from "@shopify/app-bridge";
import { Provider } from "@shopify/app-bridge-react";
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../common/contexts/AuthContext";

export default function MainApp() {
  const { config, isAppInstalled } = useContext(AuthContext);

  if (!config.apiKey || !config.host || !isAppInstalled) {
    return <Navigate to='/auth' replace={true}></Navigate>
  }

  const appBridgeConfig: AppConfigV2 = {
    apiKey: config.apiKey,
    host: config.host,
  };

  return (
    <Provider config={appBridgeConfig}>
      <div>Main App!</div>
    </Provider>
  );
}