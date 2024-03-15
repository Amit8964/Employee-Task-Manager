
const { setAdmin, adminLogin, updateAdminPassword } = require("./controllers/adminController");
const {setEmployee, employeeLogin, updateEmployeePassword, deleteEmployee,getemployee} = require("./controllers/empController")
const {setTask, deleteTask, getTask, updateTask, getEmployeeTask} = require("./controllers/taskController")
const router = require("express").Router();

//admin routes
router.route("/api/v1/setadmin").post(setAdmin);
router.route("/api/v1/adminlogin").post(adminLogin);



//employee routes

router.route("/api/v1/setemployee").post(setEmployee)
router.route("/api/v1/delete_employee/:id").get(deleteEmployee)
router.route("/api/v1/getemployee").get(getemployee)
router.route("/api/v1/employeelogin").post(employeeLogin)

//task routes
router.route("/api/v1/settask").post(setTask)
router.route("/api/v1/deletetask/:id").get(deleteTask)
router.route("/api/v1/gettask").get(getTask)
router.route('/api/v1/updatetask/:id').put(updateTask)
router.route('/api/v1/getemployeetask/:id').get(getEmployeeTask)








module.exports = router;