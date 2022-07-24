import Shopify, { ApiVersion, DeliveryMethod } from '@shopify/shopify-api';
import axios from 'axios';
import cors from 'cors';
import express from 'express';
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://b330-2401-4900-1c67-8ad5-c883-6c13-3240-7a4a.ngrok.io']
}));
app.use(express.json());

const { API_KEY, API_SECRET_KEY, SCOPES, HOST, HOST_SCHEME, PORT } = process.env;

const serverPort = PORT || 3000;

Shopify.Context.initialize({
  API_KEY,
  API_SECRET_KEY,
  SCOPES: [SCOPES],
  HOST_NAME: HOST.replace(/https?:\/\//, ""),
  HOST_SCHEME,
  IS_EMBEDDED_APP: true,
  API_VERSION: ApiVersion.July22,
});
// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS: { [key: string]: { scope: string[], token: string} | undefined } = {};

// the rest of the example code goes here

app.get("/", async (req: express.Request, res: express.Response) => {
  const shop: string = req.query.shop?.toLocaleString() || '';
  const scopesChanged = SCOPES.split(',').some(scope => ACTIVE_SHOPIFY_SHOPS[shop]?.scope.indexOf(scope) === -1);
  // This shop hasn't been seen yet, go through OAuth to create a session
  if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined || scopesChanged) {
    let authRoute = await Shopify.Auth.beginAuth(
      req,
      res,
      shop,
      '/callback',
      false,
    );

    // not logged in, redirect to login
    res.status(200).send({
      apiKey: API_KEY,
      permissionUrl: authRoute,
      shop: req.query.shop,
      host: req.query.host,
      isShopInstalled: false
    });
  } else {
    res.status(200).send({
      apiKey: API_KEY,
      host: req.query.host,
      isShopInstalled: true
    });
  }
});

app.get("/callback", async (req: express.Request, res: express.Response) => {
  try {
    const shop: string = req.query.shop.toLocaleString();
    const code: string = req.query.code.toLocaleString();

    const session = await axios.post<{
      scope: string,
      access_token: string
    }>(`https://${shop}/admin/oauth/access_token`, {
      client_id: API_KEY,
      client_secret: API_SECRET_KEY,
      code: code
    })

    ACTIVE_SHOPIFY_SHOPS[shop] = {
      scope: session.data.scope.split(','),
      token: session.data.access_token
    };
  } catch (error) {
    console.log('REDIRECT toh hua tha :/');
    console.error(error); // in practice these should be handled more gracefully
  }
  return res.redirect(`https://${req.query.shop}/admin/apps/store-genie`);
});

app.listen(serverPort, () => {
  console.log(`your app is now listening on port ${serverPort}`);
});