const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectname:{type:String,required:true},
    description:{type:String,required:true},
    teammembers:{type:Array,required:true},
    startdate:{type:Date.parse("dd/MM/yyyy")},
    //enddate:{type:Date.parse("dd/mm/yyyy")},
    projectstatus:{type:String,required:true},

},{ timestamps:true,
});



module.exports= Project = mongoose.model("project",projectSchema);
