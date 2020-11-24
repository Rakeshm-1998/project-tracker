const router = require("express").Router();
const auth = require("../middleware/auth");



let Project = require("../models/projectModel");
router.get("/", auth, async (req, res) => {
    Project.find().then(projects=>res.json(projects))
    .catch(err => res.sendStatus(400).json('Error:'+err));
});

router.route('/add').post((req,res)=>{
    const projectname= req.body.projectname;
    const description= req.body.description;
    const teammembers= Array(req.body.teammembers);
    const startdate= Date.parse('dd/MM/yyyy',req.body.date);
    const projectstatus= req.body.projectstatus;

   

    const newProject= new Project({projectname,description,teammembers,startdate,projectstatus});
    newProject.save()
    .then(()=>res.json('Project  Added.'))
    .catch(err => res.status(400).json('Error:'+err));
});




//For DELETE
//router.route('/:id').delete((req,res)=>{
router.delete("/:id", auth, async (req, res) => {
    Project.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Project deleted.'))
    .catch(err=>res.status(400).json('Error:'+err));
});

//for Update
//router.route('/update/:id').post((req,res)=>{
router.post("/update/:id", auth, async (req, res) => {
    Project.findById(req.params.id)
    .then(project=>{
        project.projectname=req.body.projectname,
        project.description=req.body.description,
        project.teammembers=Array(req.body.teammembers),
        project.startdate=Date.parse(req.body.date),
        project.projectstatus=req.body.projectstatus,




        project.save()
        .then(()=> res.json("Project Updated!"))
        .catch(err=>res.status(400).json('Error:'+err));
    })
    .catch(err=>res.status(400).json('Error:'+err));
});



module.exports = router;