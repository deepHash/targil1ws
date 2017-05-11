const express = require ('express'),
      bodyParser = require ('body-parser'),
      vod = require ('./vod-module'),
      app = express(),
      port = process.env.PORT || 3000,
      data = vod();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

app.get('/', (req,res) => {
    //send API
    res.send(`<!doctype><html>
            <head><title></title></head>
            <body>          
            <h1>API</h1>
            </body>
            </html>`);
});

// app.all('*', (req, res, next) => {
//     res.send(`global handler`);
//     next();
// });

app.get('/getAllPayments/', (req,res) => {
    res.status(200).json(data.getAllPayments());
});

app.post('/getUserData/', (req,res) => {
    res.status(200).json(data.getUserData(req.body.id));
});


app.listen(port);
console.log(`listening on port ${port}`);