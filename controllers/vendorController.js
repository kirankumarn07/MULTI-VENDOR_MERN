const Vendor = require('../models/Vendor')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotEnv = require('dotenv');
const { find } = require('../models/Firm');
dotEnv.config();
const secretkey = process.env.WHATISSURNAME;
const vendorRegister = async (req,res) => {
   const{username,email,password}=req.body;  
    try {
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            res.status(401).json("email already existed")
        }
        const hashPassword = await bcrypt.hash(password, 8);
        const newVendor = new Vendor({
            username,
            email,
            password: hashPassword
        })
        await newVendor.save();
        res.status(201).json('user register successfully')
        console.log('registered');
    } catch (error) {
        console.log(error)
        res.status(501).json('message:internal error')
    }
}
const vendorLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        //taking model and attached with vendor variable and added findone method
        const vendor = await Vendor.findOne({ email });
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "invalid email or password" });
        }
        const token = jwt.sign({ vendorId: vendor._id }, secretkey, { expiresIn: "1hr" })
        res.status(200).json({ success: "Login successfully", token })
        console.log(email, "this is token", token);
    } catch (err) {
        console.log(err)
        res.status(501).json({ error: "internal error" })
    }
}

const getAllVendor= async(req,res)=>{
    try {
        const vendors=await Vendor.find().populate('firm');
        res.json({vendors})
    } catch (error) {
        console.log(err)
        res.status(501).json({ error: "internal error" })
    }
}

const getVendorById= async(req,res)=>{
    const vendorId=req.params.id

    try {
        const vendor=await Vendor.findById(vendorId).populate('firm');

        if(!vendor){
            res.status(401).json({message:"vendor not found"})
        }
        res.status(201).json({vendor})
    } catch (error) {
        console.log(error);
        res.status(501).json({error:"internal error"})
    }
}

module.exports = { vendorRegister, vendorLogin, getAllVendor, getVendorById }


