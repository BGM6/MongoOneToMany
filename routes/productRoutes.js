const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.route('/')
    .get(productController.renderProduct)
    .post(productController.createNewProduct);

router.route('/new')
    .get(productController.renderNewProduct);

router.route('/:id/update')
    .get(productController.renderUpdateForm);

router.route('/:id')
    .put(productController.updateProduct)
    .delete(productController.deleteProduct)
    //POPULATE FARM WITH PRODUCT ROUTE
    .get(productController.populateFarmProduct);

router.route('/:id/show')
    .get(productController.showPage);


module.exports = router;