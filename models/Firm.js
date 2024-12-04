const mongoose=require('mongoose')

const firmSchema= new mongoose.Schema({
    firmname:{
        type:String,
        require:true,
        unique:true
    },
    area:{
        type:String,
        require:true
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg']
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:['South-Indian','North-Indian','Chinese','Italian']
            }
        ]
    },
    offer:{
        type:String
    },
    Image:{
        type:String
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Vendor'
        }
    ],
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }]
})

const Firm=mongoose.model('Firm',firmSchema);

module.exports=Firm
