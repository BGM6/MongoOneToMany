const express = require('express');
const router = express.Router();
const farmController = require('../controllers/farmController');

router.route('/')
    .get(farmController.renderFarms)
    .post(farmController.createNewFarm);

router.route('/new')
    .get(farmController.renderNewForm);

//Relation routes
router.route('/:id/products/new')
    .get(farmController.renderFarmProductsRelation);

router.route('/:id/products')
    .post(farmController.farmProductRelation);

//Farm show page
//THIS IS THE ROUTE WHERE THE PRODUCTS ARE POPULATED TO THE ASSOCIATED FARM
router.route('/:id')
    .get(farmController.farmShowPage)
    .delete(farmController.deleteFarmAndProducts);

//FARM DELETE ROUTE TO DELETE ONE FARM WHICH WILL DELETE ALL THE PRODUCTS ASSOCIATED WITH

module.exports = router;