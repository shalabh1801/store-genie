import { createApp } from "@shopify/app-bridge";
import { isShopifyEmbedded } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import { useContext } from "react";
import Loading from "../../common/components/Loading/Loading";
import { AuthContext } from "../../common/contexts/AuthContext";

export default function Consent () {
  const { config, permissionUrl } = useContext(AuthContext);

  if (isShopifyEmbedded()) {
    const app = createApp({
      apiKey: config?.apiKey || '',
      host: config?.host || ''
    });

    Redirect.create(app).dispatch(Redirect.Action.REMOTE, permissionUrl);
    // Otherwise, redirect using the `window` object
  } else {
    window.location.assign(permissionUrl);
  }

  return <Loading />
}