const express = require('express');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes')
const firmRoutes=require('./routes/firmRoutes')
const productRoutes=require('./routes/productRoutes')
const app = express();
dotEnv.config();
const PORT = 7777;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Mongodb connected successfully'))
    .catch((error) => console.log(error))
app.use(bodyParser.json());
app.use('/vendor', vendorRoutes);
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.listen(PORT, () => {
    console.log(`Server Started and Running at ${PORT}`);
});

app.use('/home', (req, res) => {
    res.send("<h1>Welcome to Kiran Store</h1>");
})
