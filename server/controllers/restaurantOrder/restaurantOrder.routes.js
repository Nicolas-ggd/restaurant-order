const express = require('express');
const router = express.Router();
const orderController = require('./restaurantOrder.controller');

router.post('/create', orderController.CreateOrder);
router.get('/get-order', orderController.getOrders);
router.post('/delete-order', orderController.deleteOrder);
router.get('/find-order', orderController.findOrder);

module.exports = router;