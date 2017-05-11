'use strict';
const data = require('./data/payments.json'),
      //jsonQuery = require('json-query'),
      devices = data.Devices,
      customers = data.Customers;

class Vod {

    getAllPayments() {
        var price,
            discount,
            numOfDevices,
            billing = [];
        //loop through all the coustomers, save the discount they have and
        //the number of devices, then loop through devices to check the
        //price for every device, do the bill: [numOfVods*price-discount]
        for (let i in customers) {
            discount = customers[i].discount;
            numOfDevices = customers[i].numOfVods;
            for (let j in devices) {
                if (devices[j].type == customers[i].type)
                    price = devices[j].price;
            }
            price = price * numOfDevices - discount;
            billing.push({Name: `${customers[i].name}`,
                          Bill: `${price}`});
        }
        return billing;
    }

    getUserData(id) {
        let foundUser = false;
        let customer;
        for (let i in customers) {
            if (id == customers[i].id){
                foundUser = true;
                customer = customers[i];
            }
        }
        if (!foundUser)
            return ("Error: customer not found!");
        else
            return customer;
    }
}

module.exports = () => {
    var vod = new Vod();
    return vod;
}