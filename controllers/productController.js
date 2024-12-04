const Firm = require('../models/Firm');
const Product=require('../models/Product')
const multer=require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify where to store the uploaded files
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Rename the file to ensure uniqueness (e.g., using Date.now())
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload=multer({storage:storage})

const addProduct=async (req,res)=>{
    try {
        const{productname,price,category,bestseller,description}=req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId);
        if(!firm){
            res.status(401).json({message:"firm not found"})
        }

        const product=new Product({
            productname,
            price,
            category,
            bestseller,
            description,
            image,
            firm: firm.firmname
        })
        const savedProduct=await product.save();
        await firm.save();
        res.status(201).json(savedProduct)
    } catch (error) {
        console.log(error);
        res.status(501).json({error:"internal error"})        
    }
}
module.exports={addProduct:[upload.single('image').addProduct]}


