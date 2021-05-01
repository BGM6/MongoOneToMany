const Farm = require('../models/farmSchema');
const Product = require('../models/productSchema');


//Show all farms link
module.exports.renderFarms = async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', {farms});
};

//Render new farm form
module.exports.renderNewForm = (req, res) => {
    res.render('farms/new');
};

//Create new farm
module.exports.createNewFarm = async (req, res) => {
    const {name, city, email} = req.body;
    const newFarm = new Farm({name, city, email});
    await newFarm.save();
    res.redirect('/farms');
};

//Relation Routes

//This associates the product to the farm relationship
//This renders the form to add the product to the farm
module.exports.renderFarmProductsRelation = async (req, res) => {
    const {id} = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', {farm});
};

//Products body to post to show page to associated farm
/*
Need the associated farm ID,
Find farm by using findById
Destructure the body or just pass in the whole body
Create a new product with the body passed in
Then push the product into the product array contained in the farm schema EX: farm.products.push(product)
Since its a two way relation associate the product.farm = farm
Save the farm
Save the product
redirect to the show page farm/:id
*/

module.exports.farmProductRelation = async (req, res) => {
    const {id} = req.params;
    const farm = await Farm.findById(id);
    const {name, price, category} = req.body;
    const product = new Product({name, price, category});

    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${id}`);
};

//Farm show page
//THIS IS THE ROUTE WHERE THE PRODUCTS ARE POPULATED TO THE ASSOCIATED FARM
/*
Find a farm by Id
use .populate('name of the array you want populated') in this case its populate.('products');
render the products to where the farms are render which is the show page in this example.
*/
module.exports.farmShowPage = async (req, res) => {
    const {id} = req.params;
    const farm = await Farm.findById(id).populate('products');
    res.render('farms/show', { farm })
}

//FARM DELETE ROUTE TO DELETE ONE FARM WHICH WILL DELETE ALL THE PRODUCTS ASSOCIATED WITH IT
/*
To delete all associated products when a farm is deleted we use a mongoose middleware
mongoose findByIdAndDelete triggers findOneAndDelete() which is only available under the hood of findByIdAndDelete
The Deletion code must be written on the farm schema in this Example.
*/

module.exports.deleteFarmAndProducts = async (req, res) => {
    const {id} = req.params;
    const farm = await Farm.findByIdAndDelete(id);
    res.redirect('/farms');
}