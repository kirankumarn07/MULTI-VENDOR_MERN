const express=require('express')
const productController=require('../controllers/productController');

const router=express.Router();
router.post('/add-product/:firmName',function(req,res){
    productController.addProduct
});

module.exports=router;