const Firm = require('../models/Firm')
const Vendor = require('../models/Vendor')
const multer = require('multer')

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
const upload=multer({storage:storage});
const addFirm = async (req, res) => {
    try {
        const { firmname, area, category, region, offer } = req.body
        const image = req.file ? req.file.filename : undefined;
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            res.status(404).json({ message: "vendor not found" })
        }
        const firm = new Firm({
            firmname,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        })
       const savedFirm= await firm.save();
       vendor.firm.push(savedFirm);
       await vendor.save();
        res.status(201).json({ message: "firm added successfully" })
    } catch (error) {
        console.log(error);
        res.status(501).json('internal server error')
    }
}
module.exports = { addFirm:[upload.single('image'),addFirm]}