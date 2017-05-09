const express = require ('express'),
      bodyParser = require ('body-parser'),
      vod = require ('./data'),
      app = express(),
      port = process.env.PORT || 3000,
      data = vod();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

app.get('/', (req,res) => {
    //send API
});

app.get('/getAllPayments', (req,res) => {
    res.json(data.getAllPayments());
});

app.get('*', (req, res) => {
    res.send(`global handler`);
});

app.listen(port);
console.log(`listening on port ${port}`);