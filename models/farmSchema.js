const {Schema, model} = require('mongoose');
const Product = require('./productSchema');

const farmSchema = new Schema({
    name: String,
    city: String,
    email: String,

    //Two way one to many relation
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

//Query middleware example to illustrate how it works
/*
pre middle ware doesn't return any useful data when deleting because it runs before the query
*/
// farmSchema.pre('findOneAndDelete', async function (data) {
//     console.log('PRE MIDDLEWARE!');
//     console.log(data);
// });

// farmSchema.post('findOneAndDelete', async function (data) {
//     console.log('POST MIDDLEWARE!');
//     console.log(data);
// });

farmSchema.post('findOneAndDelete', async function (farm) {
    //if the farm products array is not empty/ if there is something in there;
    if (farm.products.length) {
        //To delete many we pass in the _id and use mongoose $in operator and pass
        // in the array which in this EX is farm.products
        const result = await Product.deleteMany({_id: {$in: farm.products}});
        console.log(result);
    }
});


const Farm = model('Farm', farmSchema);
module.exports = Farm;
