const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const port = process.env.PORT || 4000;

const crypto = require('crypto');

app.get("/", (req, res) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.setHeader(
    "Content-Security-Policy",
      " font-src 'self';" +
      ` style-src 'self' 'nonce-${nonce}';`
  );

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
  res.send(`<h1>Test CSP</h1>
    <div>Test without nonce</div>
    <script type="text/javascript">
      var myNonce = "${nonce}";
    </script>
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
