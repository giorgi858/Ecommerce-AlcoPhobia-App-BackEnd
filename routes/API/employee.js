const express = require('express')
const router = express.Router()
const { getAllEmployee, createEmployee, updateEmployee, deleteEmployee, getEmployee} = require('../../controllers/employeeController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(getAllEmployee)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createEmployee)
    .put(verifyRoles((ROLES_LIST.Admin, ROLES_LIST.Editor)), updateEmployee)
    .delete(verifyRoles((ROLES_LIST.Admin)) ,deleteEmployee);

router.route('/:id')
    .get( getEmployee);
    
module.exports = router