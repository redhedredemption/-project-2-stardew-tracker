var express = require('express');
var router = express.Router();
const bundleCtrl = require('../controllers/bundle')
const isLoggedIn = require('../config/auth')


router.get('/', bundleCtrl.index)
router.get('/add', bundleCtrl.add)

router.get('/:id', bundleCtrl.show)
router.post('/', bundleCtrl.create)



module.exports = router;