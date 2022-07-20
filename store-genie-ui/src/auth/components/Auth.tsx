import { AppConfigV2 } from "@shopify/app-bridge";
import { useContext } from "react";
import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../common/contexts/AuthContext";
import Callback from "./Callback";
import Consent from "./Consent";

export interface AuthProps {
  config: AppConfigV2;
  permissionUrl: string;
  isAppInstalled: boolean;
}

export default function Auth() {
  const { isAppInstalled } = useContext(AuthContext);

  if (isAppInstalled) {
    return <Navigate to="/app" replace={true} />
  }

  return (
    <Routes>
      <Route path="/" element={<Consent />}></Route>
      <Route path="/callback" element={<Callback />}></Route>
    </Routes>
  );
}