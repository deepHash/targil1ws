9
var mongoose = require('mongoose'),
    schema = mongoose.Schema,

    CustomerSchema = new schema({
        id: {type:Number, index:1, required:true, unique:true},
        name: String,
        type: {type:String, required:true},
        numOfVods: Number,
        discount: Number
    }, {collection: 'Customers'});

     DeviceSchema = new schema({
        type: {type:String, index:1, required:true, unique:true},
        price: {type:Number, required:true}
    }, {collection: 'Devices'});

//var Schemas = mongoose.model('Customer' : CustomerSchema, 'Device' : DeviceSchema );

var Customer = mongoose.model('Customer', CustomerSchema),
    Device   = mongoose.model('Device', DeviceSchema);

module.exports = {
    Customer: Customer,
    Device: Device
};