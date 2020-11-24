const router = require("express").Router();
let Task = require("../models/taskModel");

router.route('/tasks').get((req,res)=>{
    Task.find().then(tasks=>res.json(tasks))
    .catch(err => res.sendStatus(400).json('Error:'+err));
});

router.route('/add').post((req,res)=>{
    const taskname= req.body.taskname;
    const description= req.body.description;
    const username = req.body.username;
    const projectstatus= req.body.projectstatus;
    const startdate= Date.parse(req.body.date);
    const enddate= Date.parse(req.body.date);

    const newTask= new Task({taskname,description,username,projectstatus,startdate,enddate,});
    newTask.save()
    .then(()=>res.json('Task  Added.'))
    .catch(err => res.status(400).json('Error:'+err));
});

//GET INFO
router.route('/:id').get((req,res)=>{
    Task.findById(req.params.id)
    .then(task=>res.json(task))
    .catch(err=>res.status(400).json('Error:'+err));
});

//For DELETE
router.route('/:id').delete((req,res)=>{
    Task.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Task deleted.'))
    .catch(err=>res.status(400).json('Error:'+err));
});

//for Update
router.route('/update/:id').post((req,res)=>{
    Task.findById(req.params.id)
    .then(task=>{
        task.taskname=req.body.taskname,
        task.description=req.body.description,
        task.username=req.body.username,
        task.projectstatus=req.body.projectstatus,
        task.startdate=Date.parse(req.body.date),
        task.enddate=Date.parse(req.body.date);


        task.save()
        .then(()=> res.json("Task Updated!"))
        .catch(err=>res.status(400).json('Error:'+err));
    })
    .catch(err=>res.status(400).json('Error:'+err));
});


module.exports = router;