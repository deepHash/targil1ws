'use strict';
const consts = require ('./../data/consts'),
      Schemas = require('./../data/payments'),
      mongoose = require('mongoose'),
      device = Schemas.Device,
      customer = Schemas.Customer;

mongoose.Promise = global.Promise;
mongoose.connect(consts.MLAB_KEY);
const conn = mongoose.connection; 

class Vod {

//Had a problem when using two model schemas, this constructor takes all the data
//from collection device in mlabs and sets it in the global devices var and the data
//from collection customer in mlabs and sets it in customers
    constructor() {
        this.customers;
        this.devices;

        conn.on('error',
            (err) => {
                console.log(`connection error: ${err}`);
            });
        conn.once('open',
            () => {
                console.log('connected');
                device.find({},
                    (err, device) => {
                        if (err) console.log(`query err: ${err}`);
                        this.devices = device;
                    });
                customer.find({},
                    (err, customer) => {
                        if (err) console.log(`query err: ${err}`);
                        this.customers = customer;
                        mongoose.disconnect();   
                    })
            });    
    }

    getAllPayments() {
        var price,
            discount,
            numOfDevices,
            billing = [];
        //loop through all the coustomers, save the discount they have and
        //the number of devices, then loop through devices to check the
        for (let i in this.customers) {
            discount = this.customers[i].discount;
            numOfDevices = this.customers[i].numOfVods;
            for (let j in this.devices) {
                if (this.devices[j].type == this.customers[i].type)
                    price = this.devices[j].price;
            }
            //price for every device, do the bill: [numOfVods*price-discount]
            price = price * numOfDevices - discount;
            billing.push({Name: `${this.customers[i].name}`,
                          Bill: `${price}`});
        }
        return billing;
    }

    getUserData(id) {
        let foundUser = false;
        //searches all customers by id
        for (let i in this.customers) {
            if (id == this.customers[i].id){
                //if found, return all data about the customer
                foundUser = true;
                return this.customers[i];
            }
        }
        if (!foundUser)
            //if no customer found with the suppled id, return error message
            return ("Error: customer not found!");
    }

    getTypeByPrice(minPrice, maxPrice) {
        var pricedDevices = [];
        //looping through all devices and checking if the price of it
        //is in the given limit, between min_price and max_price
        for (let i in this.devices) {
            if (minPrice <= this.devices[i].price && maxPrice >= this.devices[i].price)
                pricedDevices.push(this.devices[i]);
        }
        return pricedDevices;
    }
}

module.exports = () => {
    var vod = new Vod();
    return vod;
}