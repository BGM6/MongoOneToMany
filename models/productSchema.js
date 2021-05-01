const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: String,
    price: Number,
    category: String,

    //Two way one to many relation
    farm: [{
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }]

});

const Product = model('Product', productSchema);

module.exports = Product;