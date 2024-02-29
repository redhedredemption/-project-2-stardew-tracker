var express = require('express');
var router = express.Router();
const bundleCtrl = require('../controllers/bundle')
const isLoggedIn = require('../config/auth')


router.get('/', bundleCtrl.index)
router.get('/new', bundleCtrl.new)

router.get('/:id', bundleCtrl.show)
router.post('/', bundleCtrl.create)



module.exports = router;