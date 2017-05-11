const express = require ('express'),
      bodyParser = require ('body-parser'),
      vod = require ('./vod-module'),
      app = express(),
      port = process.env.PORT || 3000,
      data = vod();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//default page to for API instructions
app.get('/', (req,res) => {
    //send API
    res.sendFile(`${__dirname}/api.html`);
});

//get route
app.get('/getAllPayments/', (req,res) => {
    res.status(200).json(data.getAllPayments());
});
//post route
app.post('/getUserData/', (req,res) => {
    res.status(200).json(data.getUserData(req.body.id));
});
//put route
app.put('/getTypeByPrice/:min_price/:max_price', (req,res) => {
    res.status(200).json(data.getTypeByPrice(
                                req.params.min_price,req.params.max_price));
});


//routs for all images:
app.get('/get.jpg', (req,res) => {
    console.log(`${__dirname}/includes/get.jpg`);
    res.sendFile(`${__dirname}/includes/get.jpg`);
});

app.get('/post.jpg', (req,res) => {
    res.sendFile(`${__dirname}/includes/post.jpg`);
});

app.get('/put.jpg', (req,res) => {
    res.sendFile(`${__dirname}/includes/put.jpg`);
});

app.get('/error.jpg', (req,res) => {
    res.sendFile(`${__dirname}/includes/error.jpg`);
});
//global handler
app.all('*', (req, res) => {
    res.send(`error: route not found, global handler`);
});


app.listen(port);
console.log(`listening on port ${port}`);