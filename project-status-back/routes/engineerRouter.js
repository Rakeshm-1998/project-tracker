const router = require("express").Router();
const auth = require("../middleware/auth");



let Engineer = require("../models/engineerModel");

// router.get("/", auth, async (req, res) => {
//     engineer.find().then(engineers=>res.json(engineers))
//     .catch(err => res.sendStatus(400).json('Error:'+err));
// });

router.route('/add').post((req,res)=>{
    const PID= req.body.PID;
    const name= req.body.name;
    const phone= req.body.phone;
    const email= req.body.email;

   

    const newEngineer= new Engineer({PID,name,phone,email});
    newEngineer.save()
    .then(()=>res.json('Engineer  Added.'))
    .catch(err => res.status(400).json('Error:'+err));
});




//For DELETE
router.delete("/:id", auth, async (req, res) => {
    Engineer.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Engineer deleted.'))
    .catch(err=>res.status(400).json('Error:'+err));
});

//for Update

router.post("/update/:id", auth, async (req, res) => {
    Engineer.findById(req.params.id)
    .then(engineer=>{
        engineer.PID=req.body.PID,
        engineer.name=req.body.name,
        engineer.phone=req.body.phone;
        engineer.email=req.body.email;


        engineer.save()
        .then(()=> res.json("Engineer Updated!"))
        .catch(err=>res.status(400).json('Error:'+err));
    })
    .catch(err=>res.status(400).json('Error:'+err));
});



module.exports = router;