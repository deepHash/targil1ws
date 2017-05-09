'use strict';
const data = require('./payments.json'),
      devices = data.Devices,
      customers = data.Customers;

class vod {

    getAllPayments() {
        return devices;
    }
}

module.exports = () => {
    var aVod = new vod();
    return aVod;
}