const vendorController =require('../controllers/vendorController')
const express =require('express')

const router=express.Router();
//endpoints
router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.vendorLogin);
router.get('/all-vendors',vendorController.getAllVendor)
router.get('/one-vendor/:id',vendorController.getVendorById)
module.exports=router;