import express from 'express';
import Shopify, { ApiVersion, AuthQuery } from '@shopify/shopify-api';
import cors from 'cors';
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://35e5-122-161-84-115.ngrok.io']
}));
app.use(express.json());

const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST, HOST_SCHEME, PORT } = process.env;

const serverPort = PORT || 3000;

Shopify.Context.initialize({
  API_KEY,
  API_SECRET_KEY,
  SCOPES: [SCOPES],
  HOST_NAME: HOST.replace(/https?:\/\//, ""),
  HOST_SCHEME,
  IS_EMBEDDED_APP: true,
  API_VERSION: ApiVersion.July22,
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage()
});
// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS: { [key: string]: { scope: string, token: string} | undefined } = {};

// the rest of the example code goes here

app.get("/", async (req: express.Request, res: express.Response) => {
  const shop: string = req.query.shop.toLocaleString() || '';
  // This shop hasn't been seen yet, go through OAuth to create a session
  if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
    let authRoute = await Shopify.Auth.beginAuth(
      req,
      res,
      shop,
      '/auth/callback',
      false,
    );

    // not logged in, redirect to login
    // new line
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
    const session = await Shopify.Auth.validateAuthCallback(
      req,
      res,
      req.query as unknown as AuthQuery,
    ); // req.query must be cast to unkown and then AuthQuery in order to be accepted
    ACTIVE_SHOPIFY_SHOPS[SHOP] = {
      scope: session.scope,
      token: session.accessToken
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