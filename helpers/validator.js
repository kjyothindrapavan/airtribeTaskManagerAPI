class Validator {
    static validateForPost(taskInfo, tasks) {
        if(!this.isAllPropertiesExist(taskInfo)) {
            return {
                "status":false,
                "msg":"All properties should be defined"
            }
        }
        if(this.isTaskWithIdExist(taskInfo.taskId, tasks)) {
            return {
                "status":false,
                "msg":`task with id ${taskInfo.taskId} already exits`
            }
        }
        if(!this.isAllPropertiesDefined(taskInfo)) {
            return {
                "status":false,
                "msg":"All properties should be defined and should correct have value"
            }
        }

        return {
            "status": true
        }
    }

    static validateForPut(taskInfo) {
        if(!this.isAllPropertiesExist(taskInfo)) {
            return {
                "status":false,
                "msg":"All properties should be defined"
            }
        }
        if(!this.isAllPropertiesDefined(taskInfo)) {
            return {
                "status":false,
                "msg":"All properties should be defined and should correct have value"
            }
        }

        return {
            "status": true
        }
    }

    static isAllPropertiesExist(taskInfo) {
        if(taskInfo.hasOwnProperty('title') &&
            taskInfo.hasOwnProperty('description') &&
            taskInfo.hasOwnProperty('taskId') &&
            taskInfo.hasOwnProperty('completed')) {
                return true;
            }
            return false;
    }

    static isTaskWithIdExist(taskId, tasks) {
        let taskFound = tasks.some(task => task.taskId == taskId);
        if(taskFound) return true;
        return false;
    }

    static isAllPropertiesDefined(taskInfo) {
        if(this.isEmpty(taskInfo.taskId)) return false;
        if(this.isEmpty(taskInfo.title)) return false;
        if(this.isEmpty(taskInfo.description)) return false;
        if(this.isEmpty(taskInfo.completed)) return false;
        return true;
    }

    static isEmpty(str){
        if(str == null || str == undefined || str.length == 0) return true;
        return false;
    }
}

module.exports = Validator;