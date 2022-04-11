const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const port = process.env.PORT || 4000;

const crypto = require('crypto');

//
//default-src 'self';
//block-all-mixed-content; child-src https://www.google.com https://gateway-theta.sam-app.ro;
//connect-src 'self' https://checkout.ostheta.net https://checkoutv2.ostheta.net https://checkout.sumuplink.icu/api/ https://api.notolytix.com https://o196784.ingest.sentry.io https://www.google-analytics.com https://www.googletagmanager.com cdn.ostheta.in https://gateway-theta.sam-app.ro https://api-theta.sam-app.ro;
//font-src 'self' use.typekit.net https://fonts.googleapis.com https://fonts.gstatic.com https://checkout.ostheta.net https://cdnjs.cloudflare.com cdn.ostheta.in; frame-ancestors https://dashboard.sam-app.ro https://dashboard-theta.sam-app.ro https://*.sumup-vercel.app https://*.vercel.app https://localhost:* https://127.0.0.1:*;
//img-src 'self' https://cdn.shoplo.com cdn.ostheta.in https://my-images.sumup.com https://catalog-images-live.s3.amazonaws.com https://catalog-images-dev.s3.amazonaws.com/ https://catalog-images-stage.s3.amazonaws.com https://cdn.sumup.store/ https://www.shopos.local.shoplonet.com cdn.ostheta.in static.sumup.com;
//script-src 'self' ajax.googleapis.com https://www.google.com/recaptcha/api.js https://www.gstatic.com https://gateway-theta.sam-app.ro https://net-tracker.notolytix.com/main.js 'unsafe-eval' https://cdnjs.cloudflare.com https://www.google-analytics.com https://www.googletagmanager.com cdn.ostheta.in https://api-theta.sam-app.ro 'nonce-pMzT0eRwcX1GrzEyheGCVg==';
//style-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://cdnjs.cloudflare.com https://www.google-analytics.com https://www.googletagmanager.com cdn.ostheta.in; upgrade-insecure-requests

app.get("/", (req, res) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.setHeader(
    "Content-Security-Policy",
    `default-src 'self'; block-all-mixed-content; child-src https://www.google.com https://gateway-theta.sam-app.ro; connect-src 'self' https://checkout.ostheta.net https://checkoutv2.ostheta.net https://checkout.sumuplink.icu/api/ https://api.notolytix.com https://o196784.ingest.sentry.io https://www.google-analytics.com https://www.googletagmanager.com cdn.ostheta.in https://gateway-theta.sam-app.ro https://api-theta.sam-app.ro; font-src 'self' use.typekit.net https://fonts.googleapis.com https://fonts.gstatic.com https://checkout.ostheta.net https://cdnjs.cloudflare.com cdn.ostheta.in; frame-ancestors https://dashboard.sam-app.ro https://dashboard-theta.sam-app.ro https://*.sumup-vercel.app https://*.vercel.app https://localhost:* https://127.0.0.1:*; img-src 'self' https://cdn.shoplo.com cdn.ostheta.in https://my-images.sumup.com https://catalog-images-live.s3.amazonaws.com https://catalog-images-dev.s3.amazonaws.com/ https://catalog-images-stage.s3.amazonaws.com https://cdn.sumup.store/ https://www.shopos.local.shoplonet.com cdn.ostheta.in static.sumup.com; script-src 'self' ajax.googleapis.com https://www.google.com/recaptcha/api.js https://www.gstatic.com https://gateway-theta.sam-app.ro https://net-tracker.notolytix.com/main.js 'unsafe-eval' https://cdnjs.cloudflare.com https://www.google-analytics.com https://www.googletagmanager.com cdn.ostheta.in https://api-theta.sam-app.ro 'nonce-${nonce}=='; style-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://cdnjs.cloudflare.com https://www.google-analytics.com https://www.googletagmanager.com cdn.ostheta.in; upgrade-insecure-requests`);

  res.send(`<h1>Test CSP</h1>
    <div>Test using generated nonce: ${nonce}</div>
    <script type="text/javascript">
      var myNonce = "${nonce}";
    </script>
    <div id="sumup-card"></div>
    <script type="text/javascript" src="https://gateway-theta.sam-app.ro/gateway/ecom/card/v2/sdkv2.js"></script>
    <script type="text/javascript">
        SumUpPayment.mount({
            nonce: myNonce,
            checkoutId: 'demo',
            onResponse: function(type, body) {
                console.log('Type', type);
                console.log('Body', body);
            }
        });
    </script>
    <a href="/without-nonce">See without nonce</a>
    <div>Footer</div>
 `);
});

app.get("/without-nonce", (req, res) => {
  res.setHeader(
    "Content-Security-Policy",
      " font-src 'self';" +
      ` style-src 'self';`
  );
  res.send(`<h1>Test CSP</h1>
    <div>Test without nonce</div>
    <div id="sumup-card"></div>
    <script type="text/javascript" src="https://gateway-theta.sam-app.ro/gateway/ecom/card/v2/sdkv2.js"></script>
    <script type="text/javascript">
        SumUpPayment.mount({
            checkoutId: 'demo',
            onResponse: function(type, body) {
                console.log('Type', type);
                console.log('Body', body);
            }
        });
    </script>
    <a href="/">See without nonce</a>
    <div>Footer</div>
 `);
});

app.get("/json", (req, res) => {
  res.json({ hello: "world" });
});

server.listen(port, () => {
  console.log("listening on:", port);
});
