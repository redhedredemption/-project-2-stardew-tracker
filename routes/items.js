const express = require('express');
const router = express.Router();
const itemsCtrl = require('../controllers/items');

router.get('/items/new', itemsCtrl.new);
router.post('/items', itemsCtrl.create)
router.post('/bundles/:bundleId/items', itemsCtrl.addToList)
router.delete('/bundles/:itemId/items/:itemId', itemsCtrl.delete)



module.exports = router;