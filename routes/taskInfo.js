const taskRoutes = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');
const taskData = require('../tasks.json');
const fs = require('fs');
const validator = require('../helpers/validator')

taskRoutes.use(bodyParser.urlencoded({extended: false}))
taskRoutes.use(bodyParser.json());

const WRITEPATH = path.join(__dirname,'..','tasks.json');

taskRoutes.get('/', (req, res) => {
    res.status(200);
    res.send(taskData);
});

taskRoutes.get('/:taskId', (req, res) => {
    const reqTaskId = req.params.taskId;
    const returnTask = getTaskWithId(reqTaskId);
    if(!returnTask) {
        res.status(404);
        res.send(`Requested task with task id ${reqTaskId} could not be found`);
    } else {
        res.status(200);
        res.json(returnTask);
    }
});

taskRoutes.post('/', (req,res) => {
    const newTask = req.body;
    if(validator.validateForPost(newTask, taskData.tasks).status) {
        addNewTask(newTask);
        res.status(200);
        res.json({"status":"OK", "msg":"task added succesfully"});
    } else {
        res.status(400);
        res.json(validator.validateForPost(newTask, taskData.tasks));
    }
});

taskRoutes.put('/', (req, res) => {
    const updatedTask = req.body;
    let taskIndex = getIndexForTaskId(updatedTask.taskId);
    if(taskIndex == -1) {
        res.status(404);
        res.send(`Requested task with task  could not be found`);
    } else {
        if(validator.validateForPut(updatedTask).status) {
            let updatedTaskData = taskData;
            updatedTaskData.tasks.splice(taskIndex,0,updatedTask);
            writeFileSync(updatedTaskData);
            res.status(200);
            res.send("task updated succesfully");
        } else {
            res.status(400);
            res.json(validator.validateForPut(updatedTask));
        }
    }
});

taskRoutes.delete('/:taskId', (req, res) => {
    deleteTaskWithId(req.params.taskId);
    res.status(200);
    res.send("task deleted succesfully");
});

function getTaskWithId(taskId) {
    const tasks = taskData.tasks;
    const taskFound = tasks.find(task => task.taskId == taskId);
    return taskFound;
}

function addNewTask(newTask) {
    let updatedTasks = taskData;
    updatedTasks.tasks.push(newTask);
    writeFileSync(updatedTasks);
}

function writeFileSync(data) {
        fs.writeFileSync(WRITEPATH, JSON.stringify(data), {encoding: 'utf-8', flag:'w'});
}

function deleteTaskWithId(taskId) {
    let updatedtasks = taskData;
    let tasks = updatedtasks.tasks;
    let taskIndex = getIndexForTaskId(taskId);
    if(taskIndex != -1) {
        tasks.splice(taskIndex, 1);
        writeFileSync(updatedtasks);
    }
}

function getIndexForTaskId(taskId) {
    let tasks = taskData.tasks;
    let taskIndex = -1;
    for(let i=0;i<tasks.length;i++) {
        if(tasks[i].taskId == taskId) {
            taskIndex = i;
            break;
        }
    }
    return taskIndex;
}

module.exports = taskRoutes;