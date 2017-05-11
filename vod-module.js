'use strict';
const data = require('./data/payments.json'),
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
        for (let i in customers) {
            discount = customers[i].discount;
            numOfDevices = customers[i].numOfVods;
            for (let j in devices) {
                if (devices[j].type == customers[i].type)
                    price = devices[j].price;
            }
            //price for every device, do the bill: [numOfVods*price-discount]
            price = price * numOfDevices - discount;
            billing.push({Name: `${customers[i].name}`,
                          Bill: `${price}`});
        }
        return billing;
    }

    getUserData(id) {
        let foundUser = false;
        let customer;
        //searches all customers by id
        for (let i in customers) {
            if (id == customers[i].id){
                //if found, return all data about the customer
                foundUser = true;
                customer = customers[i];
            }
        }
        if (!foundUser)
            //if no customer found with the suppled id, return error message
            return ("Error: customer not found!");
        else
            return customer;
    }

    getTypeByPrice(minPrice, maxPrice) {
        var pricedDevices = [];
        //looping through all devices and checking if the price of it
        //is in the given limit, between min_price and max_price
        for (let i in devices) {
            if (minPrice <= devices[i].price && maxPrice >= devices[i].price)
                pricedDevices.push(devices[i]);
        }
        return pricedDevices;
    }
}

module.exports = () => {
    var vod = new Vod();
    return vod;
}