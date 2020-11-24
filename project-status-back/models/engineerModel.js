const mongoose = require("mongoose");

const engineerSchema = new mongoose.Schema({
    PID:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    phone:{type:String,required:true},
    email: { type: String,required:true,unique:true},
    
},{ timestamps:true,
});



module.exports= Engineer = mongoose.model("engineer",engineerSchema);
