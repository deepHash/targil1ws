'use strict';
const data = require('./data/payments.json');
      customers = data.customers;
      devices = data.devices;

class vod {

    getAllPayments() {
        return customers;
    }
}

module.exports = () => {
    var aVod = new vod();
    return aVod;
}