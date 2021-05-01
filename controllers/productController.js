const Product = require('../models/productSchema');

//Create
module.exports.renderNewProduct = (req, res) => {
    res.render('products/new');
};

module.exports.createNewProduct = async (req, res) => {
    const {name, price, category} = req.body;
    const newProduct = new Product({name, price, category});
    await newProduct.save();
    res.redirect('/products');
};

//Read
module.exports.renderProduct = async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', {products});
};

//Update
module.exports.renderUpdateForm = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/update', {product});
};

module.exports.updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name, price, category} = req.body;
    await Product.findByIdAndUpdate(id, {name, price, category}, {
        runValidators: true, new: true
    });
    res.redirect('/products');
};

//Delete

module.exports.deleteProduct = async (req, res) => {
    const {id} = req.params;
    const deleteProduct = Product.findByIdAndRemove(id);
    await deleteProduct.remove();
    res.redirect('/products');
};

//Show page
module.exports.showPage = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show', {product});
};

//THIS IS WHERE THE FARM IS POPULATED WITH THE ASSOCIATED FARM
module.exports.populateFarmProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id).populate('farm', 'name');
    res.render('products/show', {product});
};

