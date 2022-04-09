const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const port = process.env.PORT || 4000;

const crypto = require('crypto');
let nonce = crypto.randomBytes(16).toString('base64');

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
      " font-src 'self';" +
      ` style-src 'self' 'nonce-${nonce}';`
  );
  next();
});

app.get("/", (req, res) => {
  res.send(`<h1>Hello world</h1>
    <script type="text/javascript">
      var myNonce = "${nonce}";
    </script>
    <div id="sumup-card">dara</div>
    <script src="http://localhost:8003/sdkv2.js"></script>
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
    <div>footer</div>
 `);
});

app.get("/json", (req, res) => {
  res.json({ hello: "world" });
});

server.listen(port, () => {
  console.log("listening on:", port);
});
